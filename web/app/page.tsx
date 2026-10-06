import Hero from '@/components/sections/Hero';
import ServicesBand from '@/components/sections/ServicesBand';
import FeaturedWork from '@/components/sections/FeaturedWork';
import ShowreelBanner from '@/components/sections/ShowreelBanner';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CtaBanner from '@/components/sections/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBand />
      <FeaturedWork />
      <ShowreelBanner />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
