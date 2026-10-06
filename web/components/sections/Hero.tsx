import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import ShowreelTrigger from '@/components/ui/ShowreelTrigger';
import Stats from '@/components/ui/Stats';
import { site } from '@/lib/site';
import { findShowreel } from '@/lib/videos';

const stats = [
  { num: '5K+', label: 'Happy Clients' },
  { num: '8+', label: 'Years of Experience' },
  { num: '500+', label: 'Events Covered' },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="bg-photo bg-photo--right">
        <Photo slot="home-hero" alt="A bride and groom embracing among warm festive lights" eager sizes="100vw" />
      </div>
      <div className="hero__shade" />

      <div className="container">
        <p className="eyebrow hero__eyebrow">Photography / Films / Stories</p>
        <h1 id="hero-title" className="hero__title">
          Moments,
          <br />
          Made <span className="accent">Timeless.</span>
        </h1>
        <p className="hero__text">
          Professional photography and creative visual solutions for the moments that matter most.
        </p>

        <div className="hero__actions">
          <Link href="/portfolio" className="btn btn--peach">
            Explore Our Work <ArrowRight />
          </Link>
          <ShowreelTrigger videoSrc={findShowreel()} embedUrl={site.showreelEmbedUrl} className="play">
            <span className="play__disc">
              <Play />
            </span>
            Watch Showreel
          </ShowreelTrigger>
        </div>

        <Stats items={stats} />
      </div>
    </section>
  );
}
