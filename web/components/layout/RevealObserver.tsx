'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Fades elements in as they scroll into view. Any element with `data-reveal`
 * (and optional `style="--d: .1s"` for a delay) is picked up automatically.
 * Content stays fully visible without JavaScript or with reduced-motion on.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    // anything already on screen is shown immediately (no flash), the rest waits
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('is-in');
      else io.observe(el);
    });
    root.classList.add('reveal-ready');

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
