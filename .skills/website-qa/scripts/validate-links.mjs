#!/usr/bin/env node
/**
 * Validate all links in HTML — check status codes, redirects, broken links
 * Usage: node validate-links.mjs <html-file-or-stdin> <base-url>
 *
 * Outputs JSON with:
 *   - links: all links found with status codes
 *   - broken: links that return 404/5xx
 *   - redirects: links that redirect (301/302)
 *   - slow: links that take >2s to respond
 *   - summary: counts by category
 */

import * as fs from 'node:fs/promises';

async function readHTML(source) {
  if (source === '-' || !source) {
    let input = '';
    for await (const chunk of process.stdin) {
      input += chunk;
    }
    return input;
  }
  return await fs.readFile(source, 'utf-8');
}

function extractLinks(html) {
  const links = [];
  const linkRegex = /<a\s+([^>]*?)href\s*=\s*["']([^"']*)["']([^>]*?)>([^<]+)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html))) {
    const href = match[2];
    const text = match[4].trim();
    const isExternal = /^(https?:\/\/|\/\/)/.test(href);
    const isTel = href.startsWith('tel:');
    const isMailto = href.startsWith('mailto:');
    const isHash = href.startsWith('#');
    const isInternal = !isExternal && !isTel && !isMailto && !isHash;

    // Skip non-HTTP links (tel, mailto, hash)
    if (!isExternal && !isInternal) continue;

    links.push({
      href,
      text,
      isExternal,
      isInternal,
      isTel,
      isMailto,
      isHash,
      statusCode: null,
      redirectUrl: null,
      responseTime: null,
    });
  }

  return links;
}

async function checkLink(link, timeout = 10000) {
  if (link.isTel || link.isMailto || link.isHash) {
    return { ...link, statusCode: 'manual-check', error: 'tel/mailto/hash — manual verification needed' };
  }

  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(link.href, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      ...link,
      statusCode: response.status,
      responseTime,
      redirectUrl: response.url !== link.href ? response.url : null,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      ...link,
      statusCode: 'error',
      responseTime,
      error: error.message,
    };
  }
}

async function validateAllLinks(links, baseUrl = null, concurrency = 5) {
  const results = [];
  for (let i = 0; i < links.length; i += concurrency) {
    const batch = links.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(link => {
        // Resolve internal links to absolute URLs if baseUrl provided
        if (link.isInternal && baseUrl) {
          const absoluteUrl = new URL(link.href, baseUrl).toString();
          return checkLink({ ...link, href: absoluteUrl });
        }
        return checkLink(link);
      })
    );
    results.push(...batchResults);
  }
  return results;
}

async function main() {
  const source = process.argv[2] || '-';
  const baseUrl = process.argv[3] || 'https://yourdomain.com';

  try {
    const html = await readHTML(source);
    const links = extractLinks(html);

    const externalLinks = links.filter(l => l.isExternal);
    const internalLinks = links.filter(l => l.isInternal);

    console.log(`Found ${links.length} links (${externalLinks.length} external, ${internalLinks.length} internal)`);
    console.log(`Validating both external and internal links from ${baseUrl}...\n`);

    // Validate all links (external + resolved internal)
    const linksToValidate = [...externalLinks, ...internalLinks];
    const validatedLinks = await validateAllLinks(linksToValidate, baseUrl, 5);

    const broken = validatedLinks.filter(l => {
      const code = l.statusCode;
      return code === 'error' || code >= 400;
    });

    const redirects = validatedLinks.filter(l => {
      const code = l.statusCode;
      return code >= 300 && code < 400;
    });

    const slow = validatedLinks.filter(l => l.responseTime && l.responseTime > 2000);

    const working = validatedLinks.filter(l => {
      const code = l.statusCode;
      return code >= 200 && code < 300;
    });

    const result = {
      summary: {
        total: validatedLinks.length,
        working: working.length,
        broken: broken.length,
        redirects: redirects.length,
        slow: slow.length,
      },
      broken,
      redirects,
      slow,
      all: validatedLinks,
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
