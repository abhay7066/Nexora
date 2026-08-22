#!/usr/bin/env node

/**
 * batch-audit.mjs
 *
 * Run structural QA checks on multiple pages in parallel or sequence.
 * Useful for production audits (checking all pages in a sitemap).
 *
 * Usage (CLI):
 *   node batch-audit.mjs \
 *     --base-url https://example.com \
 *     --pages /,/about/,/services/,/contact/ \
 *     --output ./batch-results.json
 *
 * Or (programmatic):
 *   import { batchAudit } from './batch-audit.mjs';
 *   const results = await batchAudit('https://example.com', ['/about/', '/contact/']);
 */

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Detect environment from URL
 * @param {string} url - Base URL
 * @returns {string} - LOCALHOST, STAGING, DEVELOPMENT, or PRODUCTION
 */
function detectEnvironmentFromUrl(url) {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('localhost') || lowerUrl.includes('127.0.0.1') || lowerUrl.includes(':4321')) {
    return 'LOCALHOST';
  }

  if (lowerUrl.includes('staging') || lowerUrl.includes('stage') || lowerUrl.includes('.wip.')) {
    return 'STAGING';
  }

  if (lowerUrl.includes('dev') || lowerUrl.includes('test')) {
    return 'DEVELOPMENT';
  }

  return 'PRODUCTION';
}

/**
 * Parse HTML for key QA signals (without external dependencies)
 * @param {string} html - HTML content
 * @returns {object} - Audit results
 */
function analyzeHTML(html) {
  const results = {
    title: null,
    titleLength: 0,
    metaDescription: null,
    metaDescLength: 0,
    h1Count: 0,
    h1Text: null,
    imagesTotal: 0,
    imagesWithAlt: 0,
    linksTotal: 0,
    hasCanonical: false,
    hasNoindex: false,
    hasOgTitle: false,
    hasOgImage: false,
    status: 'ok',
    errors: [],
  };

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    results.title = titleMatch[1];
    results.titleLength = titleMatch[1].length;
    if (results.titleLength < 30 || results.titleLength > 70) {
      results.errors.push(`Title length ${results.titleLength}ch (should be 50–60)`);
    }
  } else {
    results.errors.push('Missing <title>');
  }

  // Meta description
  const descMatch = html.match(/name="description"\s+content="([^"]*)"/);
  if (descMatch) {
    results.metaDescription = descMatch[1];
    results.metaDescLength = descMatch[1].length;
    if (results.metaDescLength < 80 || results.metaDescLength > 160) {
      results.errors.push(`Description ${results.metaDescLength}ch (should be 120–160)`);
    }
  } else {
    results.errors.push('Missing meta description');
  }

  // H1 count
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (h1Matches) {
    results.h1Count = h1Matches.length;
    if (h1Matches[0]) {
      results.h1Text = h1Matches[0].replace(/<[^>]+>/g, '');
    }
    if (results.h1Count !== 1) {
      results.errors.push(`Found ${results.h1Count} H1 tag(s) (should be exactly 1)`);
    }
  } else {
    results.errors.push('Missing H1 tag');
  }

  // Images
  const imageMatches = html.match(/<img[^>]*>/gi) || [];
  results.imagesTotal = imageMatches.length;
  results.imagesWithAlt = imageMatches.filter((img) => /alt=['"][^'"]*['"]/.test(img)).length;
  if (results.imagesTotal - results.imagesWithAlt > 0) {
    results.errors.push(`${results.imagesTotal - results.imagesWithAlt} image(s) missing alt`);
  }

  // Links
  const linkMatches = html.match(/href=['"]([^'"]*)['"]/gi) || [];
  results.linksTotal = linkMatches.length;

  // Canonical
  results.hasCanonical = /rel="canonical"/.test(html);
  if (!results.hasCanonical) {
    results.errors.push('Missing canonical tag');
  }

  // Noindex
  results.hasNoindex = /noindex/.test(html);

  // Open Graph
  results.hasOgTitle = /property="og:title"/.test(html);
  results.hasOgImage = /property="og:image"/.test(html);

  // Overall status
  if (results.errors.length > 2) {
    results.status = 'warn';
  }
  if (results.h1Count === 0 || !results.hasCanonical) {
    results.status = 'critical';
  }

  return results;
}

/**
 * Fetch a page and analyze it (supports HTTP and HTTPS)
 * @param {string} url - Full URL
 * @returns {Promise<object>} - Audit result with status code
 */
function fetchAndAnalyze(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      let timeout;

      timeout = setTimeout(() => {
        req.destroy();
      }, 10000);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        clearTimeout(timeout);
        const analysis = analyzeHTML(data);
        analysis.statusCode = res.statusCode;
        analysis.url = url;
        resolve(analysis);
      });
    });

    req.on('error', (error) => {
      resolve({
        url: url,
        statusCode: 0,
        status: 'error',
        error: error.message,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: url,
        statusCode: 0,
        status: 'timeout',
        error: 'Request timeout (>10s)',
      });
    });
  });
}

/**
 * Batch audit multiple pages (same environment only)
 * @param {string} baseUrl - Base URL (e.g., https://example.com)
 * @param {string[]} paths - Relative paths (e.g., ['/about/', '/contact/'])
 * @param {object} [options] - Options
 * @param {number} [options.concurrency] - Max concurrent requests (default: 3)
 * @param {number} [options.delayMs] - Delay between batches in ms (default: 500)
 * @param {string} [options.environment] - Expected environment (STAGING, PRODUCTION, LOCALHOST) — warns if mismatch
 * @returns {Promise<object>} - { summary: {...}, pages: [...], errors: [...], environment: '...' }
 */
export async function batchAudit(baseUrl, paths, options = {}) {
  const { concurrency = 3, delayMs = 500, environment = null } = options;

  // Detect environment from URL
  const detectedEnv = detectEnvironmentFromUrl(baseUrl);
  if (environment && environment !== detectedEnv) {
    console.warn(
      `⚠️  Environment mismatch: Expected ${environment}, detected ${detectedEnv} from ${baseUrl}`
    );
  }

  console.log(`🔍 Batch auditing ${paths.length} page(s) from ${baseUrl}`);
  console.log(`   Environment: ${detectedEnv}`);

  const results = {
    environment: detectedEnv,
    baseUrl: baseUrl,
    summary: {
      total: paths.length,
      ok: 0,
      warn: 0,
      critical: 0,
      error: 0,
      avgTitleLength: 0,
      avgDescLength: 0,
      h1Coverage: '0%',
      canonicalCoverage: '0%',
    },
    pages: [],
    errors: [],
  };

  let h1Count = 0;
  let canonicalCount = 0;
  let totalTitleLength = 0;
  let totalDescLength = 0;

  // Process in batches
  for (let i = 0; i < paths.length; i += concurrency) {
    const batch = paths.slice(i, i + concurrency);
    const promises = batch.map((pagePath) => {
      const url = new URL(pagePath, baseUrl).toString();
      return fetchAndAnalyze(url);
    });

    const batchResults = await Promise.all(promises);

    for (const pageResult of batchResults) {
      results.pages.push(pageResult);

      if (pageResult.statusCode >= 200 && pageResult.statusCode < 300) {
        if (pageResult.status === 'ok') results.summary.ok++;
        else if (pageResult.status === 'warn') results.summary.warn++;
        else if (pageResult.status === 'critical') results.summary.critical++;

        if (pageResult.h1Count === 1) h1Count++;
        if (pageResult.hasCanonical) canonicalCount++;
        totalTitleLength += pageResult.titleLength || 0;
        totalDescLength += pageResult.metaDescLength || 0;
      } else {
        results.summary.error++;
        if (pageResult.error) {
          results.errors.push(`${pageResult.url}: ${pageResult.error}`);
        } else {
          results.errors.push(`${pageResult.url}: HTTP ${pageResult.statusCode}`);
        }
      }
    }

    // Delay between batches
    if (i + concurrency < paths.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  // Calculate summaries
  results.summary.h1Coverage = `${Math.round((h1Count / results.pages.filter((p) => p.statusCode >= 200).length) * 100)}%`;
  results.summary.canonicalCoverage = `${Math.round((canonicalCount / results.pages.filter((p) => p.statusCode >= 200).length) * 100)}%`;
  results.summary.avgTitleLength = Math.round(totalTitleLength / paths.length);
  results.summary.avgDescLength = Math.round(totalDescLength / paths.length);

  return results;
}

// ─── CLI USAGE ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const baseUrlIndex = args.indexOf('--base-url');
const pagesIndex = args.indexOf('--pages');
const outputIndex = args.indexOf('--output');
const concurrencyIndex = args.indexOf('--concurrency');
const envIndex = args.indexOf('--environment');

if (baseUrlIndex !== -1 && pagesIndex !== -1) {
  const baseUrl = args[baseUrlIndex + 1];
  const pages = args[pagesIndex + 1].split(',').map((p) => p.trim());
  const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : null;
  const concurrency = concurrencyIndex !== -1 ? parseInt(args[concurrencyIndex + 1]) : 3;
  const expectedEnv = envIndex !== -1 ? args[envIndex + 1] : null;

  if (!baseUrl || pages.length === 0) {
    console.error('Usage: node batch-audit.mjs --base-url <url> --pages /,/about/,/contact/ [--output ./results.json] [--concurrency 3] [--environment STAGING]');
    process.exit(1);
  }

  try {
    const results = await batchAudit(baseUrl, pages, { concurrency, environment: expectedEnv });

    // Print summary
    console.log(`\n📊 Summary (${results.environment}):`);
    console.log(`   Base URL: ${results.baseUrl}`);
    console.log(`   Environment: ${results.environment}`);
    console.log(`   Total: ${results.summary.total}`);
    console.log(`   ✅ OK: ${results.summary.ok}`);
    console.log(`   ⚠️  Warn: ${results.summary.warn}`);
    console.log(`   ❌ Critical: ${results.summary.critical}`);
    console.log(`   🚫 Error: ${results.summary.error}`);
    console.log(`   H1 coverage: ${results.summary.h1Coverage}`);
    console.log(`   Canonical coverage: ${results.summary.canonicalCoverage}`);
    console.log(`   Avg title length: ${results.summary.avgTitleLength}ch`);
    console.log(`   Avg description length: ${results.summary.avgDescLength}ch`);

    if (outputFile) {
      await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
      console.log(`\n✅ Full results saved to ${outputFile}`);
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
