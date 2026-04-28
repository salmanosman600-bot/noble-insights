import type { Metadata } from 'next';
import SearchPage from '@/pages/SearchPage';

export const metadata: Metadata = {
  title: 'Search the Quran',
  description:
    'Search across Quranic verses, multiple translations, tafsir, and articles in one place.',
};

export default function SearchRoute() {
  return <SearchPage />;
}
