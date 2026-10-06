import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const works = [
  { label: 'Weddings', image: '/images/portfolio-w1.jpg', href: '/portfolio?cat=Weddings' },
  { label: 'Portraits', image: '/images/portfolio-p1.jpg', href: '/portfolio?cat=Portraits' },
  { label: 'Product', image: '/images/portfolio-pr1.jpg', href: '/portfolio?cat=Products' },
  { label: 'Events', image: '/images/portfolio-e1.jpg', href: '/portfolio?cat=Events' },
];

export default function FeaturedWork() {
  return (
    <section className="section-dark" style={{ padding: '5rem 0' }}>
      <div className="container-site">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="eyebrow">FEATURED WORK</p>
          <Link href="/portfolio" style={{ fontSize: '0.78rem', color: 'var(--color-gold)', textDecoration: 'none' }}>
            View All →
          </Link>
        </div>
        <h2 className="heading-xl" style={{ marginBottom: '2.5rem' }}>
          Stories Through Our Lens
        </h2>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))', gap: '1rem' }}>
          {works.map((w) => (
            <Link key={w.label} href={w.href} className="img-card" style={{ height: '360px' }}>
              <Image src={w.image} alt={`${w.label} portfolio — KPDS`} fill sizes="300px" style={{ objectFit: 'cover' }} />
              <div className="img-card-overlay" style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.9) 0%, transparent 60%)' }} />
              <div className="img-card-label">
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {w.label}
                </span>
                <span className="arrow-btn">
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
