import type { SlotId } from '../slots';

export type BlogPost = { slug: string; title: string; date: string; slot: SlotId };

export const blogPosts: BlogPost[] = [
  { slug: '5-tips-for-better-portrait-photography', title: '5 Tips for Better Portrait Photography', date: 'Oct 10, 2025', slot: 'blog-1' },
  { slug: 'how-to-choose-the-right-wedding-photographer', title: 'How to Choose the Right Wedding Photographer', date: 'Sep 25, 2025', slot: 'blog-2' },
  { slug: 'behind-the-scenes-at-kpds-studio', title: 'Behind the Scenes at KPDS Studio', date: 'Sep 12, 2025', slot: 'blog-3' },
];
