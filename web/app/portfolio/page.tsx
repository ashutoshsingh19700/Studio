import type { Metadata } from 'next';
import Photo from '@/components/ui/Photo';
import PortfolioGallery from '@/components/sections/PortfolioGallery';
import { findImage } from '@/lib/images';
import { portfolioItems } from '@/lib/content/portfolio';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Real people, real stories. Browse weddings, portraits, products, events and fashion photography by KPDS Photo Studio.',
};

export default function PortfolioPage() {
  // resolve photo URLs on the server, then hand plain data to the client gallery
  const items = portfolioItems.map((item) => ({ ...item, src: findImage(item.slot) }));

  return (
    <>
      <section className="page-hero portfolio-hero" aria-labelledby="portfolio-title" style={{ paddingBottom: 0 }}>
        <div className="bg-photo bg-photo--right">
          <Photo slot="portfolio-hero" alt="" eager sizes="100vw" />
        </div>
        <div className="page-hero__shade" />
        <div className="container">
          <p className="eyebrow">Our Portfolio</p>
          <h1 id="portfolio-title">
            Real People.
            <br />
            Real Stories.
          </h1>
          <PortfolioGallery items={items} />
        </div>
      </section>
    </>
  );
}
