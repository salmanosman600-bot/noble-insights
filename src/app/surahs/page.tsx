import type { Metadata } from 'next';
import SurahIndex from '@/features/quran/components/surah-index';

export const metadata: Metadata = {
  title: 'Surah Index — All 114 Chapters',
  description:
    'Browse all 114 chapters of the Noble Quran. Filter by Makki/Madani origin, search by name, and sort by Mushaf or revelation order.',
};

export default function SurahsPage() {
  return <SurahIndex />;
}
