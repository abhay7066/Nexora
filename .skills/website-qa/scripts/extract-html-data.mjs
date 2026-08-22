#!/usr/bin/env node
/**
 * Extract and validate HTML elements from raw HTML for QA checks
 * Usage: node extract-html-data.mjs <html-file-or-stdin>
 *
 * Outputs JSON with:
 *   - headings (h1-h6): count, hierarchy check, text content
 *   - images: all <img> tags, missing alt text, missing width/height
 *   - links: internal vs external, anchor text, trailing slashes on internal
 *   - meta: title, description length, og tags, twitter card
 *   - semantic: landmarks, lang attribute, charset
 *   - forms: input labels, accessibility
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

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

function extractHeadings(html) {
  const headings = [];
  const h1Regex = /<h1[^>]*>([^<]+)<\/h1>/gi;
  const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
  const h3Regex = /<h3[^>]*>([^<]+)<\/h3>/gi;
  const h4Regex = /<h4[^>]*>([^<]+)<\/h4>/gi;
  const h5Regex = /<h5[^>]*>([^<]+)<\/h5>/gi;
  const h6Regex = /<h6[^>]*>([^<]+)<\/h6>/gi;

  let match;
  while ((match = h1Regex.exec(html))) headings.push({ level: 1, text: match[1].trim() });
  while ((match = h2Regex.exec(html))) headings.push({ level: 2, text: match[1].trim() });
  while ((match = h3Regex.exec(html))) headings.push({ level: 3, text: match[1].trim() });
  while ((match = h4Regex.exec(html))) headings.push({ level: 4, text: match[1].trim() });
  while ((match = h5Regex.exec(html))) headings.push({ level: 5, text: match[1].trim() });
  while ((match = h6Regex.exec(html))) headings.push({ level: 6, text: match[1].trim() });

  const h1Count = headings.filter(h => h.level === 1).length;
  const hierarchyValid = validateHeadingHierarchy(headings);

  return { headings, h1Count, hierarchyValid, issues: [] };
}

function validateHeadingHierarchy(headings) {
  if (headings.length === 0) return true;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) return false;
  }
  return true;
}

function extractImages(html) {
  const images = [];
  const imgRegex = /<img\s+([^>]*?)(?:\s*\/?)>/gi;
  let match;

  while ((match = imgRegex.exec(html))) {
    const attrs = match[1];
    const altMatch = /alt\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const srcMatch = /src\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const widthMatch = /width\s*=\s*["']?(\d+)["']?/i.exec(attrs);
    const heightMatch = /height\s*=\s*["']?(\d+)["']?/i.exec(attrs);

    images.push({
      src: srcMatch ? srcMatch[1] : '(missing)',
      alt: altMatch ? altMatch[1] : null,
      hasAlt: !!altMatch,
      hasWidth: !!widthMatch,
      hasHeight: !!heightMatch,
      width: widthMatch ? widthMatch[1] : null,
      height: heightMatch ? heightMatch[1] : null,
    });
  }

  const missingAlt = images.filter(img => !img.hasAlt);
  const missingDimensions = images.filter(img => !img.hasWidth || !img.hasHeight);

  return { images, missingAlt, missingDimensions, issues: [] };
}

function extractLinks(html, baseUrl) {
  const links = [];
  // Improved regex: handles attributes with/without spaces, complex quote handling
  const linkRegex = /<a\s+[^>]*?href\s*=\s*["']([^"']*)["'][^>]*?>([^<]+)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html))) {
    const href = match[1];
    const text = match[2].trim();
    const isExternal = /^(https?:\/\/|\/\/)/.test(href) && !href.includes(baseUrl);
    const isTel = href.startsWith('tel:');
    const isMailto = href.startsWith('mailto:');
    const isHash = href.startsWith('#') || href === '#';
    const hasTrailingSlash = href.endsWith('/');
    const isInternal = !isExternal && !isTel && !isMailto && !isHash;
    const isDescriptive = text.length > 3 && !text.toLowerCase().includes('click') && text.toLowerCase() !== 'link';

    links.push({
      href,
      text,
      isExternal,
      isTel,
      isMailto,
      isHash,
      isInternal,
      hasTrailingSlash,
      isDescriptive,
    });
  }

  const internalLinks = links.filter(l => l.isInternal);
  const missingTrailingSlash = internalLinks.filter(l => !l.hasTrailingSlash && !l.href.includes('?'));
  const poorAnchorText = links.filter(l => !l.isDescriptive && !l.isTel && !l.isMailto);

  return { links, internalLinks, missingTrailingSlash, poorAnchorText, issues: [] };
}

function extractMeta(html) {
  const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  const descMatch = /<meta\s+name\s*=\s*["']description["']\s+content\s*=\s*["']([^"]*)["']/i.exec(html);
  const ogTitleMatch = /<meta\s+property\s*=\s*["']og:title["']\s+content\s*=\s*["']([^"]*)["']/i.exec(html);
  const ogDescMatch = /<meta\s+property\s*=\s*["']og:description["']\s+content\s*=\s*["']([^"]*)["']/i.exec(html);
  const ogImageMatch = /<meta\s+property\s*=\s*["']og:image["']\s+content\s*=\s*["']([^"]*)["']/i.exec(html);
  const twitterCardMatch = /<meta\s+name\s*=\s*["']twitter:card["']\s+content\s*=\s*["']([^"]*)["']/i.exec(html);
  const langMatch = /<html[^>]*lang\s*=\s*["']([^"]*)["']/i.exec(html);
  const charsetMatch = /<meta\s+charset\s*=\s*["']?([^"'\s]*)["']?/i.exec(html);
  const canonicalMatch = /<link\s+rel\s*=\s*["']canonical["']\s+href\s*=\s*["']([^"]*)["']/i.exec(html);
  const robotsMatch = /<meta\s+name\s*=\s*["']robots["']\s+content\s*=\s*["']([^"]*)["']/i.exec(html);

  const meta = {
    title: titleMatch ? titleMatch[1].trim() : null,
    titleLength: titleMatch ? titleMatch[1].length : 0,
    description: descMatch ? descMatch[1].trim() : null,
    descriptionLength: descMatch ? descMatch[1].length : 0,
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
    ogDescription: ogDescMatch ? ogDescMatch[1] : null,
    ogImage: ogImageMatch ? ogImageMatch[1] : null,
    twitterCard: twitterCardMatch ? twitterCardMatch[1] : null,
    lang: langMatch ? langMatch[1] : 'missing',
    charset: charsetMatch ? charsetMatch[1] : 'missing',
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    robots: robotsMatch ? robotsMatch[1] : null,
  };

  const issues = [];
  if (!meta.title) issues.push('Missing <title>');
  if (meta.titleLength < 30) issues.push(`Title too short: ${meta.titleLength}ch (target 50-60)`);
  if (meta.titleLength > 60) issues.push(`Title too long: ${meta.titleLength}ch (target 50-60)`);
  if (!meta.description) issues.push('Missing meta description');
  if (meta.descriptionLength < 100) issues.push(`Description too short: ${meta.descriptionLength}ch (target 120-160)`);
  if (meta.descriptionLength > 160) issues.push(`Description too long: ${meta.descriptionLength}ch (target 120-160)`);
  if (!meta.ogTitle) issues.push('Missing og:title');
  if (!meta.ogDescription) issues.push('Missing og:description');
  if (!meta.ogImage) issues.push('Missing og:image');
  if (!meta.twitterCard) issues.push('Missing twitter:card');
  if (meta.lang === 'missing') issues.push('Missing lang attribute on <html>');
  if (meta.charset === 'missing') issues.push('Missing charset meta tag');

  return { meta, issues };
}

function extractSemanticElements(html) {
  const hasHeader = /<header/i.test(html);
  const hasNav = /<nav/i.test(html);
  const hasMain = /<main/i.test(html);
  const hasFooter = /<footer/i.test(html);
  const hasLandmarks = hasHeader && hasNav && hasMain && hasFooter;

  const issues = [];
  if (!hasHeader) issues.push('Missing <header> landmark');
  if (!hasNav) issues.push('Missing <nav> landmark');
  if (!hasMain) issues.push('Missing <main> landmark');
  if (!hasFooter) issues.push('Missing <footer> landmark');

  return { hasHeader, hasNav, hasMain, hasFooter, hasLandmarks, issues };
}

function extractStructuredData(html) {
  const ldJsonRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi;
  const schemas = [];
  let match;

  while ((match = ldJsonRegex.exec(html))) {
    try {
      const json = JSON.parse(match[1]);
      schemas.push({
        type: json['@type'] || 'unknown',
        valid: true,
        content: json,
      });
    } catch (e) {
      schemas.push({
        type: 'error',
        valid: false,
        error: e.message,
      });
    }
  }

  return { schemas, count: schemas.length, issues: schemas.filter(s => !s.valid) };
}

async function main() {
  const source = process.argv[2] || '-';
  const baseUrl = process.argv[3] || 'example.com';

  try {
    const html = await readHTML(source);

    const headings = extractHeadings(html);
    const images = extractImages(html);
    const links = extractLinks(html, baseUrl);
    const meta = extractMeta(html);
    const semantic = extractSemanticElements(html);
    const structuredData = extractStructuredData(html);

    const result = {
      headings,
      images,
      links,
      meta,
      semantic,
      structuredData,
      summary: {
        h1Count: headings.h1Count,
        imageCount: images.images.length,
        imagesWithoutAlt: images.missingAlt.length,
        linkCount: links.links.length,
        internalLinkCount: links.internalLinks.length,
        externalLinkCount: links.links.filter(l => l.isExternal).length,
        linksWithMissingTrailingSlash: links.missingTrailingSlash.length,
        headingHierarchyValid: headings.hierarchyValid,
        semanticLandmarksComplete: semantic.hasLandmarks,
        structuredDataCount: structuredData.count,
      },
      allIssues: [
        ...meta.issues.map(i => ({ category: 'META', severity: 'high', issue: i })),
        ...semantic.issues.map(i => ({ category: 'SEMANTIC', severity: 'high', issue: i })),
        ...structuredData.issues.map(i => ({ category: 'STRUCTURED_DATA', severity: 'medium', issue: i })),
        ...(headings.h1Count === 0 ? [{ category: 'HEADINGS', severity: 'critical', issue: 'No H1 tag found' }] : []),
        ...(headings.h1Count > 1 ? [{ category: 'HEADINGS', severity: 'medium', issue: `Multiple H1 tags (${headings.h1Count})` }] : []),
        ...(!headings.hierarchyValid ? [{ category: 'HEADINGS', severity: 'medium', issue: 'Heading hierarchy skips levels' }] : []),
        ...images.missingAlt.map(img => ({ category: 'IMAGES', severity: 'low', issue: `Missing alt: ${img.src}` })),
        ...links.missingTrailingSlash.map(link => ({ category: 'LINKS', severity: 'medium', issue: `Internal link missing trailing slash: ${link.href}` })),
      ],
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
