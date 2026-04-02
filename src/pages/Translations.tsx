import { useState } from 'react';
import { Search, Download, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const translations = [
  { id: 1, language: 'English', translators: [
    { name: 'Sahih International', style: 'Clear, Modern', complete: true, audio: true },
    { name: 'Yusuf Ali', style: 'Classic, Literary', complete: true, audio: false },
    { name: 'Pickthall', style: 'Formal, Traditional', complete: true, audio: false },
    { name: 'Dr. Mustafa Khattab (The Clear Quran)', style: 'Contemporary', complete: true, audio: true },
  ]},
  { id: 2, language: 'Urdu', translators: [
    { name: 'Fateh Muhammad Jalandhry', style: 'Classical', complete: true, audio: true },
    { name: 'Mufti Taqi Usmani', style: 'Modern', complete: true, audio: false },
  ]},
  { id: 3, language: 'French', translators: [
    { name: 'Muhammad Hamidullah', style: 'Scholarly', complete: true, audio: false },
  ]},
  { id: 4, language: 'Turkish', translators: [
    { name: 'Diyanet İşleri', style: 'Official', complete: true, audio: true },
  ]},
  { id: 5, language: 'Spanish', translators: [
    { name: 'Julio Cortés', style: 'Standard', complete: true, audio: false },
  ]},
  { id: 6, language: 'Indonesian', translators: [
    { name: 'Kementerian Agama', style: 'Official', complete: true, audio: true },
  ]},
];

const Translations = () => {
  const [query, setQuery] = useState('');

  const filtered = translations.filter(t =>
    !query || t.language.toLowerCase().includes(query.toLowerCase()) ||
    t.translators.some(tr => tr.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Translation Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">Explore Quran translations in multiple languages</p>
        </div>

        <div className="mb-8 flex items-center gap-2 rounded-lg border bg-card px-3 py-2 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text" placeholder="Search by language or translator…"
            value={query} onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="space-y-8">
          {filtered.map(lang => (
            <div key={lang.id}>
              <div className="mb-4 flex items-center gap-2">
                <Globe className="h-4 w-4 text-warm" />
                <h2 className="text-lg font-semibold text-foreground">{lang.language}</h2>
                <span className="text-xs text-muted-foreground">({lang.translators.length} translation{lang.translators.length > 1 ? 's' : ''})</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lang.translators.map(tr => (
                  <div key={tr.name} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
                    <h3 className="text-sm font-medium text-foreground">{tr.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{tr.style}</p>
                    <div className="mt-3 flex items-center gap-2">
                      {tr.complete && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-olive">Complete</span>}
                      {tr.audio && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-warm">Audio</span>}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Read</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-3 w-3" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Translations;
