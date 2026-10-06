import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import Stats from '@/components/ui/Stats';

export const metadata: Metadata = {
  title: 'About',
  description:
    'KPDS Photo Studio is a team of photographers, filmmakers and creatives in Lucknow turning moments into timeless memories.',
};

const stats = [
  { num: '8+', label: 'Years' },
  { num: '5K+', label: 'Clients' },
  { num: '500+', label: 'Events' },
  { num: '100%', label: 'Passion' },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero" aria-labelledby="about-title">
        <div className="bg-photo bg-photo--right">
          <Photo slot="about-hero" alt="A bride in profile, lit by a beam of teal light" eager sizes="100vw" />
        </div>
        <div className="page-hero__shade" />
        <div className="container">
          <p className="eyebrow">Our Story</p>
          <h1 id="about-title">
            More Than
            <br />
            Just a Studio.
          </h1>
          <p className="page-hero__lead">
            At KPDS, we believe photography is about people, emotions and stories. With a creative approach and
            professional expertise, we transform your moments into timeless memories.
          </p>
          <Stats items={stats} four />
        </div>
      </section>

      <section className="people" aria-labelledby="people-title">
        <div className="people__card contain-lg">
          <div data-reveal>
            <h2 id="people-title" className="serif">
              The People
              <br />
              Behind KPDS
            </h2>
            <p>A team of photographers, filmmakers and creatives dedicated to capturing stories that inspire.</p>
            <Link href="/studio" className="btn btn--black">
              Meet Our Team <ArrowRight />
            </Link>
          </div>
          <div className="people__img" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
            <Photo slot="about-team" alt="The KPDS team in the studio" sizes="(min-width:1024px) 50vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="studio-band" aria-labelledby="studio-title">
        <div className="bg-photo">
          <Photo slot="studio-main" alt="The KPDS studio interior with warm lighting" sizes="100vw" />
        </div>
        <div className="studio-band__shade" />
        <div className="container" data-reveal>
          <p className="eyebrow">Our Space</p>
          <h2 id="studio-title">Our Studio</h2>
          <p>A modern, fully-equipped studio designed to bring your ideas to life.</p>
          <Link href="/studio" className="link-arrow">
            Explore Studio <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="quote" aria-label="Our promise">
        <div className="bg-photo">
          <Photo slot="about-quote" alt="" sizes="100vw" />
        </div>
        <div className="quote__shade" />
        <div className="container" data-reveal>
          <blockquote>
            <span className="accent">“We</span> don’t just take photos,
            <br />
            we tell your story.”
          </blockquote>
        </div>
      </section>
    </>
  );
}
