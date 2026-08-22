#!/usr/bin/env node
/**
 * Audit Astro files for hardcoded colors/fonts/radii (anti-patterns)
 * Should use CSS variables and semantic classes instead
 * Usage: node validate-tokens.mjs src/pages/index.astro
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const patterns = [
  {
    regex: /\bbg-\[#[0-9a-fA-F]{6}\]/g,
    fix: 'Use semantic class (e.g., bg-brand, bg-surface)',
    type: 'hardcoded-color'
  },
  {
    regex: /\btext-\[#[0-9a-fA-F]{6}\]/g,
    fix: 'Use semantic class (e.g., text-text-main, text-text-muted)',
    type: 'hardcoded-color'
  },
  {
    regex: /\bborder-\[#[0-9a-fA-F]{6}\]/g,
    fix: 'Use semantic class (e.g., border-text-main)',
    type: 'hardcoded-color'
  },
  {
    regex: /\brounded-\[\d+px\]/g,
    fix: 'Use semantic class (e.g., rounded-sm, rounded-md, rounded-lg)',
    type: 'hardcoded-radius'
  },
  {
    regex: /\bfont-\['[^']+'\]/g,
    fix: 'Use semantic class (e.g., font-sans, font-display)',
    type: 'hardcoded-font'
  },
  {
    regex: /style="[^"]*(?:color|background-color|background-image):\s*#[0-9a-fA-F]{6}/g,
    fix: 'Use CSS variable in style attr (e.g., var(--color-brand))',
    type: 'hardcoded-style'
  }
];

export async function validateTokens(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    const violations = [];

    lines.forEach((line, lineNum) => {
      patterns.forEach(({ regex, fix, type }) => {
        const matches = [...line.matchAll(regex)];
        matches.forEach(match => {
          violations.push({
            file: filePath,
            line: lineNum + 1,
            col: match.index + 1,
            match: match[0],
            type,
            fix
          });
        });
      });
    });

    if (violations.length === 0) {
      console.log(`✅ ${filePath} — No hardcoded tokens found`);
      return { valid: true, violations: [] };
    }

    console.error(`⚠️  ${filePath} — Found ${violations.length} hardcoded token(s):\n`);
    violations.forEach(v => {
      console.error(`  Line ${v.line}, col ${v.col}: ${v.match}`);
      console.error(`  → ${v.fix}\n`);
    });

    return { valid: false, violations };
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }
}

// Run from CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node validate-tokens.mjs <file-path>');
    process.exit(1);
  }

  validateTokens(filePath).then(result => {
    process.exit(result.valid ? 0 : 1);
  });
}
