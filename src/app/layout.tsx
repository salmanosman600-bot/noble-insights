import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Amiri, Amiri_Quran } from 'next/font/google';
import Providers from '@/shared/components/providers';
import '@/index.css';

// ── Fonts loaded via next/font (zero render-blocking) ──────────────────────
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

// Amiri Quran — Uthmanic script, specifically designed for Quranic text
const amiriQuran = Amiri_Quran({
  subsets: ['arabic'],
  weight: ['400'],
  variable: '--font-quran',
  display: 'swap',
});

// ── Default metadata (pages override per-route) ────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://noor.app'),
  title: {
    default: "Noor — Qur'oni Karim",
    template: '%s | Noor',
  },
  description:
    "Qur'oni Karim uchun nozik raqamli tajriba. Tarjimalar, tafsir, qiroatlar va foydali islomiy bilimlarni oling.",
  keywords: ["Qur'on", "Qur'oni Karim", 'Islom', 'Tafsir', 'Tarjimalar', 'Qiroatlar', 'Suralar'],
  authors: [{ name: 'Noor' }],
  creator: 'Noor',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://noor.app',
    siteName: "Noor — Qur'oni Karim",
    title: "Noor — Qur'oni Karim",
    description:
      "Qur'oni Karim uchun nozik raqamli tajriba. Tarjimalar, tafsir, qiroatlar va foydali islomiy bilimlarni oling.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "Noor — Qur'oni Karim" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Noor — Qur'oni Karim",
    description:
      "Qur'oni Karim uchun nozik raqamli tajriba.",
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
      lang="uz"
      className={`${plusJakartaSans.variable} ${amiri.variable} ${amiriQuran.variable}`}
      suppressHydrationWarning
    >
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
