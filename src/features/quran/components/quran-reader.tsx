'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Copy,
  Share2,
  ChevronDown,
  Minus,
  Plus,
  Settings,
  SkipBack,
  SkipForward,
  Languages,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/layout/Layout';
import { surahs } from '@/data/surahs';
import { toast } from 'sonner';
import { useSuraTranslation } from '../hooks/use-sura-translation';
import { transliterateUzbekToLatin } from '../utils/transliterate';
import { DEFAULT_TRANSLATION_KEY, type Aya, type Script } from '../types';
import { routes } from '@/config/routes';

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

  const [arabicSize, setArabicSize] = useState(22);
  const [translationSize, setTranslationSize] = useState(17);
  const [showSettings, setShowSettings] = useState(false);
  const [script, setScript] = useState<Script>('cyrillic');
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<number>>(new Set());
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } = useSuraTranslation(
    DEFAULT_TRANSLATION_KEY,
    currentSurah.id,
  );

  const verses = useMemo<Aya[]>(() => data?.result ?? [], [data]);

  const toggleBookmark = useCallback((verseNum: number) => {
    setBookmarkedVerses((prev) => {
      const next = new Set(prev);
      if (next.has(verseNum)) {
        next.delete(verseNum);
        toast('Bookmark removed');
      } else {
        next.add(verseNum);
        toast('Verse bookmarked');
      }
      return next;
    });
  }, []);

  const copyVerse = useCallback(
    (verse: Aya) => {
      const translation = renderTranslation(verse.translation, script);
      const text = `${verse.arabic_text}\n\n${translation}\n\n— ${currentSurah.transliteration} ${verse.sura}:${verse.aya}`;
      navigator.clipboard.writeText(text);
      toast('Copied to clipboard');
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

  const togglePlay = useCallback(
    (verseNum: number) => {
      if (playingVerse === verseNum) {
        setIsPlaying((p) => !p);
      } else {
        setPlayingVerse(verseNum);
        setIsPlaying(true);
      }
    },
    [playingVerse],
  );

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
                  ← Surahs
                </Button>
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-foreground">
                  {currentSurah.transliteration}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {currentSurah.translation} · {currentSurah.totalVerses} verses · {currentSurah.type}
                </p>
              </div>
              <span className="font-arabic text-xl text-warm">{currentSurah.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant={script === 'latin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setScript((s) => (s === 'cyrillic' ? 'latin' : 'cyrillic'))}
                aria-label="Toggle script"
                title="Toggle Cyrillic / Latin"
              >
                <Languages className="mr-1.5 h-3.5 w-3.5" />
                {script === 'latin' ? 'Lot' : 'Кир'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings((s) => !s)}
                className="text-muted-foreground"
                aria-label="Reader settings"
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
                  <span className="text-muted-foreground">Arabic size</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setArabicSize((s) => Math.max(16, s - 2))}
                    aria-label="Decrease Arabic size"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium text-foreground">{arabicSize}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setArabicSize((s) => Math.min(40, s + 2))}
                    aria-label="Increase Arabic size"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Translation size</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTranslationSize((s) => Math.max(13, s - 1))}
                    aria-label="Decrease translation size"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium text-foreground">{translationSize}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTranslationSize((s) => Math.min(28, s + 1))}
                    aria-label="Increase translation size"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Translation</span>
                  <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
                    Uzbek · At-Tafsir Al-Muyassar
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bismillah */}
        {currentSurah.id !== 1 && currentSurah.id !== 9 && (
          <div className="container py-12 text-center">
            <p className="font-arabic text-3xl text-warm leading-loose">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Verses */}
        <div className="container max-w-3xl py-10 pb-36">
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
              <p className="mt-3 text-sm text-foreground">Couldn&apos;t load this surah.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Check your connection and try again.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-4">
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Retry
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {verses.map((verse) => {
                const verseNum = Number(verse.aya);
                const isBookmarked = bookmarkedVerses.has(verseNum);
                const isCurrentlyPlaying = playingVerse === verseNum && isPlaying;

                return (
                  <div
                    key={verse.id}
                    className={`group rounded-2xl border p-7 transition-all duration-300 ${
                      isCurrentlyPlaying
                        ? 'bg-warm-glow border-warm/20 shadow-sm'
                        : 'bg-card hover:shadow-sm'
                    }`}
                  >
                    {/* Verse Number & Actions */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-muted-foreground">
                        {verse.aya}
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-warm"
                          onClick={() => togglePlay(verseNum)}
                          aria-label={isCurrentlyPlaying ? 'Pause' : 'Play'}
                        >
                          {isCurrentlyPlaying ? (
                            <Pause className="h-3.5 w-3.5" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${isBookmarked ? 'text-warm' : 'text-muted-foreground'}`}
                          onClick={() => toggleBookmark(verseNum)}
                          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="h-3.5 w-3.5" />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => copyVerse(verse)}
                          aria-label="Copy verse"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => shareVerse(verse)}
                          aria-label="Share verse"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Arabic — softer weight, smaller default size */}
                    <p
                      className="font-arabic text-right leading-[2.2] text-muted-foreground/90"
                      style={{ fontSize: `${arabicSize}px` }}
                    >
                      {verse.arabic_text}
                    </p>

                    {/* Translation — primary surface */}
                    <p
                      className="mt-5 leading-[1.85] text-foreground"
                      style={{ fontSize: `${translationSize}px` }}
                    >
                      {renderTranslation(verse.translation, script)}
                    </p>

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
                ← Previous
              </Button>
            )}
            {nextSuraId ? (
              <Link href={routes.surah(nextSuraId)}>
                <Button variant="outline">{surahs[nextSuraId - 1].transliteration} →</Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="text-muted-foreground">
                Next →
              </Button>
            )}
          </div>

          {/* Attribution — required by quranenc.com terms */}
          <p className="mt-10 text-center text-[11px] text-muted-foreground">
            Translation source:{' '}
            <a
              href="https://quranenc.com/en/browse/uzbek_moyassar"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              QuranEnc.com — Uzbek Translation of At-Tafsir Al-Muyassar
            </a>
          </p>
        </div>

        {/* Sticky Audio Player */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card/95 backdrop-blur-xl z-40">
          <div className="container flex items-center justify-between py-3.5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="Previous verse">
                  <SkipBack className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="warm"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label="Next verse">
                  <SkipForward className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{currentSurah.transliteration}</p>
                <p className="text-[11px] text-muted-foreground">
                  {isFetching ? 'Updating…' : 'Mishary Rashid Alafasy'}
                </p>
              </div>
            </div>
            <div className="hidden flex-1 items-center gap-3 px-10 md:flex">
              <span className="text-[11px] tabular-nums text-muted-foreground">0:00</span>
              <div className="h-1 flex-1 rounded-full bg-secondary">
                <div className="h-1 w-0 rounded-full bg-warm transition-all" />
              </div>
              <span className="text-[11px] tabular-nums text-muted-foreground">3:45</span>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground" aria-label="Collapse player">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuranReader;
