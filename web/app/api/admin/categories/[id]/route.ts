import { NextResponse, type NextRequest } from 'next/server';
import { handle, requireAdmin } from '@/lib/admin/auth';
import { revalidateSite } from '@/lib/admin/revalidate';
import { HttpError } from '@/lib/gallery/media';
import { deleteCategory, moveCategory, renameCategory } from '@/lib/gallery/store';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await params;
    const body = (await req.json().catch(() => ({}))) as { name?: unknown; move?: unknown };
    let gallery;
    if (body.move === 'earlier' || body.move === 'later') gallery = await moveCategory(id, body.move);
    else if (body.name !== undefined) gallery = await renameCategory(id, body.name);
    else throw new HttpError(400, 'Nothing to change.');
    revalidateSite();
    return NextResponse.json(gallery);
  } catch (err) {
    return handle(err);
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await params;
    const q = req.nextUrl.searchParams;
    const gallery = await deleteCategory(id, { moveTo: q.get('moveTo') ?? undefined, purge: q.get('purge') === '1' });
    revalidateSite();
    return NextResponse.json(gallery);
  } catch (err) {
    return handle(err);
  }
}
