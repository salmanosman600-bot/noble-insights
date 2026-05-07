'use client';

import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const topics = [
  { id: 'patience', nameAr: 'الصبر', nameEn: 'Sabr', verses: 90, color: 'bg-warm/5' },
  { id: 'mercy', nameAr: 'الرحمة', nameEn: 'Rahmat', verses: 114, color: 'bg-warm/5' },
  { id: 'tawhid', nameAr: 'التوحيد', nameEn: 'Tavhid', verses: 200, color: 'bg-warm/5' },
  { id: 'dua', nameAr: 'الدعاء', nameEn: 'Dua', verses: 65, color: 'bg-warm/5' },
  { id: 'paradise', nameAr: 'الجنة', nameEn: 'Jannat', verses: 70, color: 'bg-warm/5' },
  { id: 'repentance', nameAr: 'التوبة', nameEn: 'Tavba', verses: 48, color: 'bg-warm/5' },
  { id: 'family', nameAr: 'الأسرة', nameEn: 'Oila', verses: 35, color: 'bg-warm/5' },
  { id: 'knowledge', nameAr: 'العلم', nameEn: 'Ilm', verses: 55, color: 'bg-warm/5' },
  { id: 'gratitude', nameAr: 'الشكر', nameEn: 'Shukur', verses: 42, color: 'bg-warm/5' },
  { id: 'justice', nameAr: 'العدل', nameEn: 'Adolat', verses: 38, color: 'bg-warm/5' },
  { id: 'charity', nameAr: 'الصدقة', nameEn: 'Sadaqa', verses: 30, color: 'bg-warm/5' },
  { id: 'prophets', nameAr: 'الأنبياء', nameEn: "Payg'ambarlar", verses: 150, color: 'bg-warm/5' },
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: 'easeOut' },
  }),
};

const Topics = ({ topicId }: { topicId?: string }) => {
  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Mavzular bo'yicha Qur'on</h1>
          <p className="mt-2 text-sm text-muted-foreground">Mavzu va mavzu bo'yicha tartibga solingan Qur'on oyatlarini kashf eting</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topics.map((topic, i) => (
            <motion.div key={topic.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <Link
                href={`/topics/${topic.id}`}
                className="group flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition-all duration-300 hover:shadow-md"
              >
                <p className="font-arabic text-3xl leading-relaxed text-warm">{topic.nameAr}</p>
                <div className="ornament-line my-4 w-12" />
                <h3 className="text-sm font-medium text-foreground">{topic.nameEn}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{topic.verses} ta aloqador oyat</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Topics;