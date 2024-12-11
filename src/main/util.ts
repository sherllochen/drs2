/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

/**
 * Reads all files in the given directory path.
 * @param directoryPath - Path to the directory to read.
 * @returns Array of file names (with full paths).
 */
export function getFileList(directoryPath: string): string[] {
  try {
    const files = fs.readdirSync(directoryPath);
    // Convert to absolute paths (optional)
    const absoluteFilePaths = files
      .filter((file) => file.endsWith('.mp3')) // Only include `.txt` files
      .map((file) => `http://localhost:3000/static/${file}`);

    console.log('Files in directory:', absoluteFilePaths); // For testing
    return absoluteFilePaths;
  } catch (error) {
    console.error('Error reading directory:', error.message);
    return [];
  }
}

export function readFile(fullPath: string) {
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    console.log('actuall read file', content);
    // Read the file content (UTF-8 encoding)
    return content;
  } catch (error) {
    // @ts-ignore
    console.error('Failed to read file:', error.message);
    throw new Error('Failed to read file');
  }
}
