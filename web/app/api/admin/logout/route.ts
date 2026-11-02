import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE, assertSameOrigin, handle } from '@/lib/admin/auth';

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ name: COOKIE, value: '', path: '/', maxAge: 0 });
    return res;
  } catch (err) {
    return handle(err);
  }
}
