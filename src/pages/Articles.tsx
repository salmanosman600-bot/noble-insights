import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const articles = [
  { id: 1, title: 'Introduction to Surah Al-Kahf', category: 'Surah Introductions', excerpt: 'Discover the themes, context, and virtues of Surah Al-Kahf — one of the most beloved chapters recited every Friday.', readTime: '5 min' },
  { id: 2, title: 'The Power of Istighfar in the Quran', category: 'Reflections', excerpt: 'Exploring the concept of seeking forgiveness and its transformative power as described in the Quran.', readTime: '4 min' },
  { id: 3, title: 'A Beginner\'s Guide to Reading the Quran', category: 'Guides', excerpt: 'Practical steps and tips for those beginning their journey with the Book of Allah.', readTime: '7 min' },
  { id: 4, title: '30-Day Quran Reading Plan', category: 'Reading Plans', excerpt: 'A structured plan to complete the entire Quran in one month with daily assignments and reflections.', readTime: '3 min' },
  { id: 5, title: 'Understanding Makki and Madani Surahs', category: 'Knowledge', excerpt: 'Learn the differences between Makki and Madani surahs and why this distinction matters.', readTime: '6 min' },
  { id: 6, title: 'The Names and Attributes of Allah in the Quran', category: 'Reflections', excerpt: 'A deep dive into how the Quran introduces us to the beautiful names and attributes of our Creator.', readTime: '8 min' },
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
};

const Articles = () => {
  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Articles & Knowledge</h1>
          <p className="mt-2 text-sm text-muted-foreground">Beneficial readings, guides, and Quranic reflections</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div key={article.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <Link to="#" className="group flex h-full flex-col rounded-2xl border bg-card p-7 transition-all duration-300 hover:shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-warm">{article.category}</span>
                <h3 className="mt-3 text-[15px] font-semibold text-foreground leading-snug group-hover:text-warm transition-colors duration-200">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.readTime} read</span>
                  <ArrowRight className="h-3.5 w-3.5 text-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Articles;