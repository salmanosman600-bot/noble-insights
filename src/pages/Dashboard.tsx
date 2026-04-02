import { Bookmark, BookOpen, Heart, Clock, Star, Settings } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">My Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your personal Quran reading space</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Continue Reading */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 text-warm">
              <BookOpen className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Continue Reading</h3>
            </div>
            <div className="mt-4 rounded-lg bg-secondary p-4">
              <p className="text-sm font-medium text-foreground">Al-Kahf</p>
              <p className="text-xs text-muted-foreground">Verse 45 of 110</p>
              <div className="mt-2 h-1.5 rounded-full bg-border">
                <div className="h-1.5 w-[41%] rounded-full bg-warm" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">Resume Reading</Button>
          </div>

          {/* Reading Streak */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 text-warm">
              <Star className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Reading Streak</h3>
            </div>
            <div className="mt-4 text-center">
              <span className="text-4xl font-bold text-foreground">7</span>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </div>
            <div className="mt-4 flex justify-center gap-1">
              {[1,2,3,4,5,6,7].map(d => (
                <div key={d} className="h-8 w-8 rounded-md bg-warm/20 flex items-center justify-center text-xs font-medium text-warm">
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarks */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 text-warm">
              <Bookmark className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Bookmarks</h3>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { surah: 'Al-Baqarah', verse: '255', name: 'Ayat al-Kursi' },
                { surah: 'Al-Mulk', verse: '1', name: 'Opening verse' },
                { surah: 'Ar-Rahman', verse: '13', name: 'Which favors...' },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">{b.surah} : {b.verse}</p>
                    <p className="text-xs text-muted-foreground">{b.name}</p>
                  </div>
                  <BookOpen className="h-3 w-3 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Favorites */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 text-warm">
              <Heart className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Favorite Reciters</h3>
            </div>
            <div className="mt-4 space-y-2">
              {['Mishary Rashid Alafasy', 'Abdul Rahman Al-Sudais'].map(name => (
                <div key={name} className="rounded-lg bg-secondary p-3 text-xs font-medium text-foreground">{name}</div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 text-warm">
              <Clock className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>Read Al-Fatihah — 2 hours ago</p>
              <p>Bookmarked Ayat al-Kursi — Yesterday</p>
              <p>Listened to Surah Yasin — 3 days ago</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-2 text-warm">
              <Settings className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Preferences</h3>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Translation</span>
                <span className="text-foreground">Sahih International</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Reciter</span>
                <span className="text-foreground">Mishary Alafasy</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Arabic Font Size</span>
                <span className="text-foreground">28px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
