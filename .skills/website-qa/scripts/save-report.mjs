#!/usr/bin/env node

/**
 * save-report.mjs
 *
 * Automatically save a QA report with naming convention:
 * YYYY-MM-DD_HH-MM-SS-QA_REPORT_ENVIRONMENT-git_username.md
 *
 * Usage:
 *   node save-report.mjs --url https://lucentelm.astro.com --report ./report-content.md
 *
 * Or programmatically:
 *   import { saveReport } from './save-report.mjs';
 *   const path = await saveReport(url, reportContent);
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

/**
 * Determine environment from URL
 * @param {string} url - The site URL
 * @returns {string} - LOCALHOST, STAGING, PRODUCTION, or OTHER
 */
function detectEnvironment(url) {
  if (!url) return 'OTHER';

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

  // Assume production if none of the above
  return 'PRODUCTION';
}

/**
 * Get git username
 * @returns {string} - First name only (before space), or 'unknown'
 */
function getGitUsername() {
  try {
    const fullName = execSync('git config user.name', { encoding: 'utf-8' }).trim();
    // Return first name only (before space)
    return fullName.split(/\s+/)[0] || 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Format timestamp as YYYY-MM-DD_HH-MM-SS
 * @returns {string} - Formatted timestamp
 */
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

/**
 * Generate report filename
 * @param {string} url - The site URL
 * @returns {string} - Filename without extension
 */
function generateFilename(url) {
  const timestamp = getTimestamp();
  const environment = detectEnvironment(url);
  const username = getGitUsername();

  return `${timestamp}-QA_REPORT_${environment}-${username}`;
}

/**
 * Save report to .agent/reports/
 * @param {string} url - The site URL
 * @param {string} reportContent - The full report markdown
 * @param {string} [reportsDir] - Directory to save to (default: .agent/reports/)
 * @returns {Promise<string>} - Full path to saved report
 */
export async function saveReport(url, reportContent, reportsDir = '.agent/reports') {
  try {
    // Ensure directory exists
    await fs.mkdir(reportsDir, { recursive: true });

    // Generate filename
    const filename = generateFilename(url);
    const filepath = path.join(reportsDir, `${filename}.md`);

    // Check if file already exists (warn but proceed)
    try {
      await fs.stat(filepath);
      console.log(`⚠️  Report file already exists: ${filepath}`);
      console.log(`   Overwriting with new report...`);
    } catch {
      // File doesn't exist, proceed normally
    }

    // Write report
    await fs.writeFile(filepath, reportContent, 'utf-8');

    console.log(`✅ Report saved to ${filepath}`);
    return filepath;
  } catch (error) {
    console.error(`❌ Failed to save report: ${error.message}`);
    throw error;
  }
}

// ─── CLI USAGE ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const urlIndex = args.indexOf('--url');
const reportIndex = args.indexOf('--report');

if (urlIndex !== -1 && reportIndex !== -1) {
  const url = args[urlIndex + 1];
  const reportFile = args[reportIndex + 1];

  if (!url || !reportFile) {
    console.error('Usage: node save-report.mjs --url <url> --report <filepath>');
    process.exit(1);
  }

  try {
    const reportContent = await fs.readFile(reportFile, 'utf-8');
    const savedPath = await saveReport(url, reportContent);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
