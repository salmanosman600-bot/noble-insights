import type { Metadata } from 'next';
import Tafsir from '@/pages/Tafsir';

export const metadata: Metadata = {
  title: 'Tafsir Library',
  description:
    'In-depth Quranic commentary from classical and contemporary scholars — Ibn Kathir, al-Sa\'di, Ma\'ariful Quran, and more.',
};

export default function TafsirPage() {
  return <Tafsir />;
}
