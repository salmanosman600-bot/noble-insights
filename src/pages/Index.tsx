import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Languages, Headphones, BookMarked, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { surahs } from '@/data/surahs';
import { dailyVerse, featuredVerses } from '@/data/verses';

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const Index = () => {
  const featuredSurahs = [surahs[0], surahs[35], surahs[17], surahs[54], surahs[66], surahs[111]];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-contrast">
        <div className="container relative z-10 py-24 text-center lg:py-32">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0}>
            <span className="font-arabic text-3xl text-warm">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
          </motion.div>
          <motion.h1
            className="mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
            initial="hidden" animate="visible" variants={fadeIn} custom={1}
          >
            A refined digital experience for the Noble Quran
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-xl text-base text-muted-foreground"
            initial="hidden" animate="visible" variants={fadeIn} custom={2}
          >
            Access Quran, translations, tafsir, recitations, and beneficial Islamic knowledge — all in one calm, beautiful platform.
          </motion.p>

          {/* Search */}
          <motion.div
            className="mx-auto mt-8 max-w-lg"
            initial="hidden" animate="visible" variants={fadeIn} custom={3}
          >
            <Link to="/search" className="flex items-center gap-3 rounded-xl border bg-card px-5 py-3.5 shadow-sm transition-shadow hover:shadow-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search the Quran, translations, tafsir…</span>
            </Link>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial="hidden" animate="visible" variants={fadeIn} custom={4}
          >
            <Link to="/quran"><Button variant="hero" size="lg"><BookOpen className="h-4 w-4" /> Read Quran</Button></Link>
            <Link to="/translations"><Button variant="hero-outline" size="lg"><Languages className="h-4 w-4" /> Translations</Button></Link>
            <Link to="/audio"><Button variant="outline" size="lg"><Headphones className="h-4 w-4" /> Listen</Button></Link>
            <Link to="/tafsir"><Button variant="outline" size="lg"><BookMarked className="h-4 w-4" /> Tafsir</Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Verse of the Day */}
      <section className="container py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Star className="h-4 w-4 text-warm" />
            <span className="text-xs font-medium uppercase tracking-wider text-warm">Verse of the Day</span>
          </div>
          <p className="font-arabic text-2xl leading-loose text-foreground md:text-3xl">{dailyVerse.arabic}</p>
          <p className="mt-4 text-sm text-muted-foreground italic">{dailyVerse.translation}</p>
          <p className="mt-2 text-xs text-muted-foreground">— Surah Al-Baqarah, 2:286</p>
        </div>
      </section>

      {/* Featured Surahs */}
      <section className="bg-surface-contrast">
        <div className="container py-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Featured Surahs</h2>
              <p className="mt-1 text-sm text-muted-foreground">Begin your journey with these beloved chapters</p>
            </div>
            <Link to="/surahs" className="hidden items-center gap-1 text-sm font-medium text-warm hover:underline sm:flex">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSurahs.map((surah, i) => (
              <motion.div
                key={surah.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeIn} custom={i}
              >
                <Link
                  to={`/quran?surah=${surah.id}`}
                  className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-muted-foreground">
                    {surah.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">{surah.transliteration}</span>
                      <span className="font-arabic text-base text-warm">{surah.name}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{surah.translation}</span>
                      <span>·</span>
                      <span>{surah.totalVerses} verses</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Reflections */}
      <section className="container py-16">
        <h2 className="text-xl font-semibold text-foreground">Reflections & Reminders</h2>
        <p className="mt-1 text-sm text-muted-foreground">Powerful verses for contemplation</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredVerses.map((verse, i) => (
            <motion.div
              key={verse.id}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn} custom={i}
            >
              <p className="font-arabic text-lg leading-loose text-foreground">{verse.arabic}</p>
              <p className="mt-3 text-sm text-muted-foreground italic">{verse.translation}</p>
              <p className="mt-2 text-xs text-warm">
                Surah {surahs[verse.surahId - 1]?.transliteration}, {verse.surahId}:{verse.verseNumber}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="bg-surface-contrast">
        <div className="container py-16">
          <h2 className="text-xl font-semibold text-foreground">Explore</h2>
          <p className="mt-1 text-sm text-muted-foreground">Discover the depth of the Quran</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: 'Read Quran', desc: 'Beautiful verse-by-verse reading experience', path: '/quran' },
              { icon: Languages, title: 'Translations', desc: 'Multiple languages and scholarly translations', path: '/translations' },
              { icon: BookMarked, title: 'Tafsir', desc: 'In-depth commentary and explanation', path: '/tafsir' },
              { icon: Headphones, title: 'Recitations', desc: 'Listen to beautiful Quran recitations', path: '/audio' },
            ].map((item, i) => (
              <motion.div
                key={item.path}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeIn} custom={i}
              >
                <Link
                  to={item.path}
                  className="group flex flex-col items-start rounded-xl border bg-card p-6 transition-all hover:shadow-md"
                >
                  <item.icon className="h-6 w-6 text-warm" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground">Stay Connected</h2>
          <p className="mt-2 text-sm text-muted-foreground">Receive a daily verse and beneficial reminders in your inbox.</p>
          <div className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="warm">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
