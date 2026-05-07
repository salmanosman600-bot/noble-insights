'use client';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkX, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { surahs } from '@/features/quran/data/surahs';
import { useBookmarkStore } from '../store/bookmark.store';

const BookmarksPage = () => {
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const toggle = useBookmarkStore((s) => s.toggle);

  const parsed = bookmarks
    .map((key) => {
      const [surahIdStr, verseNumStr] = key.split(':');
      const surahId = Number(surahIdStr);
      const verseNum = Number(verseNumStr);
      const surah = surahs[surahId - 1];
      return { key, surahId, verseNum, surah };
    })
    .filter((b) => b.surah != null);

  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Xatcho&apos;plar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {parsed.length > 0
              ? `${parsed.length} ta saqlangan oyat`
              : "Hali xatcho'p qilinmagan"}
          </p>
        </div>

        {parsed.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-20 text-center">
            <Bookmark className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Hali xatcho&apos;p qilinmagan oyatlar yo&apos;q
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Qur&apos;on o&apos;qiyotganda oyat ustidagi xatcho&apos;p tugmasini bosing
            </p>
            <Link href={routes.quran} className="mt-6">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-3.5 w-3.5" />
                Qur&apos;on o&apos;qish
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parsed.map(({ key, surahId, verseNum, surah }) => (
              <div
                key={key}
                className="group flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-quran text-xl text-warm">{surah.name}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {surah.transliteration}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {surah.translation} · {verseNum}-oyat
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-muted-foreground">
                    {verseNum}
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Link href={routes.surah(surahId)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                      O&apos;qish
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => toggle(surahId, verseNum)}
                    aria-label="Xatcho'pni olib tashlash"
                  >
                    <BookmarkX className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookmarksPage;
