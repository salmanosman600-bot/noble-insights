'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { surahs } from '../data/surahs';
import { routes } from '@/config/routes';

type FilterType = 'all' | 'Makki' | 'Madani';
type SortMode = 'mushaf' | 'revelation';
type ViewMode = 'grid' | 'list';

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.015, 0.4), duration: 0.35, ease: 'easeOut' },
  }),
};

const SurahIndex = () => {
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
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Surah Index</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse all 114 chapters of the Noble Quran
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 max-w-md items-center gap-3 rounded-2xl border bg-card px-5 py-3">
            <Search className="h-[18px] w-[18px] text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by name, meaning, or number…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search surahs"
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'Makki', 'Madani'] as const).map((t) => (
              <Button
                key={t}
                variant={filterType === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(t)}
              >
                {t === 'all' ? 'All' : t}
              </Button>
            ))}
            <div className="mx-1 h-6 w-px bg-border" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy((s) => (s === 'mushaf' ? 'revelation' : 'mushaf'))}
            >
              {sortBy === 'mushaf' ? 'Mushaf Order' : 'Revelation Order'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode((v) => (v === 'grid' ? 'list' : 'grid'))}
              aria-label={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <p className="mb-6 text-xs text-muted-foreground">
          {filtered.length} surah{filtered.length !== 1 ? 's' : ''} found
        </p>

        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col gap-2.5'
          }
        >
          {filtered.map((surah, i) => (
            <motion.div
              key={surah.id}
              initial="hidden"
              animate="visible"
              variants={fade}
              custom={i}
            >
              <Link
                href={routes.surah(surah.id)}
                className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-semibold text-muted-foreground">
                  {surah.id}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">{surah.transliteration}</span>
                    <span className="font-arabic text-sm text-warm">{surah.name}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{surah.translation}</span>
                    <span className="text-border">·</span>
                    <span>{surah.totalVerses} verses</span>
                    <span className="text-border">·</span>
                    <span className={surah.type === 'Makki' ? 'text-olive' : 'text-warm'}>
                      {surah.type}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-sm text-muted-foreground">No surahs match your search.</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => {
                setQuery('');
                setFilterType('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SurahIndex;
