import { NextResponse, type NextRequest } from 'next/server';
import { assertSameOrigin, checkPassword, createSessionToken, handle, isConfigured, sessionCookie, throttle } from '@/lib/admin/auth';
import { HttpError } from '@/lib/gallery/media';

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    if (!isConfigured()) throw new HttpError(503, 'Admin is not set up. Add ADMIN_PASSWORD to .env.local and restart.');
    const limit = throttle(req);
    if (limit.blocked) throw new HttpError(429, 'Too many attempts. Try again in 15 minutes.');

    const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
    const attempt = typeof body?.password === 'string' ? body.password : '';
    if (!checkPassword(attempt)) {
      limit.fail();
      await new Promise((r) => setTimeout(r, 500));
      throw new HttpError(401, 'That password is not right.');
    }
    limit.clear();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(sessionCookie(createSessionToken()));
    return res;
  } catch (err) {
    return handle(err);
  }
}
