#!/usr/bin/env node
// Usage: node .skills/go-live-check/scripts/audit-go-live.mjs [targetUrl] [--config path/to/config.json]
//
// Runs the automatable subset of a project's go-live checklist against a live URL and prints JSON.
// Reusable across projects — everything project-specific (target URL, required legal/compliance
// text, nav paths to spot-check, project name) comes from a per-project config file, never from
// values hardcoded in this script.

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const configFlagIndex = args.indexOf('--config');
const configPath = configFlagIndex !== -1 ? args[configFlagIndex + 1] : '.agent/go-live-check.config.json';
const positional = args.filter((a, i) => a !== '--config' && (configFlagIndex === -1 || i !== configFlagIndex + 1));

function loadConfig(path) {
  const resolved = resolve(path);
  if (!existsSync(resolved)) return null;
  try {
    return JSON.parse(readFileSync(resolved, 'utf8'));
  } catch (err) {
    console.error(`Warning: could not parse config at ${resolved}: ${err.message}`);
    return null;
  }
}

function loadEnvVar(name) {
  if (!existsSync('.env')) return null;
  const match = readFileSync('.env', 'utf8').match(new RegExp(`^${name}=(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
}

function loadPackageName() {
  try {
    return JSON.parse(readFileSync('package.json', 'utf8')).name || null;
  } catch {
    return null;
  }
}

const config = loadConfig(configPath) || {};
const target = (positional[0] || config.targetUrl || loadEnvVar('PUBLIC_SITE_URL') || '').replace(/\/+$/, '');
const projectName = config.projectName || loadPackageName() || 'Unnamed project';
const navPaths = Array.isArray(config.navPaths) && config.navPaths.length ? config.navPaths : ['/'];
const privacyPolicyPath = config.privacyPolicyPath || '/privacy-policy/';
const requiredHomepageText = Array.isArray(config.requiredHomepageText) ? config.requiredHomepageText : [];
const domainRedirect = config.domainRedirect || null;

if (!target) {
  console.error(
    'No target URL. Pass one as an argument, set "targetUrl" in the config file, or set PUBLIC_SITE_URL in .env.'
  );
  process.exit(1);
}

async function fetchSafe(url, opts = {}) {
  try {
    const res = await fetch(url, { redirect: 'manual', ...opts });
    const body = await res.text().catch(() => '');
    return { ok: true, status: res.status, headers: Object.fromEntries(res.headers), body };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

function extractMeta(html, name) {
  const re = new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, 'i');
  const match = html.match(re);
  if (!match) return null;
  const content = match[0].match(/content=["']([^"']*)["']/i);
  return content ? content[1] : null;
}

function hasTag(html, pattern) {
  return pattern.test(html);
}

function checkSsl(host) {
  try {
    const out = execSync(
      `echo | openssl s_client -connect ${host}:443 -servername ${host} 2>/dev/null | openssl x509 -noout -dates -subject 2>/dev/null`,
      { timeout: 8000 }
    ).toString();
    return out.trim() || 'unable to read certificate';
  } catch (err) {
    return `SSL check failed: ${String(err.message || err)}`;
  }
}

async function main() {
  const host = new URL(target).host;
  const results = {
    project: projectName,
    target,
    configUsed: existsSync(resolve(configPath)) ? configPath : null,
    checkedAt: new Date().toISOString().slice(0, 10),
    checks: {},
  };

  if (!results.configUsed) {
    results.checks.no_config_warning = {
      label: 'No project config file found',
      pass: null,
      detail: `Expected ${configPath} — running with generic defaults only (homepage reachability, robots.txt, sitemap, GTM, canonical, SSL, HTTPS redirect, 404 page). Legal/compliance text checks and nav-path spot-checks are skipped without a config file. See .skills/go-live-check/references/config-schema.md to create one.`,
      blocking: false,
    };
  }

  // --- Homepage fetch (used by several checks below) ---
  const home = await fetchSafe(`${target}/`);
  if (!home.ok) {
    results.checks.homepage_unreachable = { label: 'Homepage fetch', pass: false, detail: home.error, blocking: true };
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  // --- noindex / robots meta ---
  const robotsMeta = extractMeta(home.body, 'robots');
  results.checks.noindex_check = {
    label: 'Meta robots tag does not block indexing',
    pass: robotsMeta !== null && !/noindex/i.test(robotsMeta),
    detail: robotsMeta ?? 'no robots meta tag found',
    blocking: true,
  };

  // --- Technical SEO / infra, from homepage HTML ---
  results.checks.canonical_tag = {
    label: 'Self-referencing canonical tag present',
    pass: hasTag(home.body, /<link[^>]+rel=["']canonical["']/i),
    blocking: false,
  };
  results.checks.gtm_script = {
    label: 'Google Tag Manager script tag present',
    pass: hasTag(home.body, /googletagmanager\.com\/gtm\.js/i),
    detail: 'Presence only — does not confirm events are firing correctly',
    blocking: true,
  };
  results.checks.gsc_verification = {
    label: 'google-site-verification meta tag present',
    pass: extractMeta(home.body, 'google-site-verification') !== null,
    blocking: false,
  };
  const ogImage =
    extractMeta(home.body, 'og:image') ||
    (home.body.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']*)["']/i) || [])[1];
  results.checks.og_image = {
    label: 'og:image tag present',
    pass: !!ogImage,
    detail: ogImage || 'not found',
    blocking: false,
  };
  results.checks.favicon = {
    label: 'Favicon link tag present',
    pass: hasTag(home.body, /<link[^>]+rel=["'](?:icon|shortcut icon)["']/i),
    blocking: false,
  };
  results.checks.structured_data = {
    label: 'JSON-LD structured data present',
    pass: hasTag(home.body, /<script[^>]+type=["']application\/ld\+json["']/i),
    blocking: false,
  };

  // --- Required homepage text (project-specific: legal numbers, licenses, etc.) ---
  requiredHomepageText.forEach((item, i) => {
    const pattern = new RegExp(item.pattern, 'i');
    results.checks[`required_text_${i}`] = {
      label: item.label || `Required text pattern present: ${item.pattern}`,
      pass: pattern.test(home.body),
      blocking: item.blocking !== false,
    };
  });

  // --- robots.txt ---
  const robotsTxt = await fetchSafe(`${target}/robots.txt`);
  results.checks.robots_txt = {
    label: 'robots.txt returns 200 and references a sitemap',
    pass: robotsTxt.ok && robotsTxt.status === 200 && /sitemap/i.test(robotsTxt.body),
    detail: robotsTxt.ok ? `status ${robotsTxt.status}` : robotsTxt.error,
    blocking: true,
  };

  // --- sitemap-index.xml ---
  const sitemap = await fetchSafe(`${target}/sitemap-index.xml`);
  results.checks.sitemap = {
    label: 'sitemap-index.xml returns 200',
    pass: sitemap.ok && sitemap.status === 200,
    detail: sitemap.ok ? `status ${sitemap.status}` : sitemap.error,
    blocking: true,
  };

  // --- 404 page ---
  const notFound = await fetchSafe(`${target}/this-page-should-not-exist-go-live-check/`);
  results.checks.custom_404 = {
    label: 'Unknown path returns a real 404 (not a 200 soft-404)',
    pass: notFound.ok && notFound.status === 404,
    detail: notFound.ok ? `status ${notFound.status}` : notFound.error,
    blocking: false,
  };

  // --- Privacy Policy page reachable ---
  const privacy = await fetchSafe(`${target}${privacyPolicyPath}`);
  results.checks.privacy_policy_reachable = {
    label: `Privacy Policy page reachable at ${privacyPolicyPath}`,
    pass: privacy.ok && privacy.status === 200,
    detail: privacy.ok ? `status ${privacy.status}` : privacy.error,
    blocking: false,
  };

  // --- HTTPS enforcement ---
  const httpAttempt = await fetchSafe(target.replace('https://', 'http://') + '/');
  results.checks.https_redirect = {
    label: 'HTTP requests redirect to HTTPS',
    pass: httpAttempt.ok && [301, 302, 308].includes(httpAttempt.status),
    detail: httpAttempt.ok ? `status ${httpAttempt.status}` : httpAttempt.error,
    blocking: true,
  };

  // --- Apex/www canonical domain redirect (required for Sevalla-hosted sites) ---
  if (domainRedirect && domainRedirect.nonCanonicalHost && domainRedirect.canonicalUrl) {
    const nonCanonical = await fetchSafe(`https://${domainRedirect.nonCanonicalHost}/`);
    const redirectsToCanonical =
      nonCanonical.ok &&
      [301, 302, 308].includes(nonCanonical.status) &&
      (nonCanonical.headers.location || '').replace(/\/+$/, '') === domainRedirect.canonicalUrl.replace(/\/+$/, '');
    results.checks.domain_redirect = {
      label: `Non-canonical host (${domainRedirect.nonCanonicalHost}) 301s to canonical (${domainRedirect.canonicalUrl})`,
      pass: redirectsToCanonical,
      detail: nonCanonical.ok
        ? `status ${nonCanonical.status}, Location: ${nonCanonical.headers.location || '(none)'}`
        : nonCanonical.error,
      blocking: true,
      note:
        domainRedirect.hostingPlatform === 'sevalla'
          ? 'Sevalla serves every attached custom domain live — a failing check here almost always means a public/_redirects file is missing, not a DNS problem.'
          : undefined,
    };
  }

  // --- SSL certificate ---
  results.checks.ssl_certificate = {
    label: 'SSL certificate readable/valid',
    pass: null, // informational — requires human read of the detail
    detail: checkSsl(host),
    blocking: true,
    manualReview: true,
  };

  // --- Nav path spot-check (project-specific list, or just "/" if none configured) ---
  results.navPathChecks = [];
  for (const path of navPaths) {
    if (path === '/') continue; // already covered by the homepage fetch above
    const res = await fetchSafe(`${target}${path}`);
    results.navPathChecks.push({
      path,
      status: res.ok ? res.status : null,
      pass: res.ok && res.status === 200,
      detail: res.ok ? `status ${res.status}` : res.error,
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

main();
