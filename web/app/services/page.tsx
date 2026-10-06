import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clapperboard, Aperture, WandSparkles } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import { additionalServices, services } from '@/lib/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Wedding, portrait, product, family, fashion and commercial photography, plus films, albums and retouching, from KPDS Photo Studio in Lucknow.',
};

const addlIcons = {
  film: Clapperboard,
  album: BookOpen,
  retouch: WandSparkles,
  rental: Aperture,
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero services-hero" aria-labelledby="services-title">
        <div className="bg-photo bg-photo--right">
          <Photo slot="services-hero" alt="A bride standing in a beam of teal and red light" eager sizes="100vw" />
        </div>
        <div className="page-hero__shade" />
        <div className="container">
          <p className="eyebrow">Our Services</p>
          <h1 id="services-title">
            Visual Stories
            <br />
            for Every Occasion.
          </h1>
          <p className="page-hero__lead">
            From personal portraits to large scale events, we offer a wide range of photography and filmmaking
            services tailored to your needs.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="service-grid">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/contact?service=${s.slug}`}
                className="service-card"
                data-reveal
                style={{ '--d': `${(i % 3) * 0.08}s` } as React.CSSProperties}
              >
                <Photo slot={s.slot} alt={`${s.title} by KPDS`} sizes="(min-width:1024px) 33vw, 50vw" position={s.pos} />
                <span className="service-card__foot">
                  <span className="service-card__title">{s.title}</span>
                  <span className="arrow-circle" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="addl" data-reveal>
            <h2>Additional Services</h2>
            <span className="addl__dash" aria-hidden="true" />
            <div className="addl__grid">
              {additionalServices.map((a) => {
                const Icon = addlIcons[a.icon];
                return (
                  <div key={a.title} className="addl-card">
                    <span className="addl-card__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{a.title}</h3>
                      <p>{a.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
