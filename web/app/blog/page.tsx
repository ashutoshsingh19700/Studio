import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { blogPosts } from '@/lib/content/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Photography tips, behind-the-scenes stories and the latest trends from the KPDS Photo Studio team.',
};

export default function BlogPage() {
  return (
    <>
      <section className="page-hero blog-hero" aria-labelledby="blog-title">
        <div className="bg-photo bg-photo--right">
          <Photo slot="blog-hero" alt="A bride reflected in a mirror in low light" eager sizes="100vw" />
        </div>
        <div className="page-hero__shade" />
        <div className="container">
          <p className="eyebrow">Our Blog</p>
          <h1 id="blog-title">
            Tips, Stories
            <br />
            &amp; Inspirations.
          </h1>
          <p className="page-hero__lead">
            Explore photography tips, behind the scenes stories and the latest trends from our studio.
          </p>
        </div>
      </section>

      <section className="posts" aria-label="Latest articles">
        <div className="posts__panel contain-lg">
          <div className="posts__grid">
            {blogPosts.map((post, i) => (
              <article
                key={post.slug}
                className="post"
                data-reveal
                style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}
              >
                <div className="post__img">
                  <Photo slot={post.slot} alt={post.title} sizes="(min-width:1024px) 33vw, 72vw" />
                </div>
                <h3>{post.title}</h3>
                <time dateTime={new Date(post.date).toISOString().slice(0, 10)}>{post.date}</time>
              </article>
            ))}
          </div>
          <div className="posts__more">
            <Link href="/blog" className="link-arrow">
              View More Articles <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
