import type { Metadata } from 'next';
import Dashboard from '@/pages/Dashboard';

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'Your personal Quran reading space — track progress, manage bookmarks, and review reading streaks.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <Dashboard />;
}
