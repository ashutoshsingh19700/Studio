import fs from 'node:fs';
import path from 'node:path';
import type { SlotId } from './slots';

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');

const isDev = process.env.NODE_ENV !== 'production';
const cache = new Map<string, string | null>();

/**
 * Looks in public/images for  <slot>.jpg|jpeg|png|webp|avif  and returns its URL,
 * or null while that photo has not been added yet.
 * Cached in production (evaluated at build time); re-checked on every render in dev
 * so a freshly dropped-in photo shows up on refresh.
 */
export function findImage(slot: SlotId): string | null {
  if (!isDev && cache.has(slot)) return cache.get(slot) ?? null;

  let found: string | null = null;
  for (const ext of EXTENSIONS) {
    const file = `${slot}.${ext}`;
    if (fs.existsSync(path.join(IMAGE_DIR, file))) {
      found = `/images/${file}`;
      break;
    }
  }

  if (!isDev) cache.set(slot, found);
  return found;
}
