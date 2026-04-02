import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Bookmark, Copy, Share2, MessageSquare, ChevronDown, Minus, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { surahs } from '@/data/surahs';
import { alFatihahVerses } from '@/data/verses';

const QuranReader = () => {
  const [currentSurah] = useState(surahs[0]);
  const [fontSize, setFontSize] = useState(28);
  const [showTafsir, setShowTafsir] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Surah Header */}
        <div className="border-b bg-card">
          <div className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Link to="/surahs">
                <Button variant="ghost" size="sm">← Surahs</Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{currentSurah.transliteration}</h1>
                <p className="text-xs text-muted-foreground">{currentSurah.translation} · {currentSurah.totalVerses} verses · {currentSurah.type}</p>
              </div>
              <span className="font-arabic text-xl text-warm">{currentSurah.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowTafsir(!showTafsir)}>
                {showTafsir ? 'Hide' : 'Show'} Tafsir
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="border-t bg-surface">
              <div className="container flex items-center gap-6 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Arabic Size</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setFontSize(s => Math.max(18, s - 2))}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs">{fontSize}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setFontSize(s => Math.min(48, s + 2))}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bismillah */}
        <div className="container py-8 text-center">
          <p className="font-arabic text-2xl text-warm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        </div>

        {/* Verses */}
        <div className="container max-w-3xl pb-32">
          <div className="space-y-4">
            {alFatihahVerses.map((verse) => (
              <div key={verse.id} className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-sm">
                {/* Verse Number & Actions */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-muted-foreground">
                    {verse.verseNumber}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Play className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Bookmark className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Copy className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Share2 className="h-3 w-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MessageSquare className="h-3 w-3" /></Button>
                  </div>
                </div>

                {/* Arabic */}
                <p className="font-arabic text-right leading-[2.4]" style={{ fontSize: `${fontSize}px` }}>
                  {verse.arabic}
                </p>

                {/* Translation */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {verse.translation}
                </p>

                {/* Tafsir */}
                {showTafsir && (
                  <div className="mt-4 rounded-lg bg-secondary p-4">
                    <p className="text-xs font-medium text-warm">Tafsir Ibn Kathir</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      This verse establishes the foundational principle of beginning all matters with the name of Allah, seeking His blessings and mercy in every endeavor.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Surah Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" disabled>← Previous Surah</Button>
            <Link to="/quran?surah=2">
              <Button variant="outline">Next Surah: Al-Baqarah →</Button>
            </Link>
          </div>
        </div>

        {/* Sticky Audio Player */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card/95 backdrop-blur-md">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Button variant="warm" size="icon" className="h-9 w-9 rounded-full">
                <Play className="h-4 w-4" />
              </Button>
              <div>
                <p className="text-xs font-medium text-foreground">Al-Fatihah</p>
                <p className="text-xs text-muted-foreground">Mishary Rashid Alafasy</p>
              </div>
            </div>
            <div className="hidden flex-1 items-center gap-3 px-8 md:flex">
              <span className="text-xs text-muted-foreground">0:00</span>
              <div className="h-1 flex-1 rounded-full bg-secondary">
                <div className="h-1 w-0 rounded-full bg-warm" />
              </div>
              <span className="text-xs text-muted-foreground">3:45</span>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuranReader;
