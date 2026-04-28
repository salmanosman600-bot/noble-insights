'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, Languages, Headphones, BookMarked, ArrowRight, Star, Sparkles, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { surahs } from '@/data/surahs';
import { dailyVerse, featuredVerses } from '@/data/verses';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Index = () => {
  const featuredSurahs = [surahs[0], surahs[35], surahs[17], surahs[54], surahs[66], surahs[111]];

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-contrast via-background to-background" />
        <div className="container relative z-10 py-28 text-center lg:py-40">
          <motion.p
            className="font-arabic text-3xl text-warm md:text-4xl"
            initial="hidden" animate="visible" variants={fade} custom={0}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </motion.p>

          <motion.h1
            className="mx-auto mt-8 max-w-2xl text-balance text-foreground"
            initial="hidden" animate="visible" variants={fade} custom={1}
          >
            A refined digital experience for the Noble Quran
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground text-pretty"
            initial="hidden" animate="visible" variants={fade} custom={2}
          >
            Access Quran, translations, tafsir, recitations, and beneficial Islamic knowledge — all in one calm, beautiful platform.
          </motion.p>

          {/* Search */}
          <motion.div className="mx-auto mt-10 max-w-lg" initial="hidden" animate="visible" variants={fade} custom={3}>
            <Link href="/search" className="flex items-center gap-3.5 rounded-2xl border bg-card px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-warm/30">
              <Search className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search the Quran, translations, tafsir…</span>
            </Link>
          </motion.div>

          {/* CTAs */}
          <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-3" initial="hidden" animate="visible" variants={fade} custom={4}>
            <Link href="/quran"><Button variant="hero" size="lg"><BookOpen className="h-4 w-4" /> Read Quran</Button></Link>
            <Link href="/translations"><Button variant="hero-outline" size="lg"><Languages className="h-4 w-4" /> Translations</Button></Link>
            <Link href="/audio"><Button variant="outline" size="lg"><Headphones className="h-4 w-4" /> Listen</Button></Link>
            <Link href="/tafsir"><Button variant="outline" size="lg"><BookMarked className="h-4 w-4" /> Tafsir</Button></Link>
          </motion.div>
        </div>
      </section>

      {/* ── Verse of the Day ── */}
      <section className="container section-padding">
        <motion.div
          className="mx-auto max-w-2xl rounded-3xl border bg-card p-10 text-center md:p-14"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}
        >
          <div className="mb-5 flex items-center justify-center gap-2.5">
            <Star className="h-4 w-4 text-warm" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-warm">Verse of the Day</span>
          </div>
          <p className="font-arabic text-2xl leading-[2.2] text-foreground md:text-3xl">{dailyVerse.arabic}</p>
          <div className="ornament-line mx-auto mt-6 mb-5 max-w-[120px]" />
          <p className="text-sm leading-relaxed text-muted-foreground italic">{dailyVerse.translation}</p>
          <p className="mt-3 text-xs text-muted-foreground/70">— Surah Al-Baqarah, 2:286</p>
        </motion.div>
      </section>

      {/* ── Featured Surahs ── */}
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-foreground">Featured Surahs</h2>
              <p className="mt-2 text-sm text-muted-foreground">Begin your journey with these beloved chapters</p>
            </div>
            <Link href="/surahs" className="hidden items-center gap-1.5 text-sm font-medium text-warm hover:text-warm/80 transition-colors sm:flex">
              View All 114 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSurahs.map((surah, i) => (
              <motion.div key={surah.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
                <Link
                  href={`/quran?surah=${surah.id}`}
                  className="group flex items-center gap-5 rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-muted-foreground">
                    {surah.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-foreground">{surah.transliteration}</span>
                      <span className="font-arabic text-base text-warm">{surah.name}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{surah.translation}</span>
                      <span className="text-border">·</span>
                      <span>{surah.totalVerses} verses</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Continue Reading ── */}
      <section className="container section-padding">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-foreground">Continue Reading</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pick up where you left off</p>
          </div>
        </div>
        <motion.div
          className="mt-10 rounded-2xl border bg-card p-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <BookOpen className="h-6 w-6 text-warm" />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground">Surah Al-Kahf</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">Verse 45 of 110</p>
                <div className="mt-2.5 h-1.5 w-48 rounded-full bg-secondary">
                  <div className="h-1.5 w-[41%] rounded-full bg-warm transition-all" />
                </div>
              </div>
            </div>
            <Link href="/quran?surah=18">
              <Button variant="warm">Resume Reading</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Reflections ── */}
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-foreground">Reflections & Reminders</h2>
              <p className="mt-2 text-sm text-muted-foreground">Powerful verses for contemplation</p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredVerses.map((verse, i) => (
              <motion.div
                key={verse.id}
                className="rounded-2xl border bg-card p-8 transition-shadow duration-300 hover:shadow-md"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}
              >
                <p className="font-arabic text-lg leading-[2.2] text-foreground">{verse.arabic}</p>
                <div className="ornament-line my-5" />
                <p className="text-sm leading-relaxed text-muted-foreground italic">{verse.translation}</p>
                <p className="mt-3 text-xs text-warm">
                  Surah {surahs[verse.surahId - 1]?.transliteration}, {verse.surahId}:{verse.verseNumber}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Grid ── */}
      <section className="container section-padding">
        <h2 className="text-foreground">Explore</h2>
        <p className="mt-2 text-sm text-muted-foreground">Discover the depth of the Quran</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: 'Read Quran', desc: 'Beautiful verse-by-verse reading experience with multiple translations', path: '/quran' },
            { icon: Languages, title: 'Translations', desc: 'Scholarly translations across many languages and styles', path: '/translations' },
            { icon: BookMarked, title: 'Tafsir', desc: 'In-depth commentary and explanation from classical scholars', path: '/tafsir' },
            { icon: Headphones, title: 'Recitations', desc: 'Listen to beautiful Quran recitations by world-renowned reciters', path: '/audio' },
          ].map((item, i) => (
            <motion.div key={item.path} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <Link href={item.path} className="group flex flex-col items-start rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <item.icon className="h-5 w-5 text-warm" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-medium text-warm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-foreground">Quran by Topics</h2>
              <p className="mt-2 text-sm text-muted-foreground">Discover verses organized by theme</p>
            </div>
            <Link href="/topics" className="hidden items-center gap-1.5 text-sm font-medium text-warm hover:text-warm/80 transition-colors sm:flex">
              All Topics <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { ar: 'الصبر', en: 'Patience' },
              { ar: 'الرحمة', en: 'Mercy' },
              { ar: 'التوحيد', en: 'Monotheism' },
              { ar: 'الدعاء', en: 'Supplication' },
              { ar: 'الجنة', en: 'Paradise' },
              { ar: 'التوبة', en: 'Repentance' },
              { ar: 'العلم', en: 'Knowledge' },
              { ar: 'الشكر', en: 'Gratitude' },
            ].map((topic) => (
              <Link
                key={topic.en}
                href={`/topics/${topic.en.toLowerCase()}`}
                className="flex items-center gap-3 rounded-2xl border bg-card px-6 py-4 transition-all duration-300 hover:shadow-md"
              >
                <span className="font-arabic text-lg text-warm">{topic.ar}</span>
                <span className="text-sm font-medium text-foreground">{topic.en}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download / Resources ── */}
      <section className="container section-padding">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div className="rounded-2xl border bg-card p-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Download className="h-5 w-5 text-warm" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Download Resources</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Access downloadable PDFs of Quran translations, tafsir books, and reading guides for offline study.</p>
            <Button variant="outline" className="mt-6">Browse Downloads</Button>
          </motion.div>
          <motion.div className="rounded-2xl border bg-card p-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={1}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Smartphone className="h-5 w-5 text-warm" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">Mobile App</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Take Noor with you everywhere. A calm, focused Quran reading experience designed for mobile.</p>
            <Button variant="outline" className="mt-6">Coming Soon</Button>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <motion.div
            className="mx-auto max-w-lg rounded-3xl border bg-card p-10 text-center md:p-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}
          >
            <Sparkles className="mx-auto h-5 w-5 text-warm" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">Stay Connected</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Receive a daily verse and beneficial reminders in your inbox.</p>
            <div className="mt-8 flex gap-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl border bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button variant="warm">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;