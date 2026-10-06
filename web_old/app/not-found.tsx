import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="section-dark"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}
    >
      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '7rem', fontWeight: 700, color: 'var(--color-border)', lineHeight: 1 }}>
        404
      </p>
      <p className="eyebrow" style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>PAGE NOT FOUND</p>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
        This Frame Is Empty.
      </h1>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '360px', lineHeight: 1.7 }}>
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home →
      </Link>
    </section>
  );
}
