import type { SlotId } from '../slots';

export type Testimonial = {
  name: string;
  service: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: SlotId;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Priya & Rohit',
    service: 'Wedding Photography',
    quote: 'Absolutely amazing experience! The photos captured our special day so beautifully. Highly recommended!',
    rating: 5,
    avatar: 'avatar-1',
  },
  {
    name: 'Sneha Kapoor',
    service: 'Portrait Session',
    quote: 'Professional, creative and so easy to work with. The portraits turned out better than we imagined.',
    rating: 5,
    avatar: 'avatar-2',
  },
  {
    name: 'Neha Mehta',
    service: 'Product Photography',
    quote: 'Great quality and attention to detail. Our product photos look stunning!',
    rating: 5,
    avatar: 'avatar-3',
  },
  {
    name: 'Rahul Sharma',
    service: 'Event Photography',
    quote: 'The team made our event memorable with beautiful candid shots. Loved the experience!',
    rating: 5,
    avatar: 'avatar-4',
  },
];
