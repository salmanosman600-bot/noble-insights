import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const tafsirs = [
  { id: 1, name: 'Tafsir Ibn Kathir', author: 'Ibn Kathir', language: 'Arabic / English', style: 'Classical, Comprehensive', detailed: true },
  { id: 2, name: 'Tafsir al-Jalalayn', author: 'al-Mahalli & al-Suyuti', language: 'Arabic', style: 'Concise', detailed: false },
  { id: 3, name: 'Tafsir al-Sa\'di', author: 'Abdur-Rahman al-Sa\'di', language: 'Arabic / English', style: 'Modern, Accessible', detailed: true },
  { id: 4, name: 'Ma\'ariful Quran', author: 'Mufti Muhammad Shafi', language: 'Urdu / English', style: 'Scholarly, Practical', detailed: true },
  { id: 5, name: 'Fi Zilal al-Quran', author: 'Sayyid Qutb', language: 'Arabic', style: 'Literary, Reflective', detailed: true },
  { id: 6, name: 'Tafsir al-Tabari', author: 'Ibn Jarir al-Tabari', language: 'Arabic', style: 'Hadith-based, Encyclopedic', detailed: true },
];

const Tafsir = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Tafsir Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">In-depth commentary and explanation of the Quran</p>
        </div>

        <div className="mb-8 flex items-center gap-2 rounded-lg border bg-card px-3 py-2 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search tafsir…" className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tafsirs.map(t => (
            <div key={t.id} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
              <p className="mt-1 text-xs text-warm">{t.author}</p>
              <p className="mt-2 text-xs text-muted-foreground">{t.style}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{t.language}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{t.detailed ? 'Detailed' : 'Concise'}</span>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">Read Tafsir</Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tafsir;
