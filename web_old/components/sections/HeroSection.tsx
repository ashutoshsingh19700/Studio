'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Events Covered' },
];

export default function HeroSection() {
  const [animated, setAnimated] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCountUp(5000, 2000, animated);
  const c2 = useCountUp(8, 1500, animated);
  const c3 = useCountUp(500, 2000, animated);
  const counts = [c1, c2, c3];

  return (
    <>
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-wedding.jpg"
            alt="Indian couple at golden hour wedding — KPDS Photo Studio hero"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,11,9,0.88) 40%, rgba(13,11,9,0.2) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,1) 0%, transparent 50%)' }} />
        </div>

        {/* Content */}
        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', paddingTop: '8rem' }}>
          <div style={{ maxWidth: '560px' }}>
            <p className="eyebrow fade-up" style={{ marginBottom: '1rem' }}>
              Photography / Films / Stories
            </p>
            <h1 className="heading-display fade-up fade-up-delay-1" style={{ marginBottom: '1.25rem' }}>
              Moments,<br />Made Timeless.
            </h1>
            <p className="fade-up fade-up-delay-2" style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '420px' }}>
              Professional photography and creative visual solutions for the moments that matter most.
            </p>
            <div className="flex flex-wrap gap-3 fade-up fade-up-delay-3">
              <Link href="/portfolio" className="btn-primary">
                Explore Our Work →
              </Link>
              <button
                className="btn-ghost"
                onClick={() => setVideoOpen(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'var(--color-gold)', color: '#14110d' }}>
                  <Play size={10} fill="currentColor" />
                </span>
                Watch Showreel
              </button>
            </div>
          </div>

          {/* Stats */}
          <div ref={ref} className="flex flex-wrap gap-8 mt-12 fade-up fade-up-delay-4">
            {stats.map((s, i) => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  {i === 0 ? (counts[0] >= 1000 ? `${Math.round(counts[0]/1000)}K` : counts[0]) : counts[i]}{s.suffix}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      {videoOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video"
        >
          <div style={{ position: 'relative', width: 'min(800px,90vw)', aspectRatio: '16/9', background: '#000', borderRadius: '0.75rem', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)', flexDirection: 'column', gap: '1rem' }}>
              <Play size={48} style={{ color: 'var(--color-gold)' }} />
              <p style={{ fontSize: '0.85rem' }}>Your showreel video will appear here</p>
            </div>
            <button
              onClick={() => setVideoOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
