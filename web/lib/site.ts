/** Edit contact details, links and nav here; they update everywhere on the site. */
export const site = {
  name: 'Amit Photography',
  tagline: 'Photography / Films / Stories',
  url: 'https://kpdsstudio.com',
  phone: '+91 72330 54656',
  phoneHours: 'Mon - Sat, 10 AM - 7 PM',
  email: 'hello@kpdsstudio.com',
  emailNote: 'We reply within 24 hours',
  city: 'Lucknow, India',
  addressLines: ['Amit Photography', 'Keshav Nagar, Fajullaganj, Sitapur Road', 'Lucknow, UP'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Amit+Photography+Keshav+Nagar+Fajullaganj+Sitapur+Road+Lucknow',
  /** Digits only, with country code. Used for wa.me links. */
  whatsapp: '917233054656',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
  /** Paste a YouTube/Vimeo *embed* URL here to make the "Watch Showreel" buttons play it. */
  showreelEmbedUrl: '',
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Studio', href: '/studio' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export const bookHref = '/contact';
