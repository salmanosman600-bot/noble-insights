'use client';

import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const tafsirs = [
  { id: 1, name: 'Tafsir Ibn Kathir', author: 'Ibn Kathir (d. 774 AH)', language: 'Arabic / English', style: 'Classical, Comprehensive', detailed: true, description: 'One of the most respected and widely used tafsirs, relying heavily on hadith and reports from the companions.' },
  { id: 2, name: 'Tafsir al-Jalalayn', author: 'al-Mahalli & al-Suyuti', language: 'Arabic', style: 'Concise', detailed: false, description: 'A brief yet comprehensive commentary, ideal for quick reference and understanding of each verse.' },
  { id: 3, name: 'Tafsir al-Sa\'di', author: 'Abdur-Rahman al-Sa\'di', language: 'Arabic / English', style: 'Modern, Accessible', detailed: true, description: 'Known for its clarity and ease of understanding, focusing on meanings and practical guidance.' },
  { id: 4, name: 'Ma\'ariful Quran', author: 'Mufti Muhammad Shafi', language: 'Urdu / English', style: 'Scholarly, Practical', detailed: true, description: 'An 8-volume work that combines classical scholarship with contemporary relevance and Hanafi jurisprudence.' },
  { id: 5, name: 'Fi Zilal al-Quran', author: 'Sayyid Qutb', language: 'Arabic', style: 'Literary, Reflective', detailed: true, description: 'A deeply personal and literary work, exploring the spiritual and social dimensions of each passage.' },
  { id: 6, name: 'Tafsir al-Tabari', author: 'Ibn Jarir al-Tabari (d. 310 AH)', language: 'Arabic', style: 'Hadith-based, Encyclopedic', detailed: true, description: 'The earliest comprehensive tafsir, preserving vast chains of narration and scholarly opinions.' },
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const Tafsir = () => {
  const [query, setQuery] = useState('');

  const filtered = tafsirs.filter(t =>
    !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Tafsir Library</h1>
          <p className="mt-2 text-sm text-muted-foreground">In-depth commentary and explanation of the Quran from classical and contemporary scholars</p>
        </div>

        <div className="mb-10 flex items-center gap-3 rounded-2xl border bg-card px-5 py-3 max-w-md">
          <Search className="h-[18px] w-[18px] text-muted-foreground" />
          <input
            type="text" placeholder="Search tafsir by name or author…"
            value={query} onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <motion.div key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <div className="flex h-full flex-col rounded-2xl border bg-card p-7 transition-shadow duration-300 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <BookOpen className="h-5 w-5 text-warm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{t.name}</h3>
                    <p className="mt-1 text-xs text-warm">{t.author}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-[1.7] text-muted-foreground flex-1">{t.description}</p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t.language}</span>
                  <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t.detailed ? 'Detailed' : 'Concise'}</span>
                </div>
                <Button variant="outline" size="sm" className="mt-5 w-full">Read Tafsir</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tafsir;