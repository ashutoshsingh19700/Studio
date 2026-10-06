import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export const metadata: Metadata = {
  title: 'About Us | Our Story & Team',
  description: 'Learn about KPDS Photo Studio — our story, our team, and our passion for photography in Lucknow, India.',
};

const stats = [
  { value: '8+', label: 'Years of Experience' },
  { value: '5K+', label: 'Happy Clients' },
  { value: '500+', label: 'Events Covered' },
  { value: '100%', label: 'Passion' },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <Image src="/images/about-hero.jpg" alt="KPDS photographer at work" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,11,9,0.9) 50%, rgba(13,11,9,0.3))' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,1) 0%, transparent 50%)' }} />

        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', paddingTop: '9rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>OUR STORY</p>
          <h1 className="heading-display" style={{ maxWidth: '520px', marginBottom: '1.5rem' }}>
            More Than<br />Just a Studio.
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '480px', lineHeight: 1.8 }}>
            At KPDS, we believe photography is about people, emotions and stories. With a creative approach and professional expertise, we transform your moments into timeless memories.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginTop: '3rem' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginTop: '0.3rem' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The People Behind KPDS ── */}
      <section className="section-cream" style={{ padding: '5rem 0' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--color-gold-muted)', marginBottom: '0.75rem' }}>OUR TEAM</p>
              <h2 className="heading-xl" style={{ color: '#14110d', marginBottom: '1.25rem' }}>
                The People<br />Behind KPDS
              </h2>
              <p style={{ color: '#5a4a3a', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                A team of photographers, filmmakers and creatives dedicated to capturing stories that inspire. Each member brings unique skills and a shared passion for visual storytelling.
              </p>
              <Link href="/studio" className="btn-outline-gold" style={{ borderColor: '#c4956a', color: '#c4956a' }}>
                Meet Our Team →
              </Link>
            </div>
            <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden' }}>
              <Image src="/images/team-group.jpg" alt="KPDS photography team" fill style={{ objectFit: 'cover' }} sizes="600px" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Studio ── */}
      <section className="section-dark" style={{ padding: '5rem 0' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden' }}>
              <Image src="/images/studio-interior.jpg" alt="KPDS studio interior" fill style={{ objectFit: 'cover' }} sizes="600px" />
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>OUR STUDIO</p>
              <h2 className="heading-xl" style={{ marginBottom: '1.25rem' }}>Our Studio</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                A modern, fully-equipped studio designed to bring your ideas to life. From professional lighting rigs to versatile backdrops, our studio has everything you need for a perfect shoot.
              </p>
              <Link href="/studio" style={{ fontSize: '0.85rem', color: 'var(--color-gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Explore Studio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="section-darker" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container-site">
          <div className="divider" />
          <blockquote style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 600, fontStyle: 'italic', color: 'var(--color-text-primary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.3 }}>
            &ldquo;We don&apos;t just take photos,<br />we tell your story.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection />
    </>
  );
}
