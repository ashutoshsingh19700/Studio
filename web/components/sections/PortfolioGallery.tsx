'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import PhotoView from '@/components/ui/PhotoView';
import { PORTFOLIO_PAGE_SIZE } from '@/lib/content/portfolio';
import type { Category, MediaItem } from '@/lib/gallery/types';

const LANES = 3;

type GalleryItem = MediaItem;

/** Plays/shows one item; videos get their own element so they stop when the viewer moves on. */
function Thumb({ item }: { item: GalleryItem }) {
  if (item.type === 'video' && !item.poster) {
    return <video className="photo" src={`${item.src}#t=0.1`} preload="metadata" muted playsInline aria-label={item.alt} />;
  }
  return (
    <PhotoView
      src={item.type === 'video' ? item.poster : item.src}
      alt={item.alt}
      position={item.pos}
      sizes="(min-width:1024px) 33vw, 33vw"
    />
  );
}

export default function PortfolioGallery({ categories, items }: { categories: Category[]; items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [count, setCount] = useState(PORTFOLIO_PAGE_SIZE);
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' || !categories.some((c) => c.id === filter) ? items : items.filter((i) => i.categoryId === filter)),
    [items, categories, filter],
  );
  const shown = filtered.slice(0, count);

  // row-by-row order → three independent columns (so tiles can have different heights)
  const lanes = useMemo(() => {
    const out: { item: GalleryItem; index: number }[][] = Array.from({ length: LANES }, () => []);
    shown.forEach((item, index) => out[index % LANES].push({ item, index }));
    return out;
  }, [shown]);

  const choose = (f: string) => {
    setFilter(f);
    setCount(PORTFOLIO_PAGE_SIZE);
    setOpen(null);
  };

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length],
  );

  // keyboard + scroll lock for the lightbox
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  // swipe left / right
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter portfolio by category">
        <button type="button" className="chip" aria-pressed={filter === 'all'} onClick={() => choose('all')}>
          All
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => choose(c.id)}>
            {c.name}
          </button>
        ))}
      </div>

      <section className="gallery" aria-label="Portfolio">
        {shown.length === 0 ? (
          <p className="gallery__empty">Nothing here yet. Check back soon.</p>
        ) : (
          <div className="lanes">
            {lanes.map((lane, l) => (
              <div className="lane" key={l}>
                {lane.map(({ item, index }) => (
                  <button
                    key={item.id}
                    type="button"
                    className="tile"
                    style={
                      {
                        '--ratio': item.ratio,
                        '--d': `${(index % PORTFOLIO_PAGE_SIZE) * 0.04}s`,
                      } as React.CSSProperties
                    }
                    onClick={() => setOpen(index)}
                    aria-label={`${item.type === 'video' ? 'Play video' : 'View photo'}: ${item.alt}`}
                  >
                    <Thumb item={item} />
                    {item.type === 'video' && (
                      <span className="tile__play" aria-hidden="true">
                        <Play />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {filtered.length > count && (
          <div className="gallery__more">
            <button
              type="button"
              className="btn btn--peach btn--lg"
              onClick={() => setCount((c) => c + PORTFOLIO_PAGE_SIZE)}
            >
              Load More <ArrowRight />
            </button>
          </div>
        )}
      </section>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
            {current.type === 'video' ? (
              <video
                key={current.id}
                className="lightbox__video"
                src={current.src}
                poster={current.poster ?? undefined}
                controls
                autoPlay
                playsInline
                aria-label={current.alt}
              />
            ) : (
              <PhotoView src={current.src} alt={current.alt} sizes="100vw" eager position="50% 50%" />
            )}
          </div>
          <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close">
            <X />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            <ChevronRight />
          </button>
          <p className="lightbox__count" aria-live="polite">
            {open! + 1} / {shown.length}
          </p>
        </div>
      )}
    </>
  );
}
