'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Play, Pause, Bookmark, BookmarkCheck, Copy, Share2, MessageSquare, ChevronDown, Minus, Plus, Settings, Check, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { surahs } from '@/data/surahs';
import { alFatihahVerses } from '@/data/verses';
import { toast } from 'sonner';

const QuranReader = () => {
  const [currentSurah] = useState(surahs[0]);
  const [fontSize, setFontSize] = useState(28);
  const [showTafsir, setShowTafsir] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<number>>(new Set([2]));
  const [playingVerse, setPlayingVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleBookmark = useCallback((verseNum: number) => {
    setBookmarkedVerses(prev => {
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

  const copyVerse = useCallback((verse: typeof alFatihahVerses[0]) => {
    const text = `${verse.arabic}\n\n${verse.translation}\n\n— ${currentSurah.transliteration} ${verse.surahId}:${verse.verseNumber}`;
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard');
  }, [currentSurah]);

  const shareVerse = useCallback((verse: typeof alFatihahVerses[0]) => {
    if (navigator.share) {
      navigator.share({
        title: `${currentSurah.transliteration} ${verse.surahId}:${verse.verseNumber}`,
        text: `${verse.arabic}\n\n${verse.translation}`,
      });
    } else {
      copyVerse(verse);
    }
  }, [currentSurah, copyVerse]);

  const togglePlay = useCallback((verseNum: number) => {
    if (playingVerse === verseNum) {
      setIsPlaying(p => !p);
    } else {
      setPlayingVerse(verseNum);
      setIsPlaying(true);
    }
  }, [playingVerse]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Surah Header */}
        <div className="border-b bg-card/90 backdrop-blur-sm">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/surahs">
                <Button variant="ghost" size="sm" className="text-muted-foreground">← Surahs</Button>
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-foreground">{currentSurah.transliteration}</h1>
                <p className="text-xs text-muted-foreground">{currentSurah.translation} · {currentSurah.totalVerses} verses · {currentSurah.type}</p>
              </div>
              <span className="font-arabic text-xl text-warm">{currentSurah.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant={showTafsir ? 'default' : 'ghost'} size="sm" onClick={() => setShowTafsir(!showTafsir)}>
                Tafsir
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} className="text-muted-foreground">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="border-t bg-card animate-fade-in">
              <div className="container flex flex-wrap items-center gap-8 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Arabic Size</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setFontSize(s => Math.max(18, s - 2))}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium text-foreground">{fontSize}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setFontSize(s => Math.min(48, s + 2))}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Translation</span>
                  <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">Sahih International</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bismillah */}
        <div className="container py-12 text-center">
          <p className="font-arabic text-3xl text-warm leading-loose">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
          <p className="mt-2 text-xs text-muted-foreground">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
        </div>

        {/* Verses */}
        <div className="container max-w-3xl pb-36">
          <div className="space-y-5">
            {alFatihahVerses.map((verse) => {
              const isBookmarked = bookmarkedVerses.has(verse.verseNumber);
              const isCurrentlyPlaying = playingVerse === verse.verseNumber && isPlaying;

              return (
                <div
                  key={verse.id}
                  className={`group rounded-2xl border p-7 transition-all duration-300 ${
                    isCurrentlyPlaying ? 'bg-warm-glow border-warm/20 shadow-sm' : 'bg-card hover:shadow-sm'
                  }`}
                >
                  {/* Verse Number & Actions */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-muted-foreground">
                      {verse.verseNumber}
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-warm" onClick={() => togglePlay(verse.verseNumber)}>
                        {isCurrentlyPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${isBookmarked ? 'text-warm' : 'text-muted-foreground'}`} onClick={() => toggleBookmark(verse.verseNumber)}>
                        {isBookmarked ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => copyVerse(verse)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => shareVerse(verse)}>
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Arabic */}
                  <p className="font-arabic text-right leading-[2.4]" style={{ fontSize: `${fontSize}px` }}>
                    {verse.arabic}
                  </p>

                  {/* Translation */}
                  <p className="mt-5 text-sm leading-[1.8] text-muted-foreground">
                    {verse.translation}
                  </p>

                  {/* Tafsir */}
                  {showTafsir && (
                    <div className="mt-5 rounded-xl bg-secondary/60 p-5 animate-fade-in">
                      <p className="text-xs font-semibold text-warm">Tafsir Ibn Kathir</p>
                      <p className="mt-2 text-xs leading-[1.8] text-muted-foreground">
                        This verse establishes the foundational principle of beginning all matters with the name of Allah, seeking His blessings and mercy in every endeavor. The scholars of tafsir emphasize the importance of this opening, as it sets the spiritual tone for all that follows.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Surah Navigation */}
          <div className="mt-12 flex items-center justify-between">
            <Button variant="outline" disabled className="text-muted-foreground">← Previous Surah</Button>
            <Link href="/quran?surah=2">
              <Button variant="outline">Next: Al-Baqarah →</Button>
            </Link>
          </div>
        </div>

        {/* Sticky Audio Player */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card/95 backdrop-blur-xl z-40">
          <div className="container flex items-center justify-between py-3.5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <SkipBack className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="warm"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setIsPlaying(p => !p)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <SkipForward className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Al-Fatihah</p>
                <p className="text-[11px] text-muted-foreground">Mishary Rashid Alafasy</p>
              </div>
            </div>
            <div className="hidden flex-1 items-center gap-3 px-10 md:flex">
              <span className="text-[11px] tabular-nums text-muted-foreground">0:00</span>
              <div className="h-1 flex-1 rounded-full bg-secondary">
                <div className="h-1 w-0 rounded-full bg-warm transition-all" />
              </div>
              <span className="text-[11px] tabular-nums text-muted-foreground">3:45</span>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuranReader;