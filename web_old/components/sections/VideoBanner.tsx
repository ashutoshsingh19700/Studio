'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';

export default function VideoBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        style={{ position: 'relative', height: '380px', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        <Image
          src="/images/video-banner.jpg"
          alt="KPDS cinematic photography camera lens"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.72)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center' }}>
          {/* Play button */}
          <button
            aria-label="Play showreel"
            style={{
              width: '4.5rem', height: '4.5rem',
              borderRadius: '50%',
              border: '2px solid var(--color-gold)',
              background: 'rgba(240,201,160,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-gold)',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(240,201,160,0.25)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(240,201,160,0.1)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
          >
            <Play size={22} fill="currentColor" />
          </button>

          {/* Text */}
          <div style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 1.3 }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--color-text-secondary)' }}>NOT JUST PHOTOS</p>
            <p style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: 'var(--color-text-primary)' }}>BUT MEMORIES</p>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--color-text-secondary)' }}>THAT LAST</p>
          </div>
        </div>
      </section>

      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)} role="dialog" aria-modal aria-label="Showreel">
          <div
            style={{ position: 'relative', width: 'min(800px,90vw)', aspectRatio: '16/9', background: '#000', borderRadius: '0.75rem', overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)', flexDirection: 'column', gap: '1rem' }}>
              <Play size={48} style={{ color: 'var(--color-gold)' }} />
              <p style={{ fontSize: '0.85rem' }}>Add your YouTube/Vimeo embed here</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </>
  );
}
