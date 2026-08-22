#!/usr/bin/env node
/**
 * Check HTTP redirects — detect redirect chains, loops, slow redirects
 * Usage: node check-redirects.mjs <url>
 *
 * Outputs JSON with:
 *   - finalUrl: where the redirect chain ends
 *   - chain: array of [statusCode, url] for each hop
 *   - isLoop: true if redirect points back to itself or cycles
 *   - totalTime: time for entire redirect chain
 *   - summary: status and diagnosis
 */

async function followRedirects(url, maxHops = 10) {
  const chain = [];
  let currentUrl = url;
  const startTime = Date.now();

  for (let hop = 0; hop < maxHops; hop++) {
    try {
      const response = await fetch(currentUrl, {
        method: 'HEAD',
        redirect: 'manual', // Don't auto-follow; we'll do it manually
        timeout: 10000,
      });

      const statusCode = response.status;
      const location = response.headers.get('location');

      chain.push({
        hop,
        url: currentUrl,
        statusCode,
        location,
      });

      // If not a redirect, we're done
      if (statusCode < 300 || statusCode >= 400) {
        const totalTime = Date.now() - startTime;
        return { chain, finalUrl: currentUrl, totalTime, isComplete: true };
      }

      // If there's no location header, redirect is malformed
      if (!location) {
        const totalTime = Date.now() - startTime;
        return { chain, finalUrl: currentUrl, totalTime, error: 'Redirect missing Location header' };
      }

      // Resolve relative URLs
      const nextUrl = new URL(location, currentUrl).toString();

      // Check for loops
      const seenUrls = chain.map(c => c.url);
      if (seenUrls.includes(nextUrl)) {
        const totalTime = Date.now() - startTime;
        return { chain, finalUrl: nextUrl, totalTime, isLoop: true, error: 'Redirect loop detected' };
      }

      currentUrl = nextUrl;
    } catch (error) {
      const totalTime = Date.now() - startTime;
      return { chain, finalUrl: currentUrl, totalTime, error: error.message };
    }
  }

  const totalTime = Date.now() - startTime;
  return { chain, finalUrl: currentUrl, totalTime, error: 'Max redirect hops exceeded' };
}

async function main() {
  const url = process.argv[2];

  if (!url) {
    console.error('Usage: node check-redirects.mjs <url>');
    console.error('Example: node check-redirects.mjs https://example.com/old-page');
    process.exit(1);
  }

  try {
    const result = await followRedirects(url);

    // Categorize result
    let status = 'unknown';
    if (result.error) {
      if (result.isLoop) status = 'loop';
      else status = 'error';
    } else if (result.isComplete) {
      status = result.chain.length <= 1 ? 'direct' : 'redirect';
    }

    const summary = {
      url,
      status,
      hops: result.chain.length,
      finalUrl: result.finalUrl,
      totalTimeMs: result.totalTime,
      isLoop: result.isLoop || false,
      error: result.error || null,
      chain: result.chain.map(c => ({
        hop: c.hop,
        from: c.url,
        statusCode: c.statusCode,
        to: c.location,
      })),
    };

    console.log(JSON.stringify(summary, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
