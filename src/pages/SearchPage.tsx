import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const tabs = ['All', 'Quran', 'Translation', 'Tafsir', 'Audio', 'Articles'];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  return (
    <Layout>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold text-foreground text-center">Search the Quran</h1>
          <p className="mt-1 text-sm text-muted-foreground text-center">Search across verses, translations, tafsir, and more</p>

          <div className="mt-8 flex items-center gap-2 rounded-xl border bg-card px-4 py-3 shadow-sm">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by keyword, surah name, or verse number…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </div>

          {/* Tabs */}
          <div className="mt-6 flex items-center gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Results */}
          {query ? (
            <div className="mt-8 space-y-4">
              {/* Sample result */}
              <div className="rounded-xl border bg-card p-5">
                <span className="text-xs font-medium text-warm">Quran · 94:5</span>
                <p className="mt-2 font-arabic text-lg text-foreground">فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
                <p className="mt-2 text-sm text-muted-foreground">For indeed, with hardship will be ease.</p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <span className="text-xs font-medium text-warm">Quran · 13:28</span>
                <p className="mt-2 font-arabic text-lg text-foreground">أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ</p>
                <p className="mt-2 text-sm text-muted-foreground">Verily, in the remembrance of Allah do hearts find rest.</p>
              </div>
            </div>
          ) : (
            <div className="mt-16 text-center text-sm text-muted-foreground">
              <p>Start typing to search across the entire Quran</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['patience', 'mercy', 'paradise', 'forgiveness', 'prayer'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-hover transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
