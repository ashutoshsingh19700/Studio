import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PhotoView from '@/components/ui/PhotoView';
import { StarIcon } from '@/components/ui/Icons';
import { findImage } from '@/lib/images';
import { testimonials } from '@/lib/content/testimonials';

const initials = (name: string) =>
  name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Hear from the couples, families and brands who trusted KPDS Photo Studio with their stories.',
};

export default function TestimonialsPage() {
  return (
    <section className="split" aria-labelledby="testi-title">
      <div className="container split__grid">
        <div data-reveal>
          <p className="eyebrow">Client Stories</p>
          <h1 id="testi-title">
            What Our
            <br />
            Clients Say.
          </h1>
          <p className="split__lead">
            Our clients&apos; trust motivates us. Here&apos;s what some of them have to say about their experience
            with KPDS.
          </p>
          <Link href="/contact" className="btn btn--peach">
            Share Your Experience <ArrowRight />
          </Link>
        </div>

        <div className="reviews">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="review"
              data-reveal
              style={{ '--d': `${(i % 2) * 0.1}s` } as React.CSSProperties}
            >
              <blockquote className="review__quote" style={{ margin: 0 }}>
                {t.quote}
              </blockquote>
              <figcaption className="review__who">
                <span className="review__avatar">
                  {findImage(t.avatar) ? (
                    <PhotoView src={findImage(t.avatar)} alt={`Portrait of ${t.name}`} sizes="64px" />
                  ) : (
                    <span className="review__initials" aria-hidden="true">
                      {initials(t.name)}
                    </span>
                  )}
                </span>
                <span>
                  <span className="review__name" style={{ display: 'block' }}>
                    {t.name}
                  </span>
                  <span className="review__role" style={{ display: 'block' }}>
                    {t.service}
                  </span>
                  <span className="stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }, (_, n) => (
                      <StarIcon key={n} />
                    ))}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
