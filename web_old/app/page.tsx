import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedWork from '@/components/sections/FeaturedWork';
import VideoBanner from '@/components/sections/VideoBanner';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogTeaser from '@/components/sections/BlogTeaser';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'KPDS Photo Studio | Moments, Made Timeless — Lucknow',
  description:
    'Professional photography, cinematic films and creative visual storytelling in Lucknow, India. Weddings, portraits, products and more.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedWork />
      <VideoBanner />
      <WhyChooseUs />
      <TestimonialsSection />
      <BlogTeaser />
      <CtaBanner />
    </>
  );
}
