import type { Metadata, Viewport } from 'next';
import { Inter, Tinos } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RevealObserver from '@/components/layout/RevealObserver';
import { site } from '@/lib/site';

// Headings: a Times-style serif, matching the design mock-ups.
const serif = Tinos({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Photography · Films · Stories in Lucknow`,
    template: `%s | ${site.name}`,
  },
  description:
    'Professional photography and creative visual solutions for the moments that matter most. Weddings, portraits, products, events and films, based in Lucknow, India.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.name,
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0b0a08',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealObserver />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1b1813',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#f6f2ec',
              fontFamily: 'var(--font-sans)',
            },
          }}
        />
      </body>
    </html>
  );
}
