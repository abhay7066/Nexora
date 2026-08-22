#!/usr/bin/env node
/**
 * Initialize .agent/project-map.json with schema
 * Usage: node create-project-map.mjs --fileKey ABC123 --name "My Project" --gridWidth 1440
 */

import fs from 'node:fs/promises';
import path from 'node:path';

export async function createProjectMap({ fileKey, projectName, gridWidth = '1660' }) {
  const projectMap = {
    figma: {
      fileKey,
      pages: [],
      frames: {},
      styles: {
        colors: {},
        fonts: {},
        fontSizes: {},
        spacing: {}
      },
      assets: {}
    },
    contentCollections: {},
    integrations: {
      contactForm: { configured: false, method: 'none' },
      seo: { configured: false },
      scrollReveal: { configured: false },
      i18n: { configured: false }
    },
    components: {
      completed: [],
      inProgress: '',
      pending: []
    },
    pages: {
      completed: [],
      pending: []
    },
    metadata: {
      projectName,
      gridWidth,
      createdAt: new Date().toISOString()
    }
  };

  const dirPath = '.agent';
  await fs.mkdir(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'project-map.json');
  await fs.writeFile(filePath, JSON.stringify(projectMap, null, 2));

  console.log(`✅ Created ${filePath}`);
  return projectMap;
}

// Run from CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2).reduce((acc, arg, i, arr) => {
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = arr[i + 1]?.startsWith('--') ? '' : arr[i + 1] || '';
      acc[key] = value;
    }
    return acc;
  }, {});

  try {
    await createProjectMap({
      fileKey: args.fileKey || '',
      projectName: args.name || 'Untitled Project',
      gridWidth: args.gridWidth || '1660'
    });
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
