import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { HttpError } from '@/lib/gallery/media';

export const COOKIE = 'kpds_admin';
const TTL_SECONDS = 60 * 60 * 24 * 7;

/**
 * Set ADMIN_PASSWORD (8+ characters) in .env.local. ADMIN_SECRET is optional extra salt for
 * the session signature. Changing either one signs every existing session out.
 */
const password = () => process.env.ADMIN_PASSWORD ?? '';
export const isConfigured = () => password().length >= 8;

const key = () => crypto.createHash('sha256').update(`kpds-admin|${process.env.ADMIN_SECRET ?? ''}|${password()}`).digest();
const sign = (payload: string) => crypto.createHmac('sha256', key()).update(payload).digest('base64url');

const safeEqual = (a: string, b: string) => {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
};

export const checkPassword = (attempt: string) => isConfigured() && safeEqual(attempt, password());

export function createSessionToken(): string {
  const exp = String(Math.floor(Date.now() / 1000) + TTL_SECONDS);
  return `${exp}.${sign(exp)}`;
}

function validToken(token: string | undefined): boolean {
  if (!token || !isConfigured()) return false;
  const [exp, mac] = token.split('.');
  if (!exp || !mac || !safeEqual(mac, sign(exp))) return false;
  return Number(exp) * 1000 > Date.now();
}

export const sessionCookie = (token: string) => ({
  name: COOKIE,
  value: token,
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: TTL_SECONDS,
});

/** For server components / layouts. */
export async function hasSession(): Promise<boolean> {
  return validToken((await cookies()).get(COOKIE)?.value);
}

/**
 * Guard for admin route handlers. Throws HttpError when the caller isn't signed in, or when a
 * state-changing request comes from another site (Origin must match Host).
 */
export function requireAdmin(req: NextRequest) {
  if (!validToken(req.cookies.get(COOKIE)?.value)) throw new HttpError(401, 'Please sign in again.');
  assertSameOrigin(req);
}

export function assertSameOrigin(req: NextRequest) {
  if (req.method === 'GET' || req.method === 'HEAD') return;
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== req.headers.get('host')) throw new HttpError(403, 'Blocked cross-site request.');
}

/** Turns thrown errors into JSON responses; unexpected ones are logged, not leaked. */
export function handle(err: unknown) {
  if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
  console.error('[admin]', err);
  return NextResponse.json({ error: 'Something went wrong on the server.' }, { status: 500 });
}

// ── login throttling: 6 wrong passwords per 15 minutes per address ─────────
const attempts = new Map<string, { n: number; reset: number }>();
const WINDOW = 15 * 60 * 1000;
const MAX = 6;

export function throttle(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.reset < now) attempts.set(ip, { n: 0, reset: now + WINDOW });
  const cur = attempts.get(ip)!;
  return {
    blocked: cur.n >= MAX,
    fail: () => void cur.n++,
    clear: () => void attempts.delete(ip),
  };
}
