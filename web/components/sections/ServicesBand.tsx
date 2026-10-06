import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { homeCategories } from '@/lib/content/services';

export default function ServicesBand() {
  return (
    <section className="services" aria-labelledby="services-title">
      <div className="services__card contain-lg">
        <div className="services__intro" data-reveal>
          <p className="eyebrow eyebrow--ink services__eyebrow">What We Do</p>
          <div className="services__head">
            <h2 id="services-title" className="services__title serif">
              Our <br className="br-lg" />
              Services
            </h2>
            <Link href="/services" className="link-arrow services__more">
              View All <ArrowRight />
            </Link>
          </div>
          <p className="services__copy">
            From intimate portraits to grand celebrations, we capture your story with creativity, precision and passion.
          </p>
          <Link href="/services" className="btn btn--outline services__btn">
            View All Services <ArrowRight />
          </Link>
        </div>

        <div className="services__grid">
          {homeCategories.map((c, i) => (
            <Link key={c.label} href={c.href} className="svc-card" data-reveal style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
              <div className="svc-card__img">
                <Photo slot={c.slot} alt={`${c.label} photography by KPDS`} sizes="(min-width:1024px) 14vw, 22vw" position={c.pos} />
              </div>
              <div className="svc-card__label">
                <span>{c.label}</span>
                <span className="arrow-circle" aria-hidden="true">
                  <ArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
