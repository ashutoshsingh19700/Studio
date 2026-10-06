import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const cards = [
  { label: 'Weddings', image: '/images/service-wedding.jpg', href: '/services#wedding-photography' },
  { label: 'Portraits', image: '/images/service-portrait.jpg', href: '/services#portrait-photography' },
  { label: 'Product', image: '/images/service-product.jpg', href: '/services#product-photography' },
  { label: 'Events', image: '/images/service-events.jpg', href: '/services#family-events' },
];

export default function ServicesSection() {
  return (
    <section className="section-cream" style={{ padding: '4.5rem 0' }}>
      <div className="container-site">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow" style={{ color: 'var(--color-gold-muted)', marginBottom: '0.5rem' }}>
              WHAT WE DO
            </p>
            <h2 className="heading-xl" style={{ color: '#14110d', maxWidth: '320px', lineHeight: 1.15 }}>
              Our<br />Services
            </h2>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#5a4a3a', maxWidth: '340px', lineHeight: 1.7 }}>
              From personal portraits to large scale events, we offer a wide range of photography and filmmaking services tailored to your needs.
            </p>
          </div>
          <Link href="/services" className="btn-outline-gold" style={{ borderColor: '#c4956a', color: '#c4956a', flexShrink: 0 }}>
            View All Services →
          </Link>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1rem' }}>
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className="img-card" style={{ height: '260px' }}>
              <Image src={c.image} alt={`${c.label} photography by KPDS`} fill sizes="260px" style={{ objectFit: 'cover' }} />
              <div className="img-card-overlay" />
              <div className="img-card-label">
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.06em' }}>
                  {c.label}
                </span>
                <span className="arrow-btn" style={{ width: '1.8rem', height: '1.8rem', borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
