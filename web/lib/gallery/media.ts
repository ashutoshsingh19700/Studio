import 'server-only';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LIMITS, type MediaType } from './types';

export const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');

/** File names we create ourselves; anything else is rejected before touching the disk. */
export const UPLOAD_NAME = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|avif|mp4|webm|mov)$/;

export const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
};

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Works out what a file really is from its first bytes; the browser-supplied type and name are ignored. */
function sniff(b: Uint8Array): { ext: string; type: MediaType } | null {
  const ascii = (from: number, to: number) => String.fromCharCode(...b.subarray(from, to));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: 'jpg', type: 'image' };
  if (b[0] === 0x89 && ascii(1, 4) === 'PNG') return { ext: 'png', type: 'image' };
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return { ext: 'webp', type: 'image' };
  if (b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) return { ext: 'webm', type: 'video' };
  if (ascii(4, 8) === 'ftyp') {
    const brand = ascii(8, 12);
    if (brand === 'avif' || brand === 'avis') return { ext: 'avif', type: 'image' };
    if (brand === 'qt  ') return { ext: 'mov', type: 'video' };
    return { ext: 'mp4', type: 'video' };
  }
  return null;
}

/** Validates and stores an uploaded file. Returns the public URL and what it turned out to be. */
export async function saveUpload(
  file: File,
  allow: MediaType,
): Promise<{ url: string; name: string; type: MediaType }> {
  const cap = allow === 'image' ? LIMITS.imageBytes : LIMITS.videoBytes;
  if (file.size === 0) throw new HttpError(400, 'That file is empty.');
  if (file.size > cap) throw new HttpError(413, `Too large (limit ${Math.round(cap / 1024 / 1024)} MB).`);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const found = sniff(bytes.subarray(0, 16));
  if (!found || found.type !== allow) {
    throw new HttpError(415, allow === 'image' ? 'Use a JPG, PNG, WebP or AVIF image.' : 'Use an MP4, WebM or MOV video.');
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${crypto.randomUUID()}.${found.ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes, { flag: 'wx' });
  return { url: `/media/${name}`, name, type: found.type };
}

/** Removes an uploaded file. URLs outside /media/ (the original site photos) are never touched. */
export async function removeUpload(url: string | null | undefined) {
  if (!url?.startsWith('/media/')) return;
  const name = url.slice('/media/'.length);
  if (!UPLOAD_NAME.test(name)) return;
  await fs.rm(path.join(UPLOAD_DIR, name), { force: true });
}
