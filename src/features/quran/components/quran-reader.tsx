'use client';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { routes } from '@/config/routes';
import { surahs } from '@/data/surahs';
import {
    AlertCircle,
    Bookmark,
    BookmarkCheck,
    Copy,
    Minus,
    Plus,
    RefreshCw,
    Settings,
    Share2,
    Volume2,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useSuraTranslation } from '../hooks/use-sura-translation';
import { useBookmarkStore, bookmarkKey } from '../store/bookmark.store';
import { useScriptStore } from '../store/script.store';
import { DEFAULT_TRANSLATION_KEY, type Aya, type Script } from '../types';
import { transliterateUzbekToLatin } from '../utils/transliterate';

// Translation-prominent reader: Uzbek translation is the primary surface;
// Arabic is preserved above each verse but at a softer visual weight.
// Source: quranenc.com (`uzbek_moyassar`, At-Tafsir Al-Muyassar in Uzbek).

const clampSuraId = (raw: string | null): number => {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1 || n > 114) return 1;
  return Math.floor(n);
};

const renderTranslation = (text: string, script: Script) =>
  script === 'latin' ? transliterateUzbekToLatin(text) : text;

const QuranReader = () => {
  const searchParams = useSearchParams();
  const suraId = clampSuraId(searchParams?.get('surah') ?? null);
  const currentSurah = surahs[suraId - 1] ?? surahs[0];

  const [arabicSize, setArabicSize] = useState(28);
  const [translationSize, setTranslationSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);
  const script = useScriptStore((s) => s.script);
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const toggleBookmarkInStore = useBookmarkStore((s) => s.toggle);

  const { data, isLoading, isError, refetch, isFetching } = useSuraTranslation(
    DEFAULT_TRANSLATION_KEY,
    currentSurah.id,
  );

  const verses = useMemo<Aya[]>(() => data?.result ?? [], [data]);

  const toggleBookmark = useCallback((verseNum: number) => {
    const was = bookmarks.includes(bookmarkKey(suraId, verseNum));
    toggleBookmarkInStore(suraId, verseNum);
    toast(was ? "Xatcho'p olib tashlandi" : "Oyat xatcho'p qilindi");
  }, [bookmarks, toggleBookmarkInStore, suraId]);

  const copyVerse = useCallback(
    (verse: Aya) => {
      const translation = renderTranslation(verse.translation, script);
      const text = `${verse.arabic_text}\n\n${translation}\n\n— ${currentSurah.transliteration} ${verse.sura}:${verse.aya}`;
      navigator.clipboard.writeText(text);
      toast('Buferga nusxa olindi');
    },
    [currentSurah, script],
  );

  const shareVerse = useCallback(
    (verse: Aya) => {
      const translation = renderTranslation(verse.translation, script);
      if (navigator.share) {
        navigator.share({
          title: `${currentSurah.transliteration} ${verse.sura}:${verse.aya}`,
          text: `${verse.arabic_text}\n\n${translation}`,
        });
      } else {
        copyVerse(verse);
      }
    },
    [currentSurah, script, copyVerse],
  );

  const playAudio = useCallback(() => {
    toast.info("Audio tez orada qo'shiladi");
  }, []);

  const prevSuraId = suraId > 1 ? suraId - 1 : null;
  const nextSuraId = suraId < 114 ? suraId + 1 : null;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Surah Header */}
        <div className="border-b bg-card/90 backdrop-blur-sm">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href={routes.surahs}>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  ← Suralar
                </Button>
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-foreground">
                  {currentSurah.transliteration}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {currentSurah.translation} · {currentSurah.totalVerses} oyat · {currentSurah.type}
                </p>
              </div>
              <span className="font-quran text-xl text-warm">{currentSurah.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings((s) => !s)}
                className="text-muted-foreground"
                aria-label="O'quvchi sozlamalari"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="border-t bg-card animate-fade-in">
              <div className="container flex flex-wrap items-center gap-8 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Arab shrift o'lchami</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setArabicSize((s) => Math.max(16, s - 2))}
                    aria-label="Arab shrift o'lchamini kichraytirish"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium text-foreground">{arabicSize}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setArabicSize((s) => Math.min(40, s + 2))}
                    aria-label="Arab shrift o'lchamini kattalashtirish"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Tarjima o'lchami</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTranslationSize((s) => Math.max(13, s - 1))}
                    aria-label="Tarjima o'lchamini kichraytirish"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium text-foreground">{translationSize}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTranslationSize((s) => Math.min(28, s + 1))}
                    aria-label="Tarjima o'lchamini kattalashtirish"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Tarjima</span>
                  <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
                    O'zbek · At-Tafsir Al-Muyassar
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bismillah */}
        {currentSurah.id !== 1 && currentSurah.id !== 9 && (
          <div className="container py-12 text-center">
            <p className="font-quran text-3xl text-warm leading-loose">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Verses */}
          <div className="container max-w-3xl py-10">
          {isLoading ? (
            <div className="space-y-5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="rounded-2xl border bg-card p-7">
                  <Skeleton className="mb-5 h-9 w-9 rounded-xl" />
                  <Skeleton className="mb-3 h-6 w-full" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-2xl border bg-card p-10 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
              <p className="mt-3 text-sm text-foreground">Bu surani yuklab bo&apos;lmadi.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Aloqangizni tekshirib, qaytadan urinib ko'ring.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-4">
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Qayta urinish
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {verses.map((verse) => {
                const verseNum = Number(verse.aya);
                const isBookmarked = bookmarks.includes(bookmarkKey(suraId, verseNum));

                return (
                  <div
                    key={verse.id}
                    className="group rounded-2xl border bg-card p-7 transition-all duration-300 hover:shadow-sm"
                  >
                    {/* Verse Number & Actions */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-muted-foreground">
                        {verse.aya}
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => setTranslationSize((s) => Math.max(13, s - 1))}
                          aria-label="Shrift o'lchamini kichraytirish"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => setTranslationSize((s) => Math.min(28, s + 1))}
                          aria-label="Shrift o'lchamini kattalashtirish"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={playAudio}
                          aria-label="Audio"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => copyVerse(verse)}
                          aria-label="Oyatni nusxa olish"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => shareVerse(verse)}
                          aria-label="Oyatni ulashish"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${isBookmarked ? 'text-warm' : 'text-muted-foreground'}`}
                          onClick={() => toggleBookmark(verseNum)}
                          aria-label={isBookmarked ? "Xatcho'pni olib tashlash" : "Xatcho'p qilish"}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="h-3.5 w-3.5" />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Arabic — Uthmanic (Amiri Quran) font */}
                    <p
                      className="font-quran text-right leading-[2.4] text-foreground"
                      style={{ fontSize: `${arabicSize}px` }}
                    >
                      {verse.arabic_text}
                    </p>

                    {/* Тафсир label + translation */}
                    <div className="mt-5">
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-warm">
                        {script === 'cyrillic' ? 'Тафсир' : 'Tafsir'}
                      </p>
                      <p
                        className="leading-[1.85] text-foreground"
                        style={{ fontSize: `${translationSize}px` }}
                      >
                        {renderTranslation(verse.translation, script)}
                      </p>
                    </div>

                    {verse.footnotes && (
                      <p className="mt-3 border-l-2 border-warm/30 pl-3 text-xs leading-relaxed text-muted-foreground">
                        {renderTranslation(verse.footnotes, script)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Surah Navigation */}
          <div className="mt-12 flex items-center justify-between">
            {prevSuraId ? (
              <Link href={routes.surah(prevSuraId)}>
                <Button variant="outline">← {surahs[prevSuraId - 1].transliteration}</Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="text-muted-foreground">
                ← Oldingi
              </Button>
            )}
            {nextSuraId ? (
              <Link href={routes.surah(nextSuraId)}>
                <Button variant="outline">{surahs[nextSuraId - 1].transliteration} →</Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="text-muted-foreground">
                Keyingi →
              </Button>
            )}
          </div>

          {/* Attribution — required by quranenc.com terms */}
          <p className="mt-10 text-center text-[11px] text-muted-foreground">
            Tarjima manbai:{' '}
            <a
              href="https://quranenc.com/en/browse/uzbek_moyassar"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              QuranEnc.com — At-Tafsir Al-Muyassar O'zbek Tarjimasi
            </a>
          </p>
        </div>


      </div>
    </Layout>
  );
};

export default QuranReader;
