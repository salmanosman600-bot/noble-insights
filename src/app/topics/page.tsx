import type { Metadata } from 'next';
import Topics from '@/pages/Topics';

export const metadata: Metadata = {
  title: 'Quran by Topics',
  description:
    'Discover Quranic verses organised by themes: Patience, Mercy, Monotheism, Supplication, Paradise, Repentance, and more.',
};

export default function TopicsPage() {
  return <Topics />;
}
