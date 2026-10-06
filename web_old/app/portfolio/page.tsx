'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioItems, portfolioCategories } from '@/lib/content/portfolio';

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const [visible, setVisible] = useState(12);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter(i => i.category === active);
  const shown = filtered.slice(0, visible);

  const openLb = (idx: number) => setLightbox(idx);
  const closeLb = () => setLightbox(null);
  const prevLb = useCallback(() => setLightbox(i => i !== null ? (i - 1 + shown.length) % shown.length : null), [shown.length]);
  const nextLb = useCallback(() => setLightbox(i => i !== null ? (i + 1) % shown.length : null), [shown.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') prevLb();
      if (e.key === 'ArrowRight') nextLb();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prevLb, nextLb]);

  return (
    <>
      {/* Page header */}
      <section className="section-dark" style={{ paddingTop: '9rem', paddingBottom: '3rem' }}>
        <div className="container-site">
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>OUR PORTFOLIO</p>
          <h1 className="heading-display" style={{ maxWidth: '500px' }}>
            Real People.<br />Real Stories.
          </h1>
        </div>
      </section>

      {/* Filter pills */}
      <section className="section-dark" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
        <div className="container-site">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                className={`filter-pill${active === cat ? ' active' : ''}`}
                onClick={() => { setActive(cat); setVisible(12); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-dark" style={{ paddingTop: '0', paddingBottom: '5rem' }}>
        <div className="container-site">
          <div style={{ columns: '3', columnGap: '1rem' }}>
            {shown.map((item, idx) => (
              <div
                key={item.id}
                style={{ breakInside: 'avoid', marginBottom: '1rem', borderRadius: '0.75rem', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                onClick={() => openLb(idx)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={idx % 3 === 0 ? 500 : idx % 3 === 1 ? 350 : 280}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s' }}
                  sizes="400px"
                />
              </div>
            ))}
          </div>

          {visible < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <button className="btn-outline-gold" onClick={() => setVisible(v => v + 12)}>
                Load More →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={closeLb} role="dialog" aria-modal aria-label="Portfolio lightbox">
          <button onClick={prevLb} aria-label="Previous" style={{ position: 'absolute', left: '1rem', color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} />
          </button>
          <div style={{ maxWidth: '85vw', maxHeight: '85vh', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <Image
              src={shown[lightbox].image}
              alt={shown[lightbox].title}
              width={900}
              height={700}
              style={{ objectFit: 'contain', maxHeight: '82vh', borderRadius: '0.75rem' }}
              sizes="85vw"
            />
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '0.75rem', fontSize: '0.85rem' }}>
              {shown[lightbox].title}
            </p>
          </div>
          <button onClick={nextLb} aria-label="Next" style={{ position: 'absolute', right: '1rem', color: 'white', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={22} />
          </button>
          <button onClick={closeLb} aria-label="Close" style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>
      )}
    </>
  );
}
