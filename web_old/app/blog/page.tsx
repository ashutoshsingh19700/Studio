import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/content/blog';

export const metadata: Metadata = {
  title: 'Blog | Photography Tips, Stories & Inspiration',
  description: 'Explore photography tips, behind-the-scenes stories and creative inspiration from KPDS Photo Studio.',
};

export default function BlogPage() {
  return (
    <>
      <section className="section-dark" style={{ paddingTop: '8rem', paddingBottom: '2rem' }}>
        <div className="container-site">
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>OUR BLOG</p>
          <h1 className="heading-display" style={{ maxWidth: '520px' }}>
            Tips, Stories<br />&amp; Inspirations.
          </h1>
          <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', maxWidth: '400px', lineHeight: 1.7 }}>
            Explore photography tips, behind-the-scenes stories and the latest trends from our studio.
          </p>
        </div>
      </section>

      <section className="section-dark" style={{ padding: '3rem 0 5rem' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
            {blogPosts.map((post) => (
              <article key={post.id} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '1rem', overflow: 'hidden' }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} sizes="400px" />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>{post.date}</p>
                    <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                      {post.excerpt}
                    </p>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      Read More →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
