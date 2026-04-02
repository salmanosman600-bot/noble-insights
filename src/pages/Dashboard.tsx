import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Heart, Clock, Star, Settings } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">My Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your personal Quran reading space</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Continue Reading */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <BookOpen className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Continue Reading</h3>
            </div>
            <div className="mt-5 rounded-xl bg-secondary p-5">
              <p className="text-sm font-medium text-foreground">Al-Kahf</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Verse 45 of 110</p>
              <div className="mt-3 h-1.5 rounded-full bg-border">
                <div className="h-1.5 w-[41%] rounded-full bg-warm transition-all" />
              </div>
            </div>
            <Link to="/quran?surah=18">
              <Button variant="outline" size="sm" className="mt-4 w-full">Resume Reading</Button>
            </Link>
          </div>

          {/* Reading Streak */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <Star className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Reading Streak</h3>
            </div>
            <div className="mt-5 text-center">
              <span className="text-5xl font-bold text-foreground">7</span>
              <p className="mt-1 text-xs text-muted-foreground">days in a row</p>
            </div>
            <div className="mt-5 flex justify-center gap-1.5">
              {[1,2,3,4,5,6,7].map(d => (
                <div key={d} className="flex h-9 w-9 items-center justify-center rounded-xl bg-warm/10 text-xs font-semibold text-warm">
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarks */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <Bookmark className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Bookmarks</h3>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { surah: 'Al-Baqarah', verse: '255', name: 'Ayat al-Kursi' },
                { surah: 'Al-Mulk', verse: '1', name: 'Opening verse' },
                { surah: 'Ar-Rahman', verse: '13', name: 'Which favors...' },
              ].map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-secondary p-4">
                  <div>
                    <p className="text-xs font-medium text-foreground">{b.surah} : {b.verse}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{b.name}</p>
                  </div>
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Favorites */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <Heart className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Favorite Reciters</h3>
            </div>
            <div className="mt-5 space-y-2.5">
              {['Mishary Rashid Alafasy', 'Abdul Rahman Al-Sudais'].map(name => (
                <div key={name} className="rounded-xl bg-secondary p-4 text-xs font-medium text-foreground">{name}</div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <Clock className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { text: 'Read Al-Fatihah', time: '2 hours ago' },
                { text: 'Bookmarked Ayat al-Kursi', time: 'Yesterday' },
                { text: 'Listened to Surah Yasin', time: '3 days ago' },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{a.text}</span>
                  <span className="text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <Settings className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Preferences</h3>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Translation', value: 'Sahih International' },
                { label: 'Reciter', value: 'Mishary Alafasy' },
                { label: 'Arabic Font Size', value: '28px' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{p.label}</span>
                  <span className="font-medium text-foreground">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;