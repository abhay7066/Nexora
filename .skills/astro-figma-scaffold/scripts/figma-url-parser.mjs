#!/usr/bin/env node
/**
 * Parse Figma URL and extract fileKey + nodeId
 * Usage: node figma-url-parser.mjs "https://www.figma.com/design/ABC123/MyFile?node-id=123:456"
 * Returns: { fileKey: "ABC123", nodeId: "123:456" }
 */

export function parseFigmaUrl(url) {
  if (!url) throw new Error('Figma URL is required');

  // Extract fileKey from URL path: /design/[fileKey]/
  const fileKeyMatch = url.match(/\/design\/([a-zA-Z0-9]+)\//);
  if (!fileKeyMatch) {
    throw new Error(
      'Invalid Figma URL. Expected format: https://www.figma.com/design/[fileKey]/...'
    );
  }
  const fileKey = fileKeyMatch[1];

  // Extract nodeId from query: ?node-id=[nodeId]
  const nodeIdMatch = url.match(/node-id=([^&]+)/);
  if (!nodeIdMatch) {
    throw new Error('Missing node-id in URL. Expected: ?node-id=123:456');
  }
  let nodeId = nodeIdMatch[1];

  // Convert URL encoding if needed (node IDs use ':' separator)
  // Sometimes Figma URLs have '-' instead of ':' in nodeId — convert back
  nodeId = nodeId.replace(/-/g, ':');

  return { fileKey, nodeId };
}

// Run from CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  try {
    const result = parseFigmaUrl(url);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
