import { NextResponse, type NextRequest } from 'next/server';
import { handle, requireAdmin } from '@/lib/admin/auth';
import { revalidateSite } from '@/lib/admin/revalidate';
import { deleteMedia, updateMedia } from '@/lib/gallery/store';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await params;
    const body = (await req.json().catch(() => ({}))) as { alt?: unknown; categoryId?: unknown };
    const item = await updateMedia(id, body);
    revalidateSite();
    return NextResponse.json({ item });
  } catch (err) {
    return handle(err);
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await params;
    await deleteMedia(id);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handle(err);
  }
}
