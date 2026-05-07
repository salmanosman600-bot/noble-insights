import type { Metadata } from 'next';
import Topics from '@/pages/Topics';

// Static export: pre-generate all known topic slugs so Next.js can produce
// a static HTML file for each one at build time.
const topicIds = [
  'patience', 'mercy', 'tawhid', 'dua', 'paradise', 'repentance',
  'family', 'knowledge', 'gratitude', 'justice', 'charity', 'prophets',
];

export function generateStaticParams() {
  return topicIds.map((topicId) => ({ topicId }));
}

interface Props {
  params: Promise<{ topicId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const name = topicId.charAt(0).toUpperCase() + topicId.slice(1);
  return {
    title: `${name} — Quran by Topics`,
    description: `Browse Quranic verses related to ${name.toLowerCase()} from the Noble Quran.`,
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { topicId } = await params;
  return <Topics topicId={topicId} />;
}
