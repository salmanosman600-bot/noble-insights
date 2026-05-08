'use client';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { routes } from '@/config/routes';
import { surahs } from '@/data/surahs';
import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RefreshCw,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSuraTranslation } from '../hooks/use-sura-translation';
import { useMushafSura } from '../hooks/use-mushaf-sura';
import { useQcfFonts } from '../hooks/use-qcf-fonts';
import { useScriptStore } from '../store/script.store';
import { DEFAULT_TRANSLATION_KEY, type Script } from '../types';
import { transliterateUzbekToLatin } from '../utils/transliterate';

// Surah 9 (At-Tawbah) is the only surah without a Bismillah header.
const TAWBAH_ID = 9;

const clampSuraId = (raw: string | null): number => {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1 || n > 114) return 1;
  return Math.floor(n);
};

const surahNameGlyph = (id: number) => String.fromCharCode(0xe900 + id - 1);

// ── Skeleton rows shown while fonts or data are loading ──────────────────────
const MushafSkeleton = () => (
  <div className="space-y-6 px-4 py-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="mx-auto h-10 w-[90%] rounded-lg" />
        <Skeleton className="mx-auto h-10 w-[70%] rounded-lg" />
        <Skeleton className="mx-auto h-4 w-[60%] rounded" />
      </div>
    ))}
  </div>
);

// ── Single verse block ────────────────────────────────────────────────────────
interface VerseBlockProps {
  verseNumber: number;
  words: { id: number; page_number: number; code_v2: string; char_type_name: string }[];
  translation: string | undefined;
  showTranslation: boolean;
  arabicSize: number;
  script: Script;
}

const VerseBlock = ({
  verseNumber,
  words,
  translation,
  showTranslation,
  arabicSize,
  script,
}: VerseBlockProps) => {
  const translationText =
    translation && script === 'latin'
      ? transliterateUzbekToLatin(translation)
      : (translation ?? '');

  return (
    <div className="group relative rounded-2xl border border-border/50 bg-card px-5 py-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Verse number badge */}
      <span
        className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary"
        aria-label={`Oyat ${verseNumber}`}
      >
        {verseNumber}
      </span>

      {/* QCF V2 arabic words — RTL flex-wrap, each span carries its page font */}
      <div
        dir="rtl"
        className="flex flex-wrap items-baseline justify-center gap-x-[1px] gap-y-1 pb-1 pt-2"
        style={{ lineHeight: 2.8 }}
        aria-label="Arabcha matn"
      >
        {words.map((word) => (
          <span
            key={word.id}
            style={{
              fontFamily: `'p${word.page_number}-v2'`,
              fontSize: arabicSize,
            }}
          >
            {word.code_v2}
          </span>
        ))}
      </div>

      {/* Optional translation */}
      {showTranslation && translationText && (
        <p className="mt-3 border-t border-border/40 pt-3 text-center text-sm leading-relaxed text-muted-foreground">
          {translationText}
        </p>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const MushafReader = () => {
  const searchParams = useSearchParams();
  const suraId = clampSuraId(searchParams?.get('surah') ?? null);
  const currentSurah = surahs[suraId - 1] ?? surahs[0];

  const [arabicSize, setArabicSize] = useState(32);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const script = useScriptStore((s) => s.script);

  // QCF V2 word data from api.qurancdn.com
  const {
    data: qcfVerses,
    isLoading: qcfLoading,
    isError: qcfError,
    refetch,
    isFetching,
  } = useMushafSura(suraId);

  // Optional Uzbek translation — always fetched (cached 24h) to avoid
  // a loading delay when the user first toggles translation on.
  const { data: translationData } = useSuraTranslation(
    DEFAULT_TRANSLATION_KEY,
    suraId,
  );

  // Load per-page QCF V2 fonts once verse data arrives
  const fontsReady = useQcfFonts(qcfVerses);

  // Map verse number → Uzbek translation string for O(1) lookup
  const translationMap = useMemo(() => {
    const map = new Map<number, string>();
    translationData?.result.forEach((a) => map.set(Number(a.aya), a.translation));
    return map;
  }, [translationData]);

  const isLoading = qcfLoading || (!fontsReady && !!qcfVerses?.length);

  const prevSuraId = suraId > 1 ? suraId - 1 : null;
  const nextSuraId = suraId < 114 ? suraId + 1 : null;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ── Sticky header ─────────────────────────────────────────────────── */}
        <div className="sticky top-[4.25rem] z-30 border-b bg-card/95 backdrop-blur-sm">
          <div className="container flex items-center justify-between py-3">
            {/* Left: back + surah info */}
            <div className="flex items-center gap-3">
              <Link href={routes.surahs}>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">Suralar</span>
                </Button>
              </Link>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight text-foreground">
                  {currentSurah.transliteration}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {currentSurah.translation} · {currentSurah.totalVerses} oyat
                </p>
              </div>
              {/* Decorative surah name glyph */}
              <span
                className="font-surah-names text-3xl leading-none text-warm"
                aria-hidden="true"
              >
                {surahNameGlyph(suraId)}
              </span>
            </div>

            {/* Right: settings button */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings((s) => !s)}
                className="text-muted-foreground"
                aria-label="O'quvchi sozlamalari"
                aria-expanded={showSettings}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ── Settings panel ──────────────────────────────────────────────── */}
          {showSettings && (
            <div className="border-t bg-card/95 animate-fade-in">
              <div className="container flex flex-wrap items-center gap-6 py-4">
                {/* Arabic font size */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Arab shrift</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setArabicSize((s) => Math.max(20, s - 2))}
                    aria-label="Kichraytirish"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium text-foreground">
                    {arabicSize}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setArabicSize((s) => Math.min(52, s + 2))}
                    aria-label="Kattalashtirish"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Translation toggle */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Tarjima</span>
                  <Button
                    variant={showTranslation ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowTranslation((s) => !s)}
                  >
                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                    {showTranslation ? "Yopish" : "Ko'rsatish"}
                  </Button>
                </div>

                {/* Refresh */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="ml-auto text-muted-foreground"
                >
                  <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isFetching ? 'animate-spin' : ''}`} />
                  Yangilash
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ── Reading canvas ─────────────────────────────────────────────────── */}
        <main className="container max-w-3xl px-4 py-10">
          {/* ── Error state ─────────────────────────────────────────────────── */}
          {qcfError && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <div>
                <p className="font-medium text-foreground">Ma'lumotni yuklab bo'lmadi</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Internet aloqangizni tekshirib qaytadan urinib ko'ring.
                </p>
              </div>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Qayta urinib ko'ring
              </Button>
            </div>
          )}

          {/* ── Loading skeleton ─────────────────────────────────────────────── */}
          {isLoading && !qcfError && <MushafSkeleton />}

          {/* ── Content ──────────────────────────────────────────────────────── */}
          {!isLoading && !qcfError && qcfVerses && (
            <div className="animate-fade-in">
              {/* Surah decorative header */}
              <div className="mb-8 rounded-2xl border border-amber-200/60 bg-gradient-to-b from-amber-50/60 to-card px-6 py-8 text-center shadow-sm dark:border-amber-900/30 dark:from-amber-950/20">
                <span
                  className="font-surah-names block leading-none text-foreground"
                  style={{ fontSize: 72 }}
                  aria-label={`Sura ${currentSurah.transliteration}`}
                >
                  {surahNameGlyph(suraId)}
                </span>
                <p className="mt-4 text-base font-semibold tracking-wide text-foreground">
                  {currentSurah.transliteration}
                </p>
                <p className="text-sm text-muted-foreground">{currentSurah.translation}</p>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>{currentSurah.totalVerses} oyat</span>
                  <span>·</span>
                  <span>{currentSurah.type}</span>
                  <span>·</span>
                  <span>Juz {qcfVerses[0]?.juz_number}</span>
                </div>
              </div>

              {/* Bismillah — every surah except Al-Fatiha (1) and At-Tawbah (9) */}
              {suraId !== 1 && suraId !== TAWBAH_ID && (
                <div className="mb-8 text-center" aria-label="Bismillahir rohmanir rohiym">
                  <span className="font-bismillah text-[52px] leading-none text-foreground">
                    {'\uE001'}
                  </span>
                </div>
              )}

              {/* Verse list */}
              <ol className="space-y-4">
                {qcfVerses.map((verse) => (
                  <li key={verse.id}>
                    <VerseBlock
                      verseNumber={verse.verse_number}
                      words={verse.words}
                      translation={translationMap.get(verse.verse_number)}
                      showTranslation={showTranslation}
                      arabicSize={arabicSize}
                      script={script}
                    />
                  </li>
                ))}
              </ol>

              {/* Surah navigation */}
              <div className="mt-12 flex items-center justify-between gap-4 border-t pt-8">
                {prevSuraId ? (
                  <Link href={routes.mushafSurah(prevSuraId)} className="flex-1">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ChevronRight className="h-4 w-4" />
                      <span className="text-sm">
                        {surahs[prevSuraId - 1]?.transliteration}
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                <Link href={routes.surahs}>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Suralar
                  </Button>
                </Link>

                {nextSuraId ? (
                  <Link href={routes.mushafSurah(nextSuraId)} className="flex-1">
                    <Button variant="outline" className="w-full justify-end gap-2">
                      <span className="text-sm">
                        {surahs[nextSuraId - 1]?.transliteration}
                      </span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              {/* Attribution — required by Quran Foundation terms */}
              <p className="mt-8 text-center text-[11px] text-muted-foreground/60">
                Arabcha matn:{' '}
                <a
                  href="https://qurancdn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-muted-foreground"
                >
                  QuranCDN.com
                </a>{' '}
                · Shrift:{' '}
                <a
                  href="https://quran.foundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-muted-foreground"
                >
                  Quran Foundation
                </a>
              </p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default MushafReader;
