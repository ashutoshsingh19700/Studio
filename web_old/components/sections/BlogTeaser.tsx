'use client';

import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/content/blog';

export default function BlogTeaser() {
  return (
    <section className="section-dark" style={{ padding: '5rem 0' }}>
      <div className="container-site">
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>OUR BLOG</p>
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="heading-xl" style={{ maxWidth: '400px' }}>
            Tips, Stories<br />& Inspirations.
          </h2>
          <Link href="/blog" style={{ fontSize: '0.8rem', color: 'var(--color-gold)', textDecoration: 'none' }}>
            View More Articles →
          </Link>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '480px' }}>
          Explore photography tips, behind-the-scenes stories and the latest trends from our studio.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', textDecoration: 'none', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-border-cream)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} sizes="350px" />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  {post.date}
                </p>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
