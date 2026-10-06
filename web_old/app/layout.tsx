import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KPDS Photo Studio | Photography · Films · Stories — Lucknow',
    template: '%s | KPDS Photo Studio',
  },
  description:
    'Professional photography and creative visual solutions for the moments that matter most. Based in Lucknow, India.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kpdsstudio.com',
    siteName: 'KPDS Photo Studio',
    images: [{ url: '/images/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1612',
              border: '1px solid rgba(240,201,160,0.2)',
              color: '#f5f0ea',
            },
          }}
        />
      </body>
    </html>
  );
}
