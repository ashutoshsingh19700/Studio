import fs from 'node:fs';
import path from 'node:path';

const VIDEO_DIR = path.join(process.cwd(), 'public', 'videos');

/**
 * Looks for public/videos/showreel.mp4 (or .webm) and returns its URL, or null.
 * Drop your showreel in that folder and the "Watch Showreel" buttons play it.
 */
export function findShowreel(): string | null {
  for (const ext of ['mp4', 'webm']) {
    if (fs.existsSync(path.join(VIDEO_DIR, `showreel.${ext}`))) return `/videos/showreel.${ext}`;
  }
  return null;
}
