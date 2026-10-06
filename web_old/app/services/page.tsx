import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Film, BookImage, Wand2, Building2 } from 'lucide-react';
import { services, additionalServices } from '@/lib/content/services';

export const metadata: Metadata = {
  title: 'Our Services | Photography & Films',
  description: 'Wedding, portrait, product, fashion and commercial photography services in Lucknow. Studio rentals and cinematic films too.',
};

const iconMap: Record<string, React.ComponentType<{size?:number}>> = {
  Film, BookImage, Wand2, Building2,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <Image src="/images/services-hero.jpg" alt="Photography studio lights" fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,11,9,0.92) 50%, rgba(13,11,9,0.4))' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,1) 0%, transparent 60%)' }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', paddingTop: '9rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>OUR SERVICES</p>
          <h1 className="heading-display" style={{ maxWidth: '600px', marginBottom: '1.25rem' }}>
            Visual Stories for<br />Every Occasion.
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '480px', lineHeight: 1.8 }}>
            From personal portraits to large scale events, we offer a wide range of photography and filmmaking services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-dark" style={{ padding: '5rem 0' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.25rem' }}>
            {services.map((s) => (
              <Link key={s.slug} href={`/book?service=${s.slug}`} className="img-card" style={{ height: '300px' }}>
                <Image src={s.image} alt={`${s.title} — KPDS Photo Studio`} fill sizes="400px" style={{ objectFit: 'cover' }} />
                <div className="img-card-overlay" />
                <div className="img-card-label" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>
                        {s.title}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.2rem', lineHeight: 1.5 }}>
                        {s.description}
                      </p>
                    </div>
                    <span className="arrow-btn" style={{ marginLeft: '0.75rem', flexShrink: 0 }}>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="section-darker" style={{ padding: '4rem 0' }}>
        <div className="container-site">
          <h2 className="heading-lg" style={{ marginBottom: '2.5rem' }}>Additional Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
            {additionalServices.map((a) => {
              const Icon = iconMap[a.icon];
              return (
                <div key={a.title} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)', flexShrink: 0 }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.3rem', fontSize: '0.9rem' }}>{a.title}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{a.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
