# Tracking & Monitoring Verification Checklist

During production QA, verify that tracking scripts are present, loading correctly, and reporting data. Do NOT proceed with launch if critical tracking is missing.

---

## Quick Check (Browser DevTools)

Open DevTools → **Network** tab, then reload the page. Look for these requests:

| Service | Expected Network Request | Status | Notes |
|---|---|---|---|
| **Google Tag Manager** (if configured) | `www.googletagmanager.com/gtm.js?id=GTM-*` | 200 OK | Must load before `window.dataLayer` is used |
| **Google Analytics** (if configured) | `www.google-analytics.com/g/collect*` (GA4) or `/r/collect*` (UA) | 200 OK | Verify events in GA dashboard (wait 24h for reporting) |
| **Search Console Verification** | (meta tag in HTML, not a network request) | Present | Check `<head>` for verification meta tag (Google / Bing / etc.) |
| **Third-party tracking** (if configured) | Varies by service (CRM, lead tracking, heatmaps, etc.) | 200 OK | Verify in platform dashboard |

---

## Google Search Console (GSC) Verification

### Check in HTML

```bash
curl -s https://yourdomain.com/ | grep "google-site-verification"
```

Expected output:
```html
<meta name="google-site-verification" content="abc123...xyz" />
```

**Checklist:**
- [ ] GSC verification meta tag is present in `<head>`
- [ ] Content value matches the one in GSC account
- [ ] Tag is on the **production domain only** (not staging)
- [ ] GSC account shows "Ownership verified" status

---

## Google Tag Manager (GTM)

### Check in DevTools Network Tab

1. Open https://yourdomain.com in browser
2. Open **DevTools** → **Network** tab
3. Look for request to: `https://www.googletagmanager.com/gtm.js?id=GTM-XXXXX`
4. Verify **Status: 200** (if red/404, GTM is not wired)

**Verify with Regex:**
```bash
curl -s https://yourdomain.com/ | grep -oE "https://www\.googletagmanager\.com/gtm\.js\?id=GTM-[A-Z0-9]+"
```

Should return: `https://www.googletagmanager.com/gtm.js?id=GTM-XXXXX`

### Check in HTML

```bash
curl -s https://yourdomain.com/ | grep -i "googletagmanager"
```

Expected output (noscript fallback + main script):
```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>
  (function(w,d,s,l,i){
    w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXX');
</script>
```

**Checklist:**
- [ ] GTM script present in `<head>`
- [ ] GTM ID matches production account (GTM-XXXXX, not staging)
- [ ] Script loads before `</head>` (not deferred to `</body>`)
- [ ] `dataLayer` variable is initialized before GTM script
- [ ] No console errors (check DevTools Console tab)
- [ ] GTM debugger shows tags firing: Right-click → Inspect → find GTM ID in request params

---

## Google Analytics

### Check in DevTools Network Tab

1. Open https://yourdomain.com
2. Open **DevTools** → **Network** tab
3. Look for requests to: `https://www.google-analytics.com/g/collect*` (GA4 endpoint)
4. Verify **Status: 200** for each event

**Verify with Regex:**
```bash
curl -s https://yourdomain.com/ | grep -oE "https://www\.google-analytics\.com/g/collect[^\"']*"
```

Should return GA4 collect requests like: `https://www.google-analytics.com/g/collect?...`

### Check in GA Dashboard

1. Go to your GA property: https://analytics.google.com
2. Click **Real-time** → **Overview**
3. Reload your website
4. Verify that **Active users** shows ≥ 1 (your session)
5. Check **Real-time** → **Events** to see page views, clicks, form submissions

### Check in HTML (GA4 Tag via GTM)

GA4 is typically wired via Google Tag Manager. Look for:

```bash
curl -s https://yourdomain.com/ | grep "googletagmanager.com/gtag"
```

Expected output:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXX');
</script>
```

**Checklist:**
- [ ] GA script (or GTM containing GA) is present
- [ ] GA ID (G-XXXXX or UA-XXXXX) matches production account
- [ ] Real-time dashboard shows active users within 30 seconds of page load
- [ ] Page views are being recorded in GA
- [ ] Event tracking works (if configured): form submissions, button clicks, etc.
- [ ] No 404s in Network tab for GA requests

---

## Third-Party Tracking Services (CRM, Lead Tracking, Heatmaps, etc.)

### Generic Checklist for Any Third-Party Service

If the site uses CRM, lead tracking, heatmap, or other third-party services:

### Check in DevTools Network Tab

1. Open https://yourdomain.com
2. Open **DevTools** → **Network** tab
3. Look for requests to the third-party service domain
   - Examples: `api.service-name.com/tracking`, `cdn.service.io/script.js`, etc.
4. Verify **Status: 200** for critical scripts

### Check in HTML

```bash
curl -s https://yourdomain.com/ | grep -i "service-name"
```

Should find script tags or API calls for the service.

### Check in Service Dashboard

1. Log in to the third-party service account
2. Navigate to the tracking/analytics/integration section
3. Verify the domain is registered and appears in recent activity
4. Check that events are being logged (form submissions, page views, etc.)

**Checklist:**
- [ ] Service script/API is present in HTML
- [ ] Script loads successfully (Status 200 in Network tab)
- [ ] Service dashboard shows activity from your domain
- [ ] No console errors related to the service
- [ ] Key events are being tracked (form submissions, button clicks, etc.)

---

## Staging vs Production Script IDs

**CRITICAL:** Verify that **production scripts are wired to production accounts**, not staging:

| Service | Staging Config | Production Config | Status |
|---|---|---|---|
| Tag Manager | Staging ID (GTM-ABC123, etc.) | Production ID (GTM-XYZ789, etc.) | ✅ Production ID live? |
| Analytics | Staging property (G-STAGING or UA-STAGING) | Production property (G-PROD or UA-PROD) | ✅ Production property active? |
| Search Console | staging.yourdomain.com | yourdomain.com or www.yourdomain.com | ✅ Verified on prod domain? |
| CRM / Lead Tracking | Staging account / workspace | Production account / workspace | ✅ Prod account active? |
| Other services | (varies by provider) | (varies by provider) | ✅ Using prod credentials? |

**Do NOT launch with staging IDs on production domain** — this pollutes your analytics with development/testing data.

---

## 24-Hour Reporting Lag

**Google Analytics takes up to 24 hours to process and display data.** On launch day:
- ✅ Real-time dashboard shows activity within 30 seconds
- ❓ Dashboard reports (traffic, events, conversions) may not appear until next day
- ✅ Data is being collected (check Network tab to confirm requests succeed)

**If Real-time shows 0 users after 1 minute, the tracking is broken.**

---

## Troubleshooting

| Issue | Check | Fix |
|---|---|---|
| Tag Manager script returns 404 | ID is wrong (staging ID on prod, or typo) | Update to correct production ID |
| Analytics shows 0 users in Real-time | Analytics ID is wrong, or script not loading | Verify ID in script matches production account |
| Third-party service not tracking | Service script 404, or account/project ID wrong | Verify script URL and ID match service dashboard |
| Search Console verification fails | Meta tag wrong or on wrong domain | Copy exact content from Search Console account, ensure it's on prod domain |
| Console errors | Scripts fail to load or have syntax errors | Check Network tab for 404s; inspect script syntax; verify IDs/tokens are correct |

---

## Severity for QA

| Item | Severity | Impact |
|---|---|---|
| Tag Manager or Analytics not present/broken | 🔴 **Critical** (for production) | No tracking data collected; analytics blind |
| Third-party tracking not present (CRM, lead tracking, etc.) | 🟠 **High** (depends on importance to business) | Key business events not tracked (if configured) |
| Search Console verification missing | 🟠 **High** | Search Console can't crawl/index site properly |
| Wrong account IDs (staging on prod) | 🔴 **Critical** | Tracking data polluted; analytics unusable |
| Tracking script loads slowly (>1s) | 🟡 **Medium** | May delay page load; check Core Web Vitals impact |
