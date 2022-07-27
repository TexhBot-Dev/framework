import {existsSync} from 'node:fs';

// eslint-disable-next-line max-len
/** The cached source directory, so we don't need to access the file system every time. */
let sourceDir: string;

/**
 * Fetches the source path of the project and caches it.
 * Either `src` or `dist`.
 * @return {string} string The cwd + src or dist
 */
export function getSourceDir() {
  if (sourceDir) return sourceDir;

  const cwd = process.cwd();

  // Prioritize dist folder for TypeScript users
  const dist = cwd + '/dist';
  if (existsSync(dist)) return (sourceDir = dist);

  // eslint-disable-next-line max-len
  // Fallback to src folder for non-TypeScript users, non-TypeScript users may choose to use dist folder instead however
  const src = cwd + '/src';
  if (existsSync(src)) return (sourceDir = src);

  throw new Error(
      // eslint-disable-next-line max-len
      'Could not find source directory! Please ensure if you are using TypeScript, you have a dist folder for transpiled files. If you are using JavaScript, please make a src or dist for your JavaScript files.',
  );
}
