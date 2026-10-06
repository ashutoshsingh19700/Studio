import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Studio | KPDS Photo Studio Lucknow',
  description: 'Explore the KPDS photography studio in Lucknow — state-of-the-art equipment, professional lighting, and versatile backdrops.',
};

const features = [
  { title: 'Professional Lighting', desc: 'Studio strobes, continuous lights, softboxes and reflectors for every mood.' },
  { title: 'Versatile Backdrops', desc: 'Seamless paper rolls, muslin and textured backdrops in multiple colours.' },
  { title: 'Makeup & Styling Room', desc: 'Dedicated space for touch-ups and wardrobe changes.' },
  { title: 'Lounge & Waiting Area', desc: 'Comfortable space for clients and their families between shots.' },
];

export default function StudioPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <Image src="/images/studio-interior.jpg" alt="KPDS Photo Studio interior" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,11,9,0.9) 40%, rgba(13,11,9,0.3))' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,1) 0%, transparent 55%)' }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', paddingTop: '9rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>OUR STUDIO</p>
          <h1 className="heading-display" style={{ maxWidth: '500px', marginBottom: '1.25rem' }}>
            Where Light<br />Meets Art.
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '420px', lineHeight: 1.8 }}>
            A modern, fully-equipped studio designed to bring your ideas to life.
          </p>
          <Link href="/book?service=studio-rental" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Book Studio →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section-dark" style={{ padding: '5rem 0' }}>
        <div className="container-site">
          <p className="eyebrow" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>STUDIO FEATURES</p>
          <h2 className="heading-xl" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Everything You Need
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1.25rem' }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '1.75rem' }}>
                <div style={{ width: '2.5rem', height: '2px', background: 'var(--color-gold)', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio gallery strip */}
      <section className="section-darker" style={{ padding: '4rem 0' }}>
        <div className="container-site">
          <h2 className="heading-lg" style={{ marginBottom: '2rem', textAlign: 'center' }}>Studio Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ position: 'relative', height: '260px', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <Image src={`/images/studio-gallery-${i}.jpg`} alt={`KPDS studio space ${i}`} fill style={{ objectFit: 'cover' }} sizes="360px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-cream" style={{ padding: '5rem 0' }}>
        <div className="container-site" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ color: 'var(--color-gold-muted)', marginBottom: '0.75rem' }}>OUR TEAM</p>
          <h2 className="heading-xl" style={{ color: '#14110d', marginBottom: '0.75rem' }}>Meet the Creatives</h2>
          <p style={{ fontSize: '0.88rem', color: '#6b5040', marginBottom: '3rem' }}>The talented people behind every frame</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Karan Pandey', role: 'Lead Photographer', img: '/images/team-1.jpg' },
              { name: 'Pooja Dixit', role: 'Portrait & Fashion', img: '/images/team-2.jpg' },
              { name: 'Deepak Singh', role: 'Cinematographer', img: '/images/team-3.jpg' },
            ].map(m => (
              <div key={m.name}>
                <div style={{ position: 'relative', height: '280px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem' }}>
                  <Image src={m.img} alt={m.name} fill style={{ objectFit: 'cover' }} sizes="260px" />
                </div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 600, color: '#14110d' }}>{m.name}</p>
                <p style={{ fontSize: '0.78rem', color: '#c4956a' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
