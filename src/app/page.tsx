import type { Metadata } from 'next';
import Index from '@/pages/Index';

export const metadata: Metadata = {
  title: 'Noor — Noble Quran',
  description:
    'A refined digital experience for the Noble Quran. Access translations, tafsir, recitations, and beneficial Islamic knowledge — all in one calm, beautiful platform.',
};

export default function HomePage() {
  return <Index />;
}
