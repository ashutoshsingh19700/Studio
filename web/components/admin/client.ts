import type { MediaItem } from '@/lib/gallery/types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

/** Session expired mid-use: go back to the login screen. */
function handleExpired(status: number) {
  // full navigation on purpose: it drops all in-memory admin state along with the dead session
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  if (status === 401) window.location.href = '/admin/login';
}

export async function api<T>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const { json, ...rest } = init ?? {};
  let res: Response;
  try {
    res = await fetch(url, {
      ...rest,
      headers: json !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: json !== undefined ? JSON.stringify(json) : rest.body,
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your connection.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    handleExpired(res.status);
    throw new ApiError((data as { error?: string }).error ?? 'Request failed.', res.status);
  }
  return data as T;
}

/** multipart upload with progress (fetch can't report upload progress). */
export function uploadMedia(form: FormData, onProgress: (fraction: number) => void): Promise<MediaItem> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/admin/media');
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onerror = () => reject(new ApiError('Upload failed. Check your connection.', 0));
    xhr.onload = () => {
      let data: { item?: MediaItem; error?: string } = {};
      try {
        data = JSON.parse(xhr.responseText);
      } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && data.item) return resolve(data.item);
      handleExpired(xhr.status);
      reject(new ApiError(data.error ?? 'Upload failed.', xhr.status));
    };
    xhr.send(form);
  });
}

// ── reading a file in the browser before upload ─────────────────────────────

const withTimeout = <T,>(p: Promise<T>, ms: number, fallback: T) =>
  Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), ms))]);

export function probeImage(file: File): Promise<{ ratio: number }> {
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ ratio: img.naturalWidth / img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This image could not be read. It may be damaged or in an unsupported format.'));
    };
    img.src = url;
  });
}

/** Reads the video's shape and grabs a still frame to use as its preview picture. */
export async function probeVideo(file: File): Promise<{ ratio: number; poster: Blob | null }> {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.src = url;

  const frame = new Promise<{ ratio: number; poster: Blob | null }>((resolve) => {
    const finish = async () => {
      const w = video.videoWidth;
      const h = video.videoHeight;
      let poster: Blob | null = null;
      if (w && h) {
        try {
          const scale = Math.min(1, 720 / w);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(w * scale);
          canvas.height = Math.round(h * scale);
          canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
          poster = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.82));
        } catch {}
      }
      resolve({ ratio: w && h ? w / h : 1.78, poster });
    };
    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1, (video.duration || 2) / 2);
    };
    video.onseeked = finish;
    video.onerror = () => resolve({ ratio: 1.78, poster: null });
  });

  const result = await withTimeout(frame, 12000, { ratio: 1.78, poster: null });
  URL.revokeObjectURL(url);
  return result;
}
