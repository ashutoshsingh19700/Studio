import 'server-only';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { portfolioFilters, portfolioItems } from '@/lib/content/portfolio';
import { findImage } from '@/lib/images';
import { HttpError, removeUpload } from './media';
import { LIMITS, type Category, type Gallery, type MediaItem } from './types';

/**
 * The gallery lives in data/gallery.json (categories + media list); uploaded files live in
 * data/uploads and are served by /media/[name]. On first run the file is seeded from the
 * original portfolio in lib/content/portfolio.ts, so the site looks identical until edited.
 *
 * This is plain files on disk: perfect for `next start` on a VPS or your own machine. On a
 * serverless host (Vercel, Netlify) the disk is read-only, so swap this module for a database
 * and object storage; the rest of the code only talks to the functions exported here.
 */
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'gallery.json');

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function seed(): Gallery {
  const categories: Category[] = portfolioFilters.filter((f) => f !== 'All').map((name) => ({ id: slug(name), name }));
  const now = new Date().toISOString();
  const items: MediaItem[] = portfolioItems.flatMap((p) => {
    const src = findImage(p.slot);
    if (!src) return [];
    return [
      {
        id: crypto.randomUUID(),
        type: 'image' as const,
        categoryId: slug(p.category),
        src,
        poster: null,
        alt: p.alt,
        ratio: p.ratio,
        pos: p.pos,
        createdAt: now,
      },
    ];
  });
  return { categories, items };
}

async function load(): Promise<Gallery> {
  try {
    const raw = JSON.parse(await fs.readFile(DB_FILE, 'utf8')) as Gallery;
    if (Array.isArray(raw.categories) && Array.isArray(raw.items)) return raw;
    throw new Error('gallery.json has an unexpected shape');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
    const fresh = seed();
    await save(fresh);
    return fresh;
  }
}

/** Write to a temp file then rename, so a crash can never leave a half-written gallery.json. */
async function save(db: Gallery) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2));
  await fs.rename(tmp, DB_FILE);
}

/** One write at a time, so two simultaneous uploads can't overwrite each other. */
let queue: Promise<unknown> = Promise.resolve();
function mutate<T>(fn: (db: Gallery) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const result = await fn(db);
    await save(db);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}

export const getGallery = () => load();

/** What visitors see: only categories that actually contain something. */
export async function getPublicGallery(): Promise<Gallery> {
  const db = await load();
  const used = new Set(db.items.map((i) => i.categoryId));
  return { categories: db.categories.filter((c) => used.has(c.id)), items: db.items };
}

// ── categories ──────────────────────────────────────────────────────────────

function cleanName(input: unknown): string {
  const name = typeof input === 'string' ? input.trim().replace(/\s+/g, ' ') : '';
  if (!name) throw new HttpError(400, 'Give the category a name.');
  if (name.length > LIMITS.categoryName) throw new HttpError(400, `Keep the name under ${LIMITS.categoryName} characters.`);
  return name;
}

const taken = (db: Gallery, name: string, exceptId?: string) =>
  db.categories.some((c) => c.id !== exceptId && c.name.toLowerCase() === name.toLowerCase());

export const addCategory = (input: unknown) =>
  mutate((db) => {
    const name = cleanName(input);
    if (db.categories.length >= LIMITS.maxCategories) throw new HttpError(400, 'That is the maximum number of categories.');
    if (taken(db, name)) throw new HttpError(409, 'A category with that name already exists.');
    const category = { id: crypto.randomBytes(5).toString('hex'), name };
    db.categories.push(category);
    return { category, gallery: db };
  });

export const renameCategory = (id: string, input: unknown) =>
  mutate((db) => {
    const category = db.categories.find((c) => c.id === id);
    if (!category) throw new HttpError(404, 'Category not found.');
    const name = cleanName(input);
    if (taken(db, name, id)) throw new HttpError(409, 'A category with that name already exists.');
    category.name = name;
    return db;
  });

export const moveCategory = (id: string, direction: 'earlier' | 'later') =>
  mutate((db) => {
    const i = db.categories.findIndex((c) => c.id === id);
    if (i < 0) throw new HttpError(404, 'Category not found.');
    const j = direction === 'earlier' ? i - 1 : i + 1;
    if (j < 0 || j >= db.categories.length) return db;
    [db.categories[i], db.categories[j]] = [db.categories[j], db.categories[i]];
    return db;
  });

/**
 * Removes a category. If it still holds media, the caller must say what to do with it:
 * `moveTo` another category, or `purge` to delete the media as well.
 */
export const deleteCategory = (id: string, opts: { moveTo?: string; purge?: boolean }) =>
  mutate(async (db) => {
    if (!db.categories.some((c) => c.id === id)) throw new HttpError(404, 'Category not found.');
    const inside = db.items.filter((i) => i.categoryId === id);
    if (inside.length) {
      if (opts.purge) {
        db.items = db.items.filter((i) => i.categoryId !== id);
        await Promise.all(inside.flatMap((i) => [removeUpload(i.src), removeUpload(i.poster)]));
      } else if (opts.moveTo && opts.moveTo !== id && db.categories.some((c) => c.id === opts.moveTo)) {
        inside.forEach((i) => (i.categoryId = opts.moveTo!));
      } else {
        throw new HttpError(409, 'This category still has media. Choose where it should go.');
      }
    }
    db.categories = db.categories.filter((c) => c.id !== id);
    return db;
  });

// ── media ───────────────────────────────────────────────────────────────────

const cleanAlt = (input: unknown) => (typeof input === 'string' ? input.trim().slice(0, LIMITS.alt) : '');
const clampRatio = (n: number) =>
  Number.isFinite(n) ? Math.min(LIMITS.maxRatio, Math.max(LIMITS.minRatio, Math.round(n * 100) / 100)) : 1.2;

export const addMedia = (
  input: Pick<MediaItem, 'type' | 'src' | 'poster'> & { categoryId: string; alt: string; ratio: number },
) =>
  mutate(async (db) => {
    if (!db.categories.some((c) => c.id === input.categoryId)) {
      await Promise.all([removeUpload(input.src), removeUpload(input.poster)]);
      throw new HttpError(404, 'Category not found.');
    }
    const item: MediaItem = {
      id: crypto.randomUUID(),
      type: input.type,
      categoryId: input.categoryId,
      src: input.src,
      poster: input.poster,
      alt: cleanAlt(input.alt) || (input.type === 'video' ? 'Video' : 'Photo'),
      ratio: clampRatio(input.ratio),
      createdAt: new Date().toISOString(),
    };
    db.items.unshift(item);
    return item;
  });

export const updateMedia = (id: string, patch: { alt?: unknown; categoryId?: unknown }) =>
  mutate((db) => {
    const item = db.items.find((i) => i.id === id);
    if (!item) throw new HttpError(404, 'Item not found.');
    if (patch.alt !== undefined) item.alt = cleanAlt(patch.alt) || item.alt;
    if (patch.categoryId !== undefined) {
      if (typeof patch.categoryId !== 'string' || !db.categories.some((c) => c.id === patch.categoryId)) {
        throw new HttpError(404, 'Category not found.');
      }
      item.categoryId = patch.categoryId;
    }
    return item;
  });

export const deleteMedia = (id: string) =>
  mutate(async (db) => {
    const item = db.items.find((i) => i.id === id);
    if (!item) throw new HttpError(404, 'Item not found.');
    db.items = db.items.filter((i) => i.id !== id);
    await Promise.all([removeUpload(item.src), removeUpload(item.poster)]);
    return db;
  });
