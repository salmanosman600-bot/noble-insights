'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const articles = [
  { id: 1, title: 'Al-Kahf Surasi haqida Kirish', category: 'Sura Kirishlari', excerpt: 'Al-Kahf surasining mavzulari, konteksti va fazilatlarini kashf eting — har juma kuni o\'qiladigan eng sevimli suralardan biri.', readTime: '5 daqiqa' },
  { id: 2, title: "Qur'onda Istig'forning Kuchi", category: 'Fikrlar', excerpt: "Qur'onda tasvirlangan tavba so'rash tushunchasi va uning o'zgartiruvchi kuchini o'rganish.", readTime: '4 daqiqa' },
  { id: 3, title: "Qur'on O'qish uchun Boshlang'ich Qo'llanma", category: "Qo'llanmalar", excerpt: "Allohning Kitobi bilan yo'lini boshlayotganlar uchun amaliy qadamlar va maslahatlar.", readTime: '7 daqiqa' },
  { id: 4, title: "30 Kunlik Qur'on O'qish Rejasi", category: "O'qish Rejalari", excerpt: "Kunlik topshiriqlar va tafakkur bilan bir oyda butun Qur'onni tugatish uchun tuzilgan reja.", readTime: '3 daqiqa' },
  { id: 5, title: 'Makki va Madaniy Suralarni Tushunish', category: 'Bilim', excerpt: "Makki va Madaniy suralar o'rtasidagi farqlarni va bu farqning nima uchun muhimligini o'rganing.", readTime: '6 daqiqa' },
  { id: 6, title: "Qur'onda Allohning Ism va Sifatlari", category: 'Fikrlar', excerpt: "Qur'on bizni Yaratuvchimizning go'zal ismlari va sifatlari bilan qanday tanishtirishi haqida chuqur o'rganish.", readTime: '8 daqiqa' },
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
          <h1 className="text-foreground">Maqolalar va Bilimlar</h1>
          <p className="mt-2 text-sm text-muted-foreground">Foydali o'qishlar, qo'llanmalar va Qur'on fikrlari</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div key={article.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i}>
              <Link href="#" className="group flex h-full flex-col rounded-2xl border bg-card p-7 transition-all duration-300 hover:shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-warm">{article.category}</span>
                <h3 className="mt-3 text-[15px] font-semibold text-foreground leading-snug group-hover:text-warm transition-colors duration-200">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground flex-1">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.readTime} o'qish</span>
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