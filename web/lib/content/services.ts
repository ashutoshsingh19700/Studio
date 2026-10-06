import type { SlotId } from '../slots';

/** `pos` is a CSS object-position that keeps faces in frame when a tall photo is cropped. */
export type Service = { slug: string; title: string; short: string; slot: SlotId; pos?: string };

/** Home → "Our Services" thumbnails and "Stories Through Our Lens" cards. */
export const homeCategories: { label: string; slot: SlotId; href: string; pos?: string }[] = [
  { label: 'Weddings', slot: 'cat-weddings', href: '/portfolio', pos: '50% 68%' },
  { label: 'Portraits', slot: 'cat-portraits', href: '/portfolio', pos: '50% 28%' },
  { label: 'Product', slot: 'cat-product', href: '/portfolio', pos: '50% 45%' },
  { label: 'Events', slot: 'cat-events', href: '/portfolio', pos: '50% 38%' },
];

/** Services page → the 6 big cards. `title` keeps the two-line break from the design. */
export const services: Service[] = [
  { slug: 'wedding', title: 'Wedding Photography', short: 'Wedding', slot: 'cat-weddings', pos: '50% 66%' },
  { slug: 'portrait', title: 'Portrait Photography', short: 'Portrait', slot: 'cat-portraits', pos: '50% 28%' },
  { slug: 'product', title: 'Product Photography', short: 'Product', slot: 'cat-product', pos: '50% 45%' },
  { slug: 'family-events', title: 'Family & Events', short: 'Family & Events', slot: 'cat-family', pos: '50% 40%' },
  { slug: 'fashion', title: 'Fashion Photography', short: 'Fashion', slot: 'cat-fashion', pos: '50% 24%' },
  { slug: 'commercial', title: 'Commercial Shoots', short: 'Commercial', slot: 'cat-commercial', pos: '50% 55%' },
];

export type AdditionalService = {
  icon: 'film' | 'album' | 'retouch' | 'rental';
  title: string;
  text: string;
};

export const additionalServices: AdditionalService[] = [
  { icon: 'film', title: 'Cinematic Films', text: 'Wedding films, event highlights and brand films.' },
  { icon: 'album', title: 'Photo Albums', text: 'Premium custom albums.' },
  { icon: 'retouch', title: 'Editing & Retouching', text: 'Professional post-production for perfect results.' },
  { icon: 'rental', title: 'Studio Rentals', text: 'Book our studio for your creative projects.' },
];

export const whyChooseUs = [
  { icon: 'gem', title: 'Creative Vision', text: 'Unique and artistic storytelling.' },
  { icon: 'camera', title: 'Professional Equipment', text: 'Latest cameras and lighting setups.' },
  { icon: 'user', title: 'Experienced Team', text: 'Years of expertise in every frame.' },
  { icon: 'heart', title: 'Personalised Approach', text: 'Tailored to your style and requirements.' },
] as const;
