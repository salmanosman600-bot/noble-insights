import { Metadata } from 'next';
import BookmarksPage from '@/features/quran/components/bookmarks-page';

export const metadata: Metadata = {
  title: "Xatcho'plar — Noor",
  description: "Saqlangan oyatlaringiz",
};

export default function BookmarksRoute() {
  return <BookmarksPage />;
}
