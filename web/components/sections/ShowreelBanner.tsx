import { Play } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import ShowreelTrigger from '@/components/ui/ShowreelTrigger';
import { site } from '@/lib/site';
import { findShowreel } from '@/lib/videos';

export default function ShowreelBanner() {
  return (
    <section className="showreel" aria-label="Showreel">
      <div className="bg-photo bg-photo--left">
        <Photo slot="home-showreel" alt="Rumi Darwaza in Lucknow glowing against the night sky" sizes="100vw" />
      </div>
      <div className="showreel__shade" />
      <div className="container showreel__inner">
        <div>
          <ShowreelTrigger
            videoSrc={findShowreel()}
            embedUrl={site.showreelEmbedUrl}
            className="showreel__play"
            ariaLabel="Play showreel"
          >
            <Play />
          </ShowreelTrigger>
        </div>
        <p className="showreel__text">
          Not just photos
          <br />
          but memories
          <br />
          that last
        </p>
      </div>
    </section>
  );
}
