import { NextResponse, type NextRequest } from 'next/server';
import { handle, requireAdmin } from '@/lib/admin/auth';
import { revalidateSite } from '@/lib/admin/revalidate';
import { HttpError, removeUpload, saveUpload } from '@/lib/gallery/media';
import { addMedia, getGallery } from '@/lib/gallery/store';
import { LIMITS } from '@/lib/gallery/types';

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    return NextResponse.json(await getGallery());
  } catch (err) {
    return handle(err);
  }
}

export async function POST(req: NextRequest) {
  let savedSrc: string | null = null;
  let savedPoster: string | null = null;
  try {
    requireAdmin(req);
    const form = await req.formData().catch(() => null);
    const file = form?.get('file');
    const poster = form?.get('poster');
    const categoryId = form?.get('categoryId');
    if (!form || !(file instanceof File) || typeof categoryId !== 'string') {
      throw new HttpError(400, 'Choose a file and a category.');
    }

    const saved = await saveUpload(file, file.type.startsWith('video/') ? 'video' : 'image');
    savedSrc = saved.url;

    if (poster instanceof File && poster.size > 0) {
      if (poster.size > LIMITS.posterBytes) throw new HttpError(413, 'Video preview image is too large.');
      savedPoster = (await saveUpload(poster, 'image')).url;
    }

    const item = await addMedia({
      type: saved.type,
      src: saved.url,
      poster: savedPoster,
      categoryId,
      alt: String(form.get('alt') ?? ''),
      ratio: Number(form.get('ratio')),
    });
    revalidateSite();
    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    // addMedia removes the files itself when the category is missing (404)
    if (!(err instanceof HttpError && err.status === 404)) {
      await Promise.all([removeUpload(savedSrc), removeUpload(savedPoster)]);
    }
    return handle(err);
  }
}
