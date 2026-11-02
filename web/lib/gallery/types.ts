export type MediaType = 'image' | 'video';

export type Category = {
  id: string;
  name: string;
};

export type MediaItem = {
  id: string;
  type: MediaType;
  categoryId: string;
  /** Public URL: `/images/…` for the original site photos, `/media/…` for uploads. */
  src: string;
  /** Still frame shown for videos before they play. */
  poster: string | null;
  alt: string;
  /** width / height of the tile in the portfolio grid. */
  ratio: number;
  /** CSS object-position so faces stay in frame when a tall photo is cropped into the tile. */
  pos?: string;
  createdAt: string;
};

export type Gallery = {
  categories: Category[];
  items: MediaItem[];
};

export const LIMITS = {
  maxCategories: 24,
  categoryName: 32,
  alt: 160,
  imageBytes: 20 * 1024 * 1024,
  videoBytes: 120 * 1024 * 1024,
  posterBytes: 5 * 1024 * 1024,
  minRatio: 0.6,
  maxRatio: 1.8,
} as const;

export const ACCEPT_IMAGE = 'image/jpeg,image/png,image/webp,image/avif';
export const ACCEPT_VIDEO = 'video/mp4,video/webm,video/quicktime';

export const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${Math.round(n / 1024 / 1024)} MB` : `${Math.round(n / 1024)} KB`;
