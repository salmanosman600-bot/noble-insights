'use client';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { surahs } from '@/data/surahs';
import { dailyVerse, featuredVerses } from '@/data/verses';
import { motion } from 'framer-motion';
import { ArrowRight, BookMarked, BookOpen, Download, Headphones, Languages, Search, Smartphone, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

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
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-background to-background" />
        <div className="absolute inset-0 geo-pattern" />
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-3xl animate-pulse-glow" />
        <div className="pointer-events-none absolute top-32 -left-48 h-72 w-72 rounded-full bg-warm/[0.10] blur-3xl" />
        <div className="pointer-events-none absolute top-48 -right-48 h-72 w-72 rounded-full bg-primary/[0.07] blur-3xl" />

        <div className="container relative z-10 py-28 text-center lg:py-44">
          {/* Eyebrow badge */}
          <motion.div
            className="mx-auto mb-10 flex w-fit items-center gap-3"
            initial="hidden" animate="visible" variants={fade} custom={0}
          >
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-warm/60" />
            <span className="section-eyebrow">Qur'oni Karim Platformasi</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-warm/60" />
          </motion.div>

          {/* Bismillah */}
          <motion.p
            className="font-quran text-5xl text-primary md:text-6xl"
            style={{ lineHeight: 1.9 }}
            initial="hidden" animate="visible" variants={fade} custom={1}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </motion.p>

          <motion.h1
            className="mx-auto mt-7 max-w-2xl text-balance text-foreground"
            initial="hidden" animate="visible" variants={fade} custom={2}
          >
            Qur'oni Karim uchun nozik raqamli tajriba
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground text-pretty"
            initial="hidden" animate="visible" variants={fade} custom={3}
          >
            Qur'on, tarjimalar, tafsir, qiroatlar va foydali islomiy bilimlar — hammasini bir sokin, go'zal platformada toping.
          </motion.p>

          {/* Search */}
          <motion.div className="mx-auto mt-10 max-w-lg" initial="hidden" animate="visible" variants={fade} custom={4}>
            <Link href="/search" className="flex items-center gap-3.5 rounded-2xl border border-primary/15 bg-card px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:bg-card">
              <Search className="h-[18px] w-[18px] text-warm" />
              <span className="text-sm text-muted-foreground">Qur'on, tarjimalar, tafsirni qidiring…</span>
            </Link>
          </motion.div>

          {/* CTAs */}
          <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-3" initial="hidden" animate="visible" variants={fade} custom={5}>
            <Link href="/quran"><Button variant="hero" size="lg"><BookOpen className="h-4 w-4" /> Qur'on o'qish</Button></Link>
            {/*
            <Link href="/translations"><Button variant="hero-outline" size="lg"><Languages className="h-4 w-4" /> Tarjimalar</Button></Link>
            <Link href="/audio"><Button variant="outline" size="lg"><Headphones className="h-4 w-4" /> Tinglash</Button></Link>
            <Link href="/tafsir"><Button variant="outline" size="lg"><BookMarked className="h-4 w-4" /> Tafsir</Button></Link>
            */}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="mt-14 flex items-center justify-center gap-6 text-[13px] text-muted-foreground"
            initial="hidden" animate="visible" variants={fade} custom={6}
          >
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary/50" />114 Sura</span>
            <span className="text-border">·</span>
            <span>6 236 Oyat</span>
            <span className="text-border">·</span>
            <span>30 Juz</span>
          </motion.div>
        </div>
      </section>

      {/* ── Verse of the Day ── */}
      <section className="container section-padding">
        <motion.div
          className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-primary/15 bg-card p-10 text-center shadow-sm md:p-14"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}
        >
          {/* Soft glow bg */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-warm/[0.04]" />
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-center gap-2.5">
              <Star className="h-4 w-4 text-warm" />
              <span className="section-eyebrow">Kunning Oyati</span>
              <Star className="h-4 w-4 text-warm" />
            </div>
            <p className="font-quran text-2xl text-foreground md:text-3xl" style={{ lineHeight: 2.2 }}>{dailyVerse.arabic}</p>
            <div className="ornament-line mx-auto mt-6 mb-5 max-w-[120px]" />
            <p className="text-sm leading-relaxed text-muted-foreground italic">{dailyVerse.translation}</p>
            <p className="mt-3 text-xs text-warm/80 font-medium">— Baqara surasi, 2:286</p>
          </div>
        </motion.div>
      </section>

      {/* ── Featured Surahs ── */}
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow mb-2">Qur'on</p>
              <h2 className="text-foreground">Taniqli Suralar</h2>
              <p className="mt-2 text-sm text-muted-foreground">Bu sevimli suralar bilan yo'lingizni boshlang</p>
            </div>
            <Link href="/surahs" className="hidden items-center gap-1.5 text-sm font-medium text-warm hover:text-warm/80 transition-colors sm:flex">
              Barcha 114 ni ko'rish <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSurahs.map((surah, i) => (
              <motion.div key={surah.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
                <Link
                  href={`/quran?surah=${surah.id}`}
                  className="group flex items-center gap-5 rounded-2xl border border-transparent bg-card p-6 transition-all duration-300 hover:shadow-md hover:border-primary/15 hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                    {surah.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-foreground">{surah.transliteration}</span>
                      <span className="font-quran text-base text-warm">{surah.name}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{surah.translation}</span>
                      <span className="text-border">·</span>
                      <span>{surah.totalVerses} oyat</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Continue Reading ── */}
      {/*
      <section className="container section-padding">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-foreground">O'qishni Davom Ettirish</h2>
            <p className="mt-2 text-sm text-muted-foreground">To'xtatgan joyingizdan davom eting</p>
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
                <h3 className="text-base font-medium text-foreground">Al-Kahf Surasi</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">110 dan 45-oyat</p>
                <div className="mt-2.5 h-1.5 w-48 rounded-full bg-secondary">
                  <div className="h-1.5 w-[41%] rounded-full bg-warm transition-all" />
                </div>
              </div>
            </div>
            <Link href="/quran?surah=18">
              <Button variant="warm">O'qishni Davom Ettirish</Button>
            </Link>
          </div>
        </motion.div>
      </section>
      */}

      {/* ── Reflections ── */}
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow mb-2">Tafakkur</p>
              <h2 className="text-foreground">Fikrlar va Eslatmalar</h2>
              <p className="mt-2 text-sm text-muted-foreground">Tafakkur uchun kuchli oyatlar</p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredVerses.map((verse, i) => (
              <motion.div
                key={verse.id}
                className="rounded-2xl border border-transparent bg-card p-8 transition-all duration-300 hover:shadow-md hover:border-primary/15 hover:-translate-y-0.5"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}
              >
                <p className="font-quran text-lg text-foreground" style={{ lineHeight: 2.2 }}>{verse.arabic}</p>
                <div className="ornament-line my-5" />
                <p className="text-sm leading-relaxed text-muted-foreground italic">{verse.translation}</p>
                <p className="mt-3 text-xs font-medium text-warm">
                  Sura {surahs[verse.surahId - 1]?.transliteration}, {verse.surahId}:{verse.verseNumber}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Grid ── */}
      {/*
      <section className="container section-padding">
        <p className="section-eyebrow mb-2">Imkoniyatlar</p>
        <h2 className="text-foreground">Ko'rish</h2>
        <p className="mt-2 text-sm text-muted-foreground">Qur'onning chuqurligini kashf eting</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: "Qur'on o'qish", desc: "Ko'p tarjimali oyat-oyat o'qish tajribasi", path: '/quran' },
            { icon: Languages, title: 'Tarjimalar', desc: "Ko'p tillar va usullardagi ilmiy tarjimalar", path: '/translations' },
            { icon: BookMarked, title: 'Tafsir', desc: "Klassik olimlardan chuqur sharh va tafsir", path: '/tafsir' },
            { icon: Headphones, title: 'Qiroatlar', desc: "Dunyoga mashhur qori tomonidan go'zal Qur'on qiroatlarini tinglang", path: '/audio' },
          ].map((item, i) => (
            <motion.div key={item.path} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <Link href={item.path} className="group flex flex-col items-start rounded-2xl border border-transparent bg-card p-8 transition-all duration-300 hover:shadow-md hover:border-primary/15 hover:-translate-y-0.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-medium text-warm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Ko'rish <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      */}

      {/* ── Topics ── */}
      {/*
      <section className="bg-surface-contrast">
        <div className="container section-padding">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow mb-2">Mavzuli</p>
              <h2 className="text-foreground">Mavzular bo'yicha Qur'on</h2>
              <p className="mt-2 text-sm text-muted-foreground">Mavzu bo'yicha tartibga solingan oyatlarni kashf eting</p>
            </div>
            <Link href="/topics">Barcha Mavzular</Link>
          </div>
          ...
        </div>
      </section>
      */}

      {/* ── Download / Resources ── */}
      {/*
      <section className="container section-padding">
        ...
      </section>
      */}

      {/* ── Newsletter ── */}
      {/*
      <section className="bg-surface-contrast">
        ...
      </section>
      */}
    </Layout>
  );
};

export default Index;

