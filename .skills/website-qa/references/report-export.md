# Report Export Reference

## DOCX Report — Generation Script

Install the dependency **locally** in the project (a global install is NOT resolvable by `require()`):
```
npm install --no-save docx
```

Save the script below as `scripts/generate-qa-report.cjs` — the `.cjs` extension is required
because the project's `package.json` has `"type": "module"` and this script uses `require()`.
Inject the audit JSON data into the `AUDIT_DATA` constant, then run:
```
node scripts/generate-qa-report.cjs
```

```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        LevelFormat, PageBreak, TabStopType, TabStopPosition } = require('docx');
const fs = require('fs');

// ── INJECT AUDIT DATA HERE ──────────────────────────────────────────────────
const AUDIT_DATA = { /* paste full JSON from audit here */ };
const OUTPUT_PATH = 'qa-report.docx'; // project-relative; rename to qa-report-<domain>-<date>.docx
// ────────────────────────────────────────────────────────────────────────────

const SEV_COLORS = { critical: 'C00000', high: 'ED7D31', medium: '2E75B6', low: '548235' };
const SEV_SHADING = { critical: 'FDECEA', high: 'FEF3EC', medium: 'EBF3FB', low: 'EFF7EC' };
const border = (color='CCCCCC') => ({ style: BorderStyle.SINGLE, size: 1, color });
const borders = (c) => ({ top:border(c),bottom:border(c),left:border(c),right:border(c) });
const cell = (text, opts={}) => new TableCell({
  borders: borders(opts.borderColor||'DDDDDD'),
  width: { size: opts.width||2000, type: WidthType.DXA },
  shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
  margins: { top:80, bottom:80, left:120, right:120 },
  children: [new Paragraph({
    alignment: opts.align||AlignmentType.LEFT,
    children: [new TextRun({ text, font:'Arial', size: opts.size||20,
      bold: opts.bold||false, color: opts.color||'000000' })]
  })]
});

const counts = AUDIT_DATA.counts || {};
// Strip protocol AND leading www. — otherwise every www site yields domain "www"
const domain = (AUDIT_DATA.url||'site').replace(/https?:\/\//,'').replace(/^www\./,'').split(/[/.]/)[0];
const dateStr = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

// ── HELPERS ─────────────────────────────────────────────────────────────────
function h(text, level=HeadingLevel.HEADING_1, color='1F3864') {
  return new Paragraph({
    heading: level,
    spacing: { before: level===HeadingLevel.HEADING_1?360:240, after:120 },
    children: [new TextRun({ text, font:'Arial', bold:true,
      size: level===HeadingLevel.HEADING_1?36:level===HeadingLevel.HEADING_2?28:24,
      color })]
  });
}
function p(text, opts={}) {
  return new Paragraph({
    spacing: { before:60, after:60 },
    alignment: opts.align||AlignmentType.LEFT,
    children: [new TextRun({ text, font:'Arial', size: opts.size||20,
      color: opts.color||'333333', bold: opts.bold||false, italics: opts.italic||false })]
  });
}
function spacer() { return new Paragraph({ spacing:{before:120,after:0}, children:[] }); }

// ── ISSUE TABLE for a category ───────────────────────────────────────────────
function issueTable(issues) {
  const headerRow = new TableRow({ children:[
    cell('Severity',{width:1200,shading:'1F3864',color:'FFFFFF',bold:true,size:18,borderColor:'1F3864'}),
    cell('Location',{width:2000,shading:'1F3864',color:'FFFFFF',bold:true,size:18,borderColor:'1F3864'}),
    cell('Issue',   {width:3200,shading:'1F3864',color:'FFFFFF',bold:true,size:18,borderColor:'1F3864'}),
    cell('Fix',     {width:2960,shading:'1F3864',color:'FFFFFF',bold:true,size:18,borderColor:'1F3864'}),
  ]});
  const dataRows = issues.map(iss => new TableRow({ children:[
    cell(iss.severity.toUpperCase(), {width:1200, shading:SEV_SHADING[iss.severity]||'FFFFFF',
      color:SEV_COLORS[iss.severity]||'333333', bold:true, size:18 }),
    cell(iss.location||'', {width:2000}),
    cell(iss.issue||'',    {width:3200}),
    cell(iss.fix||'',      {width:2960}),
  ]}));
  return new Table({
    width: { size:9360, type:WidthType.DXA },
    columnWidths: [1200,2000,3200,2960],
    rows: [headerRow, ...dataRows]
  });
}

// ── SUMMARY TABLE ────────────────────────────────────────────────────────────
function summaryTable() {
  const items = [
    {label:'Total Issues', val:counts.total||0, bg:'EDEDED', fg:'111111'},
    {label:'Critical',     val:counts.critical||0, bg:SEV_SHADING.critical, fg:SEV_COLORS.critical},
    {label:'High',         val:counts.high||0,     bg:SEV_SHADING.high,     fg:SEV_COLORS.high},
    {label:'Medium',       val:counts.medium||0,   bg:SEV_SHADING.medium,   fg:SEV_COLORS.medium},
    {label:'Low',          val:counts.low||0,      bg:SEV_SHADING.low,      fg:SEV_COLORS.low},
  ];
  return new Table({
    width: { size:4800, type:WidthType.DXA },
    columnWidths: [2400,2400],
    rows: items.map(i => new TableRow({ children:[
      cell(i.label, {width:2400, bold:true, size:20}),
      cell(String(i.val), {width:2400, shading:i.bg, color:i.fg, bold:true, size:22, align:AlignmentType.CENTER}),
    ]}))
  });
}

// ── BUILD DOCUMENT ────────────────────────────────────────────────────────────
const children = [];

// Cover page
children.push(spacer(), spacer(), spacer(),
  new Paragraph({ alignment:AlignmentType.CENTER, spacing:{after:200}, children:[
    new TextRun({text:'WEBSITE QA REPORT', font:'Arial', size:56, bold:true, color:'1F3864'})]}),
  new Paragraph({ alignment:AlignmentType.CENTER, spacing:{after:120}, children:[
    new TextRun({text:AUDIT_DATA.url||'', font:'Arial', size:24, color:'666666'})]}),
  new Paragraph({ alignment:AlignmentType.CENTER, spacing:{after:80}, children:[
    new TextRun({text:`Audit Date: ${dateStr}`, font:'Arial', size:22, color:'888888'})]}),
  new Paragraph({ alignment:AlignmentType.CENTER, spacing:{after:80}, children:[
    new TextRun({text:`Generated by Website QA Agent`, font:'Arial', size:20, italics:true, color:'AAAAAA'})]}),
  spacer(), spacer(),
  new Paragraph({ children:[new PageBreak()] })
);

// Executive Summary
children.push(h('Executive Summary'), summaryTable(), spacer(),
  p(AUDIT_DATA.summary||`This audit reviewed ${AUDIT_DATA.url} across up to 10 dimensions. See category sections below for full findings.`),
  spacer()
);

// Top Priority Fixes
if (AUDIT_DATA.top_priority?.length) {
  children.push(h('Top Priority Fixes'), spacer());
  AUDIT_DATA.top_priority.forEach((fix,i) => {
    children.push(new Paragraph({
      spacing:{before:60,after:60},
      numbering:{ reference:'numbers', level:0 },
      children:[new TextRun({
        text:`[${fix.category}] ${fix.action}`, font:'Arial', size:20,
        color: i<3?'C00000':'333333', bold: i<3
      })]
    }));
  });
  children.push(spacer());
}

// Category sections
(AUDIT_DATA.categories||[]).forEach(cat => {
  children.push(new Paragraph({ children:[new PageBreak()] }));
  children.push(h(`${cat.emoji} ${cat.name}`, HeadingLevel.HEADING_2));

  if (cat.status==='skipped') {
    children.push(p('This check was skipped.', {italic:true, color:'999999'}));
    return;
  }
  if (!cat.issues?.length) {
    children.push(p('No issues found — this dimension is clean.', {color:'548235', bold:true}));
    return;
  }
  children.push(p(`${cat.issues.length} issue${cat.issues.length!==1?'s':''} found:`), spacer(),
    issueTable(cat.issues), spacer()
  );

  // Link summary table
  if (cat.id==='links' && cat.link_summary) {
    const ls = cat.link_summary;
    children.push(h('Link Health Summary', HeadingLevel.HEADING_3, '2E75B6'), spacer(),
      new Table({
        width:{ size:5000, type:WidthType.DXA }, columnWidths:[2500,2500],
        rows:[
          new TableRow({children:[cell('Metric',{width:2500,bold:true,shading:'EBF3FB'}), cell('Count',{width:2500,bold:true,shading:'EBF3FB'})]}),
          new TableRow({children:[cell('Links Checked',{width:2500}), cell(String(ls.checked||0),{width:2500})]}),
          new TableRow({children:[cell('Working (200)',{width:2500}), cell(String(ls.working||0),{width:2500,shading:'EFF7EC',color:'548235'})]}),
          new TableRow({children:[cell('Broken (404/500)',{width:2500}), cell(String(ls.broken||0),{width:2500,shading:'FDECEA',color:'C00000'})]}),
          new TableRow({children:[cell('Placeholders (#)',{width:2500}), cell(String(ls.placeholders||0),{width:2500,shading:'FEF3EC',color:'ED7D31'})]}),
          new TableRow({children:[cell('Redirects',{width:2500}), cell(String(ls.redirects||0),{width:2500})]}),
        ]
      }), spacer()
    );
  }
});

// Build and save
const doc = new Document({
  numbering: { config:[{ reference:'numbers', levels:[{
    level:0, format:LevelFormat.DECIMAL, text:'%1.', alignment:AlignmentType.LEFT,
    style:{ paragraph:{ indent:{ left:720, hanging:360 } } }
  }]}]},
  styles: {
    default: { document:{ run:{ font:'Arial', size:20 }}},
    paragraphStyles: [
      { id:'Heading1', name:'Heading 1', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:36, bold:true, font:'Arial', color:'1F3864' },
        paragraph:{ spacing:{ before:360, after:120 }, outlineLevel:0 }},
      { id:'Heading2', name:'Heading 2', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:28, bold:true, font:'Arial', color:'2E75B6' },
        paragraph:{ spacing:{ before:240, after:120 }, outlineLevel:1 }},
      { id:'Heading3', name:'Heading 3', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:24, bold:true, font:'Arial', color:'404040' },
        paragraph:{ spacing:{ before:180, after:80 }, outlineLevel:2 }},
    ]
  },
  sections:[{ properties:{ page:{ size:{ width:12240, height:15840 },
    margin:{ top:1440, right:1440, bottom:1440, left:1440 }}}, children }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log('DOCX saved to', OUTPUT_PATH);
});
```

---

## HTML Report — Generation Template

Write this as a `.html` file with the Write tool. Inject audit JSON into the `AUDIT` constant.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>QA Report — SITE_URL</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,sans-serif;background:#f4f6f9;color:#222;font-size:14px;line-height:1.5}
  .cover{background:linear-gradient(135deg,#1f3864 0%,#2e75b6 100%);color:#fff;padding:60px 48px 48px;margin-bottom:0}
  .cover h1{font-size:32px;font-weight:700;margin-bottom:8px;letter-spacing:-.5px}
  .cover .url{font-size:14px;opacity:.75;font-family:monospace;margin-bottom:4px}
  .cover .meta{font-size:13px;opacity:.55;margin-top:12px}
  .wrap{max-width:1000px;margin:0 auto;padding:32px 24px}
  .summary-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:24px 0}
  .sc{background:#fff;border-radius:8px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.08)}
  .sc-n{font-size:32px;font-weight:700;line-height:1}
  .sc-l{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-top:4px}
  .sc.cr .sc-n{color:#c00000} .sc.hi .sc-n{color:#ed7d31} .sc.me .sc-n{color:#2e75b6} .sc.lo .sc-n{color:#548235}
  .prio{background:#fff5f5;border:1px solid #fcc;border-radius:8px;padding:16px 20px;margin:24px 0}
  .prio h3{color:#c00000;font-size:13px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px}
  .prio ol{padding-left:20px}
  .prio li{padding:4px 0;font-size:13px;border-bottom:1px solid #f3d0d0}
  .prio li:last-child{border-bottom:none}
  .cat{background:#fff;border-radius:8px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden}
  .cat-hdr{display:flex;align-items:center;gap:10px;padding:14px 18px;cursor:pointer;user-select:none;border-bottom:1px solid #eee}
  .cat-hdr:hover{background:#f9fafb}
  .cat-ico{font-size:18px}
  .cat-name{font-weight:600;font-size:14px;flex:1}
  .badge{font-size:11px;padding:3px 10px;border-radius:99px;font-weight:600}
  .badge.has{background:#fdecea;color:#c00000} .badge.ok{background:#eff7ec;color:#548235} .badge.skip{background:#f3f3f3;color:#999}
  .chev{font-size:11px;color:#999;transition:transform .2s}
  .cat-hdr.open .chev{transform:rotate(180deg)}
  .cat-body{display:none;padding:0}
  .cat-body.open{display:block}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{background:#1f3864;color:#fff;padding:8px 12px;text-align:left;font-weight:600;font-size:12px}
  td{padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:#fafafa}
  .sev{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;text-transform:uppercase}
  .sev.critical{background:#fdecea;color:#c00000} .sev.high{background:#fef3ec;color:#ed7d31}
  .sev.medium{background:#ebf3fb;color:#2e75b6} .sev.low{background:#eff7ec;color:#548235}
  .no-iss{padding:16px 18px;color:#548235;font-style:italic;font-size:13px}
  .skip-msg{padding:16px 18px;color:#999;font-style:italic;font-size:13px}
  .lk-sum{background:#f4f8ff;border-top:1px solid #dde8f5;padding:12px 18px;display:flex;gap:24px;font-size:12px;flex-wrap:wrap}
  .lk-s strong{display:block;font-size:18px;font-weight:700}
  .lk-s.ok strong{color:#548235} .lk-s.bad strong{color:#c00000} .lk-s.warn strong{color:#ed7d31}
  .section-title{font-size:18px;font-weight:700;color:#1f3864;margin:28px 0 12px;padding-bottom:6px;border-bottom:2px solid #2e75b6}
  footer{text-align:center;padding:32px;color:#aaa;font-size:12px;margin-top:32px}
  @media print{body{background:#fff}.cat-body{display:block!important}.chev{display:none}}
</style>
</head>
<body>
<div class="cover">
  <h1>Website QA Report</h1>
  <div class="url">SITE_URL_PLACEHOLDER</div>
  <div class="meta">Audit Date: DATE_PLACEHOLDER &nbsp;|&nbsp; Generated by Website QA Agent</div>
</div>
<div class="wrap">
  <div class="section-title">Executive Summary</div>
  <div class="summary-grid" id="sg"></div>
  <div id="prio"></div>
  <div class="section-title">Issues by Category</div>
  <div id="cats"></div>
  <footer>Website QA Agent &mdash; DATE_PLACEHOLDER</footer>
</div>
<script>
const AUDIT = AUDIT_JSON_PLACEHOLDER;
const c = AUDIT.counts||{};

document.getElementById('sg').innerHTML = `
  <div class="sc"><div class="sc-n">${c.total||0}</div><div class="sc-l">Total Issues</div></div>
  <div class="sc cr"><div class="sc-n">${c.critical||0}</div><div class="sc-l">Critical</div></div>
  <div class="sc hi"><div class="sc-n">${c.high||0}</div><div class="sc-l">High</div></div>
  <div class="sc me"><div class="sc-n">${c.medium||0}</div><div class="sc-l">Medium</div></div>
  <div class="sc lo"><div class="sc-n">${c.low||0}</div><div class="sc-l">Low</div></div>`;

if (AUDIT.top_priority?.length) {
  document.getElementById('prio').innerHTML = `<div class="prio"><h3>Top Priority Fixes</h3><ol>${
    AUDIT.top_priority.map(p=>`<li><strong>[${p.category}]</strong> ${p.action}</li>`).join('')
  }</ol></div>`;
}

const cc = document.getElementById('cats');
(AUDIT.categories||[]).forEach((cat,i) => {
  const n = cat.issues?.length||0;
  const bc = cat.status==='skipped'?'skip':(n===0?'ok':'has');
  const bl = cat.status==='skipped'?'Skipped':(n===0?'Clean':`${n} issue${n!==1?'s':''}`);
  let body = '';
  if (cat.status==='skipped') body = `<div class="skip-msg">Skipped — not selected or no Figma provided.</div>`;
  else if (!n) body = `<div class="no-iss">No issues found in this category.</div>`;
  else body = `<table><thead><tr><th style="width:100px">Severity</th><th style="width:180px">Location</th><th>Issue</th><th>Fix</th></tr></thead><tbody>${
    cat.issues.map(iss=>`<tr><td><span class="sev ${iss.severity}">${iss.severity}</span></td><td>${iss.location||''}</td><td>${iss.issue||''}</td><td>${iss.fix||''}</td></tr>`).join('')
  }</tbody></table>`;
  if (cat.id==='links'&&cat.link_summary) {
    const ls=cat.link_summary;
    body += `<div class="lk-sum">
      <div class="lk-s"><strong>${ls.checked||0}</strong>Checked</div>
      <div class="lk-s ok"><strong>${ls.working||0}</strong>Working</div>
      <div class="lk-s bad"><strong>${ls.broken||0}</strong>Broken</div>
      <div class="lk-s warn"><strong>${ls.placeholders||0}</strong>Placeholders</div>
      <div class="lk-s"><strong>${ls.redirects||0}</strong>Redirects</div>
    </div>`;
  }
  const sec = document.createElement('div');
  sec.className = 'cat';
  const open = i<2;
  sec.innerHTML = `<div class="cat-hdr${open?' open':''}" onclick="tog(this)">
    <span class="cat-ico">${cat.emoji}</span>
    <span class="cat-name">${cat.name}</span>
    <span class="badge ${bc}">${bl}</span>
    <span class="chev">▼</span>
  </div><div class="cat-body${open?' open':''}">${body}</div>`;
  cc.appendChild(sec);
});

function tog(h){h.classList.toggle('open');h.nextElementSibling.classList.toggle('open')}
</script>
</body>
</html>
```

## How to Use These Templates

### Generating the HTML report:
1. Take the audit JSON result
2. Copy the HTML template above
3. Replace `SITE_URL_PLACEHOLDER` with the actual URL
4. Replace `DATE_PLACEHOLDER` with today's date
5. Replace `AUDIT_JSON_PLACEHOLDER` with the full JSON object (as a JS object literal, not a string)
6. Write it to `qa-report-[domain]-[date].html` in the project root (Write tool)
7. Tell the user the file path — they can open it directly in a browser

### Generating the DOCX report:
1. Install docx locally if needed: `npm install --no-save docx` (never `-g` — global packages aren't on the require path)
2. Copy the Node.js script above
3. Replace `AUDIT_DATA` constant with the full JSON
4. Replace `OUTPUT_PATH` with `qa-report-[domain]-[date].docx`
5. Save as `scripts/generate-qa-report.cjs` (`.cjs` — the project is `"type": "module"`)
6. Run: `node scripts/generate-qa-report.cjs`
7. Tell the user the output file path
8. Clean up afterwards: delete `scripts/generate-qa-report.cjs` and don't commit the report or the `docx` package (`--no-save` leaves package.json untouched)