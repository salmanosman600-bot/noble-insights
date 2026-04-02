import { useState } from 'react';
import { Play, Download, Headphones, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const reciters = [
  { id: 1, name: 'Mishary Rashid Alafasy', riwayah: 'Hafs', style: 'Melodic', surahs: 114, popular: true },
  { id: 2, name: 'Abdul Rahman Al-Sudais', riwayah: 'Hafs', style: 'Imam, Traditional', surahs: 114, popular: true },
  { id: 3, name: 'Maher Al-Muaiqly', riwayah: 'Hafs', style: 'Clear, Calm', surahs: 114, popular: true },
  { id: 4, name: 'Saad Al-Ghamdi', riwayah: 'Hafs', style: 'Powerful', surahs: 114, popular: false },
  { id: 5, name: 'Hani Ar-Rifai', riwayah: 'Hafs', style: 'Emotional', surahs: 114, popular: false },
  { id: 6, name: 'Yasser Al-Dosari', riwayah: 'Hafs', style: 'Gentle', surahs: 114, popular: true },
  { id: 7, name: 'Ahmad Al-Ajmi', riwayah: 'Hafs', style: 'Unique', surahs: 114, popular: false },
  { id: 8, name: 'Khalifa Al-Tunaiji', riwayah: 'Hafs', style: 'Tajweed-focused', surahs: 114, popular: false },
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
};

const Audio = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'popular'>('all');

  const filtered = reciters.filter(r => {
    if (filter === 'popular' && !r.popular) return false;
    if (query && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Recitations</h1>
          <p className="mt-2 text-sm text-muted-foreground">Listen to the Quran recited by world-renowned reciters</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-3 flex-1 max-w-md">
            <Search className="h-[18px] w-[18px] text-muted-foreground" />
            <input
              type="text" placeholder="Search reciters…"
              value={query} onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
            <Button variant={filter === 'popular' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('popular')}>Popular</Button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <div className="group rounded-2xl border bg-card p-6 transition-shadow duration-300 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-secondary">
                    <Headphones className="h-5 w-5 text-warm" />
                  </div>
                  {r.popular && (
                    <span className="rounded-lg bg-warm/10 px-2.5 py-1 text-[11px] font-semibold text-warm">Popular</span>
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{r.name}</h3>
                <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{r.riwayah}</span>
                  <span className="text-border">·</span>
                  <span>{r.style}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.surahs} surahs available</p>
                <div className="mt-5 flex gap-2.5">
                  <Button variant="warm" size="sm" className="flex-1 gap-1.5">
                    <Play className="h-3 w-3" /> Listen
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Download className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Audio;