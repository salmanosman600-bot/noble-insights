import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const topics = [
  { id: 'patience', nameAr: 'الصبر', nameEn: 'Patience', verses: 90 },
  { id: 'mercy', nameAr: 'الرحمة', nameEn: 'Mercy', verses: 114 },
  { id: 'tawhid', nameAr: 'التوحيد', nameEn: 'Monotheism', verses: 200 },
  { id: 'dua', nameAr: 'الدعاء', nameEn: 'Supplication', verses: 65 },
  { id: 'paradise', nameAr: 'الجنة', nameEn: 'Paradise', verses: 70 },
  { id: 'repentance', nameAr: 'التوبة', nameEn: 'Repentance', verses: 48 },
  { id: 'family', nameAr: 'الأسرة', nameEn: 'Family', verses: 35 },
  { id: 'knowledge', nameAr: 'العلم', nameEn: 'Knowledge', verses: 55 },
  { id: 'gratitude', nameAr: 'الشكر', nameEn: 'Gratitude', verses: 42 },
  { id: 'justice', nameAr: 'العدل', nameEn: 'Justice', verses: 38 },
  { id: 'charity', nameAr: 'الصدقة', nameEn: 'Charity', verses: 30 },
  { id: 'prophets', nameAr: 'الأنبياء', nameEn: 'Prophets', verses: 150 },
];

const Topics = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Quran by Topics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Discover Quranic verses organized by theme</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topics.map(topic => (
            <Link
              key={topic.id}
              to={`/topics/${topic.id}`}
              className="group rounded-xl border bg-card p-6 text-center transition-all hover:shadow-md"
            >
              <p className="font-arabic text-2xl text-warm">{topic.nameAr}</p>
              <h3 className="mt-2 text-sm font-medium text-foreground">{topic.nameEn}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{topic.verses} related verses</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Topics;
