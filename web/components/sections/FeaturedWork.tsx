import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { homeCategories } from '@/lib/content/services';

export default function FeaturedWork() {
  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 id="featured-title" className="section-title">
              Stories Through Our Lens
            </h2>
          </div>
          <Link href="/portfolio" className="link-arrow featured__more">
            View All <ArrowRight />
          </Link>
        </div>

        <div className="featured__grid">
          {homeCategories.map((c, i) => (
            <Link
              key={c.label}
              href={c.href}
              className="feature-card"
              data-reveal
              style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}
            >
              <Photo slot={c.slot} alt={`${c.label} featured work`} sizes="(min-width:1024px) 30vw, 50vw" position={c.pos} />
              <span className="feature-card__label">{c.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
