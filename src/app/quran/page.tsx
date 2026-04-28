import type { Metadata } from 'next';
import QuranReader from '@/pages/QuranReader';

export const metadata: Metadata = {
  title: 'Read Quran',
  description:
    'Read the Noble Quran with Arabic text, transliteration, and English translation. Adjust font size, bookmark verses, and access tafsir inline.',
};

export default function QuranPage() {
  return <QuranReader />;
}
