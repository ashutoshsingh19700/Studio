import type { Metadata } from 'next';
import Photo from '@/components/ui/Photo';
import PortfolioGallery from '@/components/sections/PortfolioGallery';
import { getPublicGallery } from '@/lib/gallery/store';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Real people, real stories. Browse weddings, portraits, products, events and fashion photography by Amit Photography.',
};

// Content is managed from /admin; saving there refreshes this page.
export default async function PortfolioPage() {
  const { categories, items } = await getPublicGallery();

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
          <PortfolioGallery categories={categories} items={items} />
        </div>
      </section>
    </>
  );
}
