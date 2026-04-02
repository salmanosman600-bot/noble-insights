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
      <div className="container page-padding">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-foreground text-center">Search the Quran</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">Search across verses, translations, tafsir, and more</p>

          <div className="mt-10 flex items-center gap-3 rounded-2xl border bg-card px-5 py-4 shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-warm/30">
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
          <div className="mt-8 flex items-center gap-1 overflow-x-auto pb-1">
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
            <div className="mt-10 space-y-5">
              <div className="rounded-2xl border bg-card p-6 transition-shadow duration-300 hover:shadow-sm">
                <span className="text-xs font-semibold text-warm">Quran · 94:5</span>
                <p className="mt-3 font-arabic text-lg leading-[2.2] text-foreground">فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</p>
                <p className="mt-3 text-sm text-muted-foreground">For indeed, with hardship will be ease.</p>
              </div>
              <div className="rounded-2xl border bg-card p-6 transition-shadow duration-300 hover:shadow-sm">
                <span className="text-xs font-semibold text-warm">Quran · 13:28</span>
                <p className="mt-3 font-arabic text-lg leading-[2.2] text-foreground">أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ</p>
                <p className="mt-3 text-sm text-muted-foreground">Verily, in the remembrance of Allah do hearts find rest.</p>
              </div>
            </div>
          ) : (
            <div className="mt-20 text-center">
              <p className="text-sm text-muted-foreground">Start typing to search across the entire Quran</p>
              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {['patience', 'mercy', 'paradise', 'forgiveness', 'prayer', 'gratitude'].map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-xl border bg-card px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-hover hover:text-foreground transition-all duration-200"
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