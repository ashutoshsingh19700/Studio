import type { SlotId } from '../slots';

export const portfolioFilters = ['All', 'Weddings', 'Portraits', 'Products', 'Events', 'Fashion'] as const;
export type PortfolioFilter = (typeof portfolioFilters)[number];

export type PortfolioItem = {
  slot: SlotId;
  category: Exclude<PortfolioFilter, 'All'>;
  alt: string;
  /** width / height of the tile, taken from the design so the 3 columns stagger the same way. */
  ratio: number;
  /** CSS object-position, so faces stay in frame when a tall photo is cropped into the tile. */
  pos?: string;
};

/**
 * Order is row by row (left → right). The first 12 match the design; the rest appear
 * when "Load More" is pressed. Change `slot` to point a tile at a different photo file.
 */
export const portfolioItems: PortfolioItem[] = [
  { slot: 'portfolio-01', category: 'Weddings', alt: 'Bride and groom under a floral mandap with a chandelier', ratio: 1.17, pos: '50% 62%' },
  { slot: 'portfolio-02', category: 'Portraits', alt: 'Bride looking down, adjusting her veil', ratio: 1.16, pos: '50% 30%' },
  { slot: 'portfolio-03', category: 'Products', alt: 'Bridal bangles and floral kaleere detail', ratio: 1.21, pos: '50% 42%' },
  { slot: 'portfolio-04', category: 'Weddings', alt: 'Bridal mehndi design on both hands', ratio: 1.14, pos: '50% 62%' },
  { slot: 'portfolio-05', category: 'Portraits', alt: 'Bride in pink laughing with her hand on her cheek', ratio: 1.14, pos: '50% 38%' },
  { slot: 'portfolio-06', category: 'Events', alt: 'Mehndi night portrait with festive lights', ratio: 1.04, pos: '50% 40%' },
  { slot: 'portfolio-07', category: 'Portraits', alt: 'Smiling bride in profile against a black background', ratio: 1.21, pos: '55% 30%' },
  { slot: 'portfolio-08', category: 'Events', alt: 'Guest showing off mehndi under fairy lights', ratio: 1.17, pos: '82% 50%' },
  { slot: 'portfolio-09', category: 'Weddings', alt: 'Couple embracing in front of a decorated mandap', ratio: 0.94, pos: '50% 45%' },
  { slot: 'portfolio-10', category: 'Fashion', alt: 'Groom in a white sherwani in a red-lit corridor', ratio: 1.12, pos: '50% 28%' },
  { slot: 'portfolio-11', category: 'Weddings', alt: 'Couple with heads together beneath a chandelier', ratio: 1.03, pos: '50% 62%' },
  { slot: 'portfolio-12', category: 'Fashion', alt: 'Bride in a maroon and red outfit with statement jewellery', ratio: 1.35, pos: '50% 22%' },
  { slot: 'portfolio-13', category: 'Portraits', alt: 'Bride in a veil against a teal backdrop', ratio: 1.1, pos: '50% 30%' },
  { slot: 'portfolio-14', category: 'Fashion', alt: 'Groom in a white sherwani, side portrait', ratio: 1.2, pos: '50% 22%' },
  { slot: 'portfolio-15', category: 'Products', alt: 'Ornate golden bell above a decorative statue', ratio: 1.0, pos: '50% 40%' },
  { slot: 'portfolio-16', category: 'Events', alt: 'Colourful festival statue lit at night', ratio: 1.15, pos: '40% 40%' },
  { slot: 'portfolio-17', category: 'Fashion', alt: 'Groom holding a sword in a corridor', ratio: 1.25, pos: '50% 30%' },
  { slot: 'portfolio-18', category: 'Weddings', alt: 'Groom and bride in pink, foreheads touching', ratio: 1.05, pos: '50% 38%' },
];

export const PORTFOLIO_PAGE_SIZE = 12;
