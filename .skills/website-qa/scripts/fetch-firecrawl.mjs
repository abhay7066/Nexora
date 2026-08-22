#!/usr/bin/env node

/**
 * fetch-firecrawl.mjs
 *
 * Wrapper around Firecrawl REST API for fetching HTML, markdown, and screenshots.
 * Uses FIRECRAWL_API_KEY from .env if available.
 *
 * Usage:
 *   import { firecrawlScrape } from './fetch-firecrawl.mjs';
 *   const result = await firecrawlScrape(url, { formats: ['html', 'screenshot'], mobile: false });
 *
 * Or CLI:
 *   node fetch-firecrawl.mjs --url https://example.com --formats html,screenshot --output ./fetch-result.json
 */

import https from 'node:https';
import fs from 'node:fs/promises';
import path from 'node:path';

// Try to read API key from .env
let FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

if (!FIRECRAWL_API_KEY) {
  try {
    const envContent = await fs.readFile('.env', 'utf-8');
    const match = envContent.match(/FIRECRAWL_API_KEY=(.+)/);
    FIRECRAWL_API_KEY = match ? match[1].trim() : null;
  } catch {
    // .env doesn't exist or can't be read
  }
}

/**
 * Make HTTP request to Firecrawl API
 * @param {string} method - HTTP method (GET, POST)
 * @param {string} path - API endpoint path
 * @param {object} [payload] - Request payload (for POST)
 * @returns {Promise<object>} - Parsed JSON response
 */
function makeRequest(method, path, payload = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        } else {
          reject(new Error(`Firecrawl API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (payload) {
      req.write(JSON.stringify(payload));
    }

    req.end();
  });
}

/**
 * Scrape a URL with Firecrawl
 * @param {string} url - URL to scrape
 * @param {object} options - Options
 * @param {string[]} [options.formats] - Formats: html, markdown, screenshot, links
 * @param {boolean} [options.mobile] - Capture mobile viewport (375px) instead of desktop (1440px)
 * @param {number} [options.timeout] - Timeout in ms (default: 30000)
 * @returns {Promise<object>} - Scrape result with requested formats
 */
export async function firecrawlScrape(url, options = {}) {
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY not found in environment or .env file');
  }

  const {
    formats = ['html'],
    mobile = false,
    timeout = 30000,
  } = options;

  const payload = {
    url: url,
    formats: formats,
    mobile: mobile,
    timeout: timeout,
  };

  console.log(`📡 Fetching ${url}${mobile ? ' (mobile)' : ' (desktop)'}...`);

  try {
    const result = await makeRequest('POST', '/v1/scrape', payload);
    console.log(`✅ Scraped successfully`);
    return result.data || result;
  } catch (error) {
    console.error(`❌ Scrape failed: ${error.message}`);
    throw error;
  }
}

/**
 * Batch scrape multiple URLs
 * @param {string[]} urls - URLs to scrape
 * @param {object} options - Same as firecrawlScrape
 * @param {number} [options.delayMs] - Delay between requests in ms (default: 1000)
 * @returns {Promise<object[]>} - Array of scrape results
 */
export async function firecrawlScrapeBatch(urls, options = {}) {
  const { delayMs = 1000, ...scrapeOpts } = options;
  const results = [];

  for (let i = 0; i < urls.length; i++) {
    try {
      const result = await firecrawlScrape(urls[i], scrapeOpts);
      results.push({ url: urls[i], success: true, data: result });
    } catch (error) {
      results.push({ url: urls[i], success: false, error: error.message });
    }

    // Rate limiting: delay between requests
    if (i < urls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Fetch screenshots (desktop + mobile)
 * @param {string} url - URL to screenshot
 * @param {string} [outputDir] - Directory to save screenshots (default: .agent/audit)
 * @returns {Promise<object>} - { desktop: url, mobile: url }
 */
export async function firecrawlScreenshots(url, outputDir = '.agent/audit') {
  await fs.mkdir(outputDir, { recursive: true });

  const domain = new URL(url).hostname.replace(/\./g, '-');
  const timestamp = new Date().toISOString().split('T')[0];

  const desktopFile = path.join(outputDir, `${domain}-desktop-${timestamp}.json`);
  const mobileFile = path.join(outputDir, `${domain}-mobile-${timestamp}.json`);

  try {
    console.log('📸 Capturing desktop screenshot...');
    const desktop = await firecrawlScrape(url, { formats: ['screenshot'], mobile: false });
    await fs.writeFile(desktopFile, JSON.stringify(desktop, null, 2));
    console.log(`   Saved to ${desktopFile}`);

    console.log('📱 Capturing mobile screenshot...');
    const mobile = await firecrawlScrape(url, { formats: ['screenshot'], mobile: true });
    await fs.writeFile(mobileFile, JSON.stringify(mobile, null, 2));
    console.log(`   Saved to ${mobileFile}`);

    return {
      desktop: desktop.data?.screenshot,
      mobile: mobile.data?.screenshot,
    };
  } catch (error) {
    console.error(`❌ Screenshot capture failed: ${error.message}`);
    throw error;
  }
}

// ─── CLI USAGE ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const urlIndex = args.indexOf('--url');
const formatsIndex = args.indexOf('--formats');
const outputIndex = args.indexOf('--output');
const mobileFlag = args.includes('--mobile');

if (urlIndex !== -1) {
  const url = args[urlIndex + 1];
  const formats = formatsIndex !== -1 ? args[formatsIndex + 1].split(',') : ['html'];
  const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : null;

  if (!url) {
    console.error('Usage: node fetch-firecrawl.mjs --url <url> [--formats html,screenshot] [--mobile] [--output ./result.json]');
    process.exit(1);
  }

  try {
    const result = await firecrawlScrape(url, { formats, mobile: mobileFlag });

    if (outputFile) {
      await fs.writeFile(outputFile, JSON.stringify(result, null, 2));
      console.log(`✅ Result saved to ${outputFile}`);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
