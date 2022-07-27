import {opendir} from 'node:fs/promises';

/**
 * Walks recursively through a directory and executes a callback for each file.
 * @param {string} dir  The directory to walk
 * @param {regex} filter Regex to filter files by
 */
export async function walk(dir: string, filter?: RegExp): Promise<string[]> {
  const files: string[] = [];
  const dirEntries = await opendir(dir);
  for await (const dirEntry of dirEntries) {
    if (dirEntry.isFile()) {
      if (filter && !filter.test(dirEntry.name)) continue;
      files.push(dir + '/' + dirEntry.name);
    } else if (dirEntry.isDirectory()) {
      files.push(...await walk(dir + '/' + dirEntry.name, filter));
    }
  }
  return files;
}
