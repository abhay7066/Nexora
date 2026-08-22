#!/usr/bin/env node
/**
 * Initialize .agent/session.md with schema
 * Usage: node create-session-md.mjs --name "My Project" --fileKey ABC123
 */

import fs from 'node:fs/promises';
import path from 'node:path';

export async function createSessionMd({ projectName, fileKey, pendingSections = [] }) {
  const now = new Date().toISOString().split('T')[0];

  let pendingList = '';
  if (pendingSections.length > 0) {
    pendingList =
      pendingSections.map(s => `- [ ] ${s.name} (nodeId: ${s.nodeId})`).join('\n') + '\n';
  } else {
    pendingList = '- [ ] (discover sections via get_metadata)\n';
  }

  const content = `# Session State

## Project
- Name: ${projectName}
- Last updated: ${now}

## Figma
- File key: ${fileKey}
- Auth: Figma MCP (required)
- Design tokens: recorded in DESIGN.md (do not re-fetch if present)

## Content Collections
- Collections defined: (none yet)

## Progress

### Completed
(none yet)

### In Progress
(none)

### Pending
${pendingList}
### Skipped
(none)

## Notes
- Figma export URLs may fail — use placeholder and report at end
- Always verify image format after download (magic bytes)
- Update this file before ending any response
`;

  const dirPath = '.agent';
  await fs.mkdir(dirPath, { recursive: true });

  const filePath = path.join(dirPath, 'session.md');
  await fs.writeFile(filePath, content);

  console.log(`✅ Created ${filePath}`);
  return content;
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
    await createSessionMd({
      projectName: args.name || 'Untitled Project',
      fileKey: args.fileKey || '',
      pendingSections: [] // Can be expanded to accept section list
    });
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
