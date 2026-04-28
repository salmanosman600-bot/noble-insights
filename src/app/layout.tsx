import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Noto_Naskh_Arabic, Amiri } from 'next/font/google';
import Providers from '@/shared/components/providers';
import '@/index.css';

// ── Fonts loaded via next/font (zero render-blocking) ──────────────────────
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

// ── Default metadata (pages override per-route) ────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Noor — Noble Quran',
    template: '%s | Noor',
  },
  description:
    'A refined digital experience for the Noble Quran. Access translations, tafsir, recitations, and beneficial Islamic knowledge.',
  keywords: ['Quran', 'Noble Quran', 'Islam', 'Tafsir', 'Translations', 'Recitations', 'Surahs'],
  authors: [{ name: 'Noor' }],
  creator: 'Noor',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noor.app',
    siteName: 'Noor — Noble Quran',
    title: 'Noor — Noble Quran',
    description:
      'A refined digital experience for the Noble Quran. Access translations, tafsir, recitations, and beneficial Islamic knowledge.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Noor — Noble Quran' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor — Noble Quran',
    description:
      'A refined digital experience for the Noble Quran.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5ede0' },
    { media: '(prefers-color-scheme: dark)', color: '#13100c' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${notoNaskhArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
