import { useState } from 'react';
import { Search, Download, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const translations = [
  { id: 1, language: 'English', translators: [
    { name: 'Sahih International', style: 'Clear, Modern', complete: true, audio: true },
    { name: 'Yusuf Ali', style: 'Classic, Literary', complete: true, audio: false },
    { name: 'Pickthall', style: 'Formal, Traditional', complete: true, audio: false },
    { name: 'Dr. Mustafa Khattab (The Clear Quran)', style: 'Contemporary', complete: true, audio: true },
  ]},
  { id: 2, language: 'Urdu', translators: [
    { name: 'Fateh Muhammad Jalandhry', style: 'Classical', complete: true, audio: true },
    { name: 'Mufti Taqi Usmani', style: 'Modern', complete: true, audio: false },
  ]},
  { id: 3, language: 'French', translators: [
    { name: 'Muhammad Hamidullah', style: 'Scholarly', complete: true, audio: false },
  ]},
  { id: 4, language: 'Turkish', translators: [
    { name: 'Diyanet İşleri', style: 'Official', complete: true, audio: true },
  ]},
  { id: 5, language: 'Spanish', translators: [
    { name: 'Julio Cortés', style: 'Standard', complete: true, audio: false },
  ]},
  { id: 6, language: 'Indonesian', translators: [
    { name: 'Kementerian Agama', style: 'Official', complete: true, audio: true },
  ]},
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
};

const Translations = () => {
  const [query, setQuery] = useState('');

  const filtered = translations.filter(t =>
    !query || t.language.toLowerCase().includes(query.toLowerCase()) ||
    t.translators.some(tr => tr.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Translation Library</h1>
          <p className="mt-2 text-sm text-muted-foreground">Explore Quran translations across multiple languages and scholarly traditions</p>
        </div>

        <div className="mb-10 flex items-center gap-3 rounded-2xl border bg-card px-5 py-3 max-w-md">
          <Search className="h-[18px] w-[18px] text-muted-foreground" />
          <input
            type="text" placeholder="Search by language or translator…"
            value={query} onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="space-y-14">
          {filtered.map((lang, li) => (
            <motion.div key={lang.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={li}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
                  <Globe className="h-4 w-4 text-warm" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{lang.language}</h2>
                  <p className="text-xs text-muted-foreground">{lang.translators.length} translation{lang.translators.length > 1 ? 's' : ''} available</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lang.translators.map(tr => (
                  <div key={tr.name} className="rounded-2xl border bg-card p-6 transition-shadow duration-300 hover:shadow-md">
                    <h3 className="text-sm font-medium text-foreground leading-snug">{tr.name}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground">{tr.style}</p>
                    <div className="mt-4 flex items-center gap-2">
                      {tr.complete && (
                        <span className="flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-olive">
                          <Check className="h-3 w-3" /> Complete
                        </span>
                      )}
                      {tr.audio && (
                        <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-warm">Audio</span>
                      )}
                    </div>
                    <div className="mt-5 flex gap-2.5">
                      <Button variant="outline" size="sm" className="flex-1">Read</Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Translations;