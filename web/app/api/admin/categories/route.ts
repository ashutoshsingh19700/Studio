import { NextResponse, type NextRequest } from 'next/server';
import { handle, requireAdmin } from '@/lib/admin/auth';
import { revalidateSite } from '@/lib/admin/revalidate';
import { addCategory, getGallery } from '@/lib/gallery/store';

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    return NextResponse.json(await getGallery());
  } catch (err) {
    return handle(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const body = (await req.json().catch(() => ({}))) as { name?: unknown };
    const result = await addCategory(body.name);
    revalidateSite();
    return NextResponse.json({ category: result.category }, { status: 201 });
  } catch (err) {
    return handle(err);
  }
}
