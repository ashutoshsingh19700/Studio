import Image from 'next/image';
import Link from 'next/link';
import { testimonials } from '@/lib/content/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="section-darker" style={{ padding: '5rem 0' }}>
      <div className="container-site">
        <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          CLIENT LOVE
        </p>
        <h2 className="heading-xl" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          What Our Clients Say.
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          Our studio is measured in moments and stories they inspire.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Stars */}
              <div className="stars" style={{ fontSize: '0.9rem' }}>
                {'★'.repeat(t.rating)}
              </div>
              {/* Quote */}
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, flex: 1 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'var(--color-bg-dark)', position: 'relative' }}>
                  <Image src={t.avatar} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="40px" />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-gold)' }}>{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/contact" className="btn-outline-gold">
            Share Your Experience →
          </Link>
        </div>
      </div>
    </section>
  );
}
