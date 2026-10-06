import Image from 'next/image';
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0' }}>
      <Image
        src="/images/cta-camera.jpg"
        alt="Camera — Ready to capture your story with KPDS Photo Studio"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.78)' }} />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>LET&apos;S CREATE TOGETHER</p>
        <h2 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
          Ready to Capture<br />Your Story?
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
          Book a session today and let us transform your moments into timeless memories.
        </p>
        <Link href="/book" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.8rem 2rem' }}>
          Book a Session →
        </Link>
      </div>
    </section>
  );
}
