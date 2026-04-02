import { Play, Download, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const reciters = [
  { id: 1, name: 'Mishary Rashid Alafasy', riwayah: 'Hafs', style: 'Melodic', surahs: 114, popular: true },
  { id: 2, name: 'Abdul Rahman Al-Sudais', riwayah: 'Hafs', style: 'Imam, Traditional', surahs: 114, popular: true },
  { id: 3, name: 'Maher Al-Muaiqly', riwayah: 'Hafs', style: 'Clear, Calm', surahs: 114, popular: true },
  { id: 4, name: 'Saad Al-Ghamdi', riwayah: 'Hafs', style: 'Powerful', surahs: 114, popular: false },
  { id: 5, name: 'Hani Ar-Rifai', riwayah: 'Hafs', style: 'Emotional', surahs: 114, popular: false },
  { id: 6, name: 'Yasser Al-Dosari', riwayah: 'Hafs', style: 'Gentle', surahs: 114, popular: true },
  { id: 7, name: 'Ahmad Al-Ajmi', riwayah: 'Hafs', style: 'Unique', surahs: 114, popular: false },
  { id: 8, name: 'Khalifa Al-Tunaiji', riwayah: 'Hafs', style: 'Tajweed-focused', surahs: 114, popular: false },
];

const Audio = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Recitations</h1>
          <p className="mt-1 text-sm text-muted-foreground">Listen to the Quran recited by world-renowned reciters</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reciters.map(r => (
            <div key={r.id} className="group rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Headphones className="h-5 w-5 text-warm" />
                </div>
                {r.popular && <span className="rounded-full bg-warm/10 px-2 py-0.5 text-xs font-medium text-warm">Popular</span>}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{r.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{r.riwayah}</span>
                <span>·</span>
                <span>{r.style}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{r.surahs} surahs available</p>
              <div className="mt-4 flex gap-2">
                <Button variant="warm" size="sm" className="flex-1 gap-1">
                  <Play className="h-3 w-3" /> Listen
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Audio;
