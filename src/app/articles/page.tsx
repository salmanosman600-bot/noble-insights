import type { Metadata } from 'next';
import Articles from '@/pages/Articles';

export const metadata: Metadata = {
  title: 'Articles & Knowledge',
  description:
    'Beneficial readings, Quranic reflections, beginner guides, and reading plans to deepen your connection with the Noble Quran.',
};

export default function ArticlesPage() {
  return <Articles />;
}
