import type { Metadata } from 'next';
import Translations from '@/pages/Translations';

export const metadata: Metadata = {
  title: 'Quran Translations',
  description:
    'Explore Quran translations across English, Urdu, French, Turkish, Spanish, and Indonesian by renowned scholars.',
};

export default function TranslationsPage() {
  return <Translations />;
}
