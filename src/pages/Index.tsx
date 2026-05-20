'use client';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { surahs } from '@/data/surahs';
import { useTranslit } from '@/features/quran/hooks/use-translit';
import { routes } from '@/config/routes';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type FilterType = 'all' | 'Makki' | 'Madani';
type SortMode = 'mushaf' | 'revelation';
type ViewMode = 'grid' | 'list';

const Index = () => {
  const translit = useTranslit();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortMode>('mushaf');

  const filtered = useMemo(() => {
    let result = surahs;
    if (filterType !== 'all') result = result.filter((s) => s.type === filterType);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.transliteration.toLowerCase().includes(q) ||
          s.translationUz.toLowerCase().includes(q) ||
          s.translation.toLowerCase().includes(q) ||
          s.name.includes(q) ||
          s.id.toString() === q,
      );
    }
    if (sortBy === 'revelation') {
      result = [...result].sort((a, b) => a.revelationOrder - b.revelationOrder);
    }
    return result;
  }, [query, filterType, sortBy]);

  return (
    <Layout>
      {/* \u2500\u2500 Hero / Search \u2500\u2500 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-background to-background" />
        <div className="absolute inset-0 geo-pattern" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl animate-pulse-glow" />

        <div className="container relative z-10 py-20 text-center lg:py-32">
          <motion.div
            className="mx-auto mb-8 flex w-fit items-center gap-3"
            initial="hidden" animate="visible" variants={fade} custom={0}
          >
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-warm/60" />
            <span className="section-eyebrow">{translit("Qur'oni Karim Platformasi")}</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-warm/60" />
          </motion.div>

          <motion.p
            className="font-hafs text-5xl text-primary md:text-6xl"
            style={{ lineHeight: 1.9 }}
            dir="rtl"
            initial="hidden" animate="visible" variants={fade} custom={1}
          >
            {'\u0628\u0650\u0633\u0652\u0645\u0650 \u0671\u0644\u0644\u0651\u064e\u0647\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650'}
          </motion.p>

          <motion.h1
            className="mx-auto mt-6 max-w-2xl text-balance text-foreground"
            initial="hidden" animate="visible" variants={fade} custom={2}
          >
            {translit("Qur'oni Karim uchun nozik raqamli tajriba")}
          </motion.h1>

          {/* Search */}
          <motion.div className="mx-auto mt-8 max-w-lg" initial="hidden" animate="visible" variants={fade} custom={3}>
            <div className="flex items-center gap-3.5 rounded-2xl border border-primary/15 bg-card px-6 py-4 shadow-sm">
              <Search className="h-[18px] w-[18px] text-warm shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={translit("Sura nomi, ma'no yoki raqam bo'yicha qidiring\u2026")}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label={translit("Surani qidirish")}
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center justify-center gap-6 text-[13px] text-muted-foreground"
            initial="hidden" animate="visible" variants={fade} custom={4}
          >
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary/50" />114 {translit('Sura')}</span>
            <span className="text-border">{`\u00b7`}</span>
            <span>6 236 {translit('Oyat')}</span>
            <span className="text-border">{`\u00b7`}</span>
            <span>30 {translit('Juz')}</span>
          </motion.div>
        </div>
      </section>

      {/* \u2500\u2500 Surah Index \u2500\u2500 */}
      <section className="container pb-20">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {(['all', 'Makki', 'Madani'] as const).map((t) => (
              <Button
                key={t}
                variant={filterType === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(t)}
              >
                {t === 'all' ? translit('Barchasi') : t}
              </Button>
            ))}
            <div className="mx-1 h-6 w-px bg-border" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy((s) => (s === 'mushaf' ? 'revelation' : 'mushaf'))}
            >
              {sortBy === 'mushaf' ? translit('Mushaf Tartibi') : translit('Nuzul Tartibi')}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode((v) => (v === 'grid' ? 'list' : 'grid'))}
            aria-label={viewMode === 'grid' ? translit("Ro'yxat ko'rinishi") : translit("Jadval ko'rinishi")}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>

        <p className="mb-4 text-xs text-muted-foreground">
          {filtered.length} {translit('ta sura topildi')}
        </p>

        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col gap-2.5'
          }
        >
          {filtered.map((surah) => (
            <Link
              key={surah.id}
              href={routes.surah(surah.id)}
              className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-md hover:border-primary/15 hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-muted-foreground">
                {surah.id}
              </div>
              <div className="min-w-0 flex-1 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-sm font-medium text-foreground">{translit(surah.translationUz)}</span>
                  <span className="block text-xs text-muted-foreground">{surah.totalVerses} oyat</span>
                </div>
                <span className="font-hafs text-2xl text-warm leading-none shrink-0" dir="rtl">{surah.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-sm text-muted-foreground">{translit('Qidiruvingizga mos sura topilmadi.')}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => { setQuery(''); setFilterType('all'); }}
            >
              {translit('Filtrlarni tozalash')}
            </Button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
