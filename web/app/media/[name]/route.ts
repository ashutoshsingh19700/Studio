import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { NextResponse, type NextRequest } from 'next/server';
import { MIME_BY_EXT, UPLOAD_DIR, UPLOAD_NAME } from '@/lib/gallery/media';

/** Serves files uploaded from the admin panel (with Range support so videos can seek). */
export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!UPLOAD_NAME.test(name)) return new NextResponse('Not found', { status: 404 });

  const file = path.join(UPLOAD_DIR, name);
  const stat = await fsp.stat(file).catch(() => null);
  if (!stat) return new NextResponse('Not found', { status: 404 });

  const headers: Record<string, string> = {
    'Content-Type': MIME_BY_EXT[name.split('.').pop()!],
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
  };

  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get('range') ?? '');
  if (range && (range[1] || range[2])) {
    const start = Math.max(0, range[1] ? Number(range[1]) : stat.size - Number(range[2]));
    const end = Math.min(range[1] && range[2] ? Number(range[2]) : stat.size - 1, stat.size - 1);
    if (start > end) {
      return new NextResponse(null, { status: 416, headers: { 'Content-Range': `bytes */${stat.size}` } });
    }
    const body = Readable.toWeb(fs.createReadStream(file, { start, end })) as ReadableStream;
    return new NextResponse(body, {
      status: 206,
      headers: { ...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': String(end - start + 1) },
    });
  }

  const body = Readable.toWeb(fs.createReadStream(file)) as ReadableStream;
  return new NextResponse(body, { headers: { ...headers, 'Content-Length': String(stat.size) } });
}
