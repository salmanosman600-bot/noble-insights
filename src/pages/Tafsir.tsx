'use client';

import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const tafsirs = [
  { id: 1, name: 'Tafsir Ibn Kathir', author: 'Ibn Kathir (d. 774 AH)', language: 'Arab / Ingliz', style: "Klassik, To'liq", detailed: true, description: "Sahobalar hadislari va rivoyatlariga asoslangan, eng obro'li va keng qo'llaniladigan tafsirlardan biri." },
  { id: 2, name: 'Tafsir al-Jalalayn', author: 'al-Mahalli & al-Suyuti', language: 'Arab', style: 'Qisqa', detailed: false, description: "Har bir oyatni tezda ma'lumotnoma va tushunish uchun ideal bo'lgan qisqa, ammo to'liq sharh." },
  { id: 3, name: "Tafsir al-Sa'di", author: "Abdur-Rahman al-Sa'di", language: 'Arab / Ingliz', style: 'Zamonaviy, Qulay', detailed: true, description: "Ma'nolar va amaliy ko'rsatmalarga e'tibor qaratgan holda oydinligi va tushunarliligi bilan mashhur." },
  { id: 4, name: "Ma'ariful Quran", author: 'Mufti Muhammad Shafi', language: 'Urdu / Ingliz', style: 'Ilmiy, Amaliy', detailed: true, description: "Klassik ilm bilan zamonaviy dolzarblik va Hanafiy fiqhini birlashtiruvchi 8 jildlik asar." },
  { id: 5, name: 'Fi Zilal al-Quran', author: 'Sayyid Qutb', language: 'Arab', style: 'Adabiy, Fikrlovchi', detailed: true, description: "Har bir parchaning ma'naviy va ijtimoiy o'lchamlarini o'rganuvchi, chuqur shaxsiy va adabiy asar." },
  { id: 6, name: 'Tafsir al-Tabari', author: 'Ibn Jarir al-Tabari (d. 310 AH)', language: 'Arab', style: "Hadisga asoslangan, Ensiklopedik", detailed: true, description: "Keng rivoyat zanjirlarini va olimlik fikrlarini saqlovchi eng qadimgi to'liq tafsir." },
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
          <h1 className="text-foreground">Tafsir Kutubxonasi</h1>
          <p className="mt-2 text-sm text-muted-foreground">Klassik va zamonaviy olimlardan Qur'onning chuqur sharhi va tafsiri</p>
        </div>

        <div className="mb-10 flex items-center gap-3 rounded-2xl border bg-card px-5 py-3 max-w-md">
          <Search className="h-[18px] w-[18px] text-muted-foreground" />
          <input
            type="text" placeholder="Tafsirni nom yoki muallif bo'yicha qidiring…"
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
                  <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t.detailed ? 'Batafsil' : 'Qisqa'}</span>
                </div>
                <Button variant="outline" size="sm" className="mt-5 w-full">Tafsirni O'qish</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tafsir;