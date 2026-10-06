import Image from 'next/image';

type PhotoViewProps = {
  /** URL from findImage(), or null while the photo has not been added. */
  src: string | null;
  alt: string;
  /** Slot id, shown on the empty placeholder in development only. */
  label?: string;
  sizes?: string;
  eager?: boolean;
  position?: string;
};

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Pure renderer (no fs access, safe in client components). Fills its nearest
 * positioned parent. See Photo.tsx for the server wrapper that resolves `src`.
 */
export default function PhotoView({ src, alt, label, sizes = '100vw', eager = false, position }: PhotoViewProps) {
  if (!src) {
    return (
      <div className="photo-empty" role="img" aria-label={alt}>
        {isDev && label ? <span className="photo-empty__label">{label}</span> : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      className="photo"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
