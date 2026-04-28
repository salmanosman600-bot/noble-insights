import type { Metadata } from 'next';
import { Suspense } from 'react';
import QuranReader from '@/features/quran/components/quran-reader';

export const metadata: Metadata = {
  title: 'Read Quran',
  description:
    'Read the Noble Quran with Uzbek translation (At-Tafsir Al-Muyassar). Adjust font size, toggle Cyrillic/Latin script, and bookmark verses.',
};

// Suspense wrapper required because the reader calls `useSearchParams()`,
// which forces client-side reading of the URL during prerender.
export default function QuranPage() {
  return (
    <Suspense fallback={null}>
      <QuranReader />
    </Suspense>
  );
}
