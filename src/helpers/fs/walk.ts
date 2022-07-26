import { opendir } from "node:fs/promises";

/**
 * Walks recursively through a directory and executes a callback for each file.
 * @param dir The directory to walk
 * @param cb The callback to call for each file
 */
export async function walk(dir: string, cb: (file: string) => unknown) {
  try {
    const files = await opendir(dir);
    for await (const file of files) {
      const path = dir + "/" + file.name;
      file.isDirectory() ? walk(path, cb) : cb(path);
    }
  } catch {}
}
