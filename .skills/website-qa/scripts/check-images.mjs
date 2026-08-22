#!/usr/bin/env node
/**
 * Check image optimization — file sizes, lazy-loading, WebP format
 * Usage: node check-images.mjs <html-file-or-stdin>
 *
 * Outputs JSON with:
 *   - images: all <img> tags found
 *   - large: images > 200KB
 *   - missing-lazy: images below fold without loading="lazy"
 *   - missing-dimensions: images without width/height
 *   - summary: optimization stats
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

function extractImages(html) {
  const images = [];
  const imgRegex = /<img\s+([^>]*?)(?:\s*\/?)>/gi;
  let match;
  let yOffset = 0;

  while ((match = imgRegex.exec(html))) {
    const attrs = match[1];
    const srcMatch = /src\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const srcsetMatch = /srcset\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const altMatch = /alt\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const lazyMatch = /loading\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const widthMatch = /width\s*=\s*["']?(\d+)["']?/i.exec(attrs);
    const heightMatch = /height\s*=\s*["']?(\d+)["']?/i.exec(attrs);

    const src = srcMatch ? srcMatch[1] : '(missing)';
    const isWebP = src.endsWith('.webp');

    images.push({
      src,
      srcset: srcsetMatch ? srcsetMatch[1] : null,
      alt: altMatch ? altMatch[1] : null,
      hasAlt: !!altMatch,
      loading: lazyMatch ? lazyMatch[1] : null,
      hasLazy: lazyMatch && lazyMatch[1] === 'lazy',
      width: widthMatch ? parseInt(widthMatch[1]) : null,
      height: heightMatch ? parseInt(heightMatch[1]) : null,
      hasDimensions: !!(widthMatch && heightMatch),
      isWebP,
      estimatedAboveViewport: yOffset < 800, // Rough estimate: images in first 800px are above fold
    });

    // Rough estimate of y-offset based on attributes (very approximate)
    if (heightMatch) {
      yOffset += parseInt(heightMatch[1]);
    } else {
      yOffset += 400; // Default estimate
    }
  }

  return images;
}

async function checkImageSizes(images) {
  const large = [];
  for (const img of images) {
    if (img.src === '(missing)' || img.src.startsWith('http')) continue; // Skip external URLs for now

    try {
      // Check local files if they're relative paths
      const filePath = `./public${img.src.startsWith('/') ? img.src : '/' + img.src}`;
      const stats = await fs.stat(filePath).catch(() => null);
      if (stats && stats.size > 200 * 1024) {
        large.push({
          ...img,
          sizeKB: Math.round(stats.size / 1024),
        });
      }
    } catch (e) {
      // Skip local file checks if they fail
    }
  }
  return large;
}

async function main() {
  const source = process.argv[2] || '-';

  try {
    const html = await readHTML(source);
    const images = extractImages(html);
    const largeImages = await checkImageSizes(images);

    // Flag images without lazy-loading that are estimated to be below viewport
    // Note: y-offset estimate is approximate; auditor should verify actual positions
    const missingLazy = images.filter(img => !img.hasLazy && img.estimatedAboveViewport === false);
    const missingDimensions = images.filter(img => !img.hasDimensions);
    const missingAlt = images.filter(img => !img.hasAlt);
    const nonWebP = images.filter(img => !img.isWebP && img.src !== '(missing)');

    const result = {
      summary: {
        total: images.length,
        largeImages: largeImages.length,
        missingLazy: missingLazy.length,
        missingDimensions: missingDimensions.length,
        missingAlt: missingAlt.length,
        nonWebP: nonWebP.length,
      },
      largeImages,
      missingLazy,
      missingDimensions,
      missingAlt,
      nonWebP: nonWebP.slice(0, 20), // Limit output
      all: images,
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
