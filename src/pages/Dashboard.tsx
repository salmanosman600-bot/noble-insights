'use client';

import Link from 'next/link';
import { Bookmark, BookOpen, Heart, Clock, Star, Settings } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container page-padding">
        <div className="mb-10">
          <h1 className="text-foreground">Mening Kabinetim</h1>
          <p className="mt-2 text-sm text-muted-foreground">Shaxsiy Qur'on o'qish maydonchangiz</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Continue Reading */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <BookOpen className="h-4 w-4" />
              <h3 className="text-sm font-semibold">O'qishni Davom Ettirish</h3>
            </div>
            <div className="mt-5 rounded-xl bg-secondary p-5">
              <p className="text-sm font-medium text-foreground">Al-Kahf</p>
              <p className="mt-0.5 text-xs text-muted-foreground">110 dan 45-oyat</p>
              <div className="mt-3 h-1.5 rounded-full bg-border">
                <div className="h-1.5 w-[41%] rounded-full bg-warm transition-all" />
              </div>
            </div>
            <Link href="/quran?surah=18">
              <Button variant="outline" size="sm" className="mt-4 w-full">O'qishni Davom Ettirish</Button>
            </Link>
          </div>

          {/* Reading Streak */}
          <div className="rounded-2xl border bg-card p-7">
            <div className="flex items-center gap-2.5 text-warm">
              <Star className="h-4 w-4" />
              <h3 className="text-sm font-semibold">O'qish Seriyasi</h3>
            </div>
            <div className="mt-5 text-center">
              <span className="text-5xl font-bold text-foreground">7</span>
              <p className="mt-1 text-xs text-muted-foreground">kun ketma-ket</p>
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
              <h3 className="text-sm font-semibold">Xatcho'plar</h3>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { surah: 'Al-Baqarah', verse: '255', name: 'Oyat ul-Kursi' },
                { surah: 'Al-Mulk', verse: '1', name: 'Ochilish oyati' },
                { surah: 'Ar-Rahman', verse: '13', name: "Qaysi ne'matlar..." },
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
              <h3 className="text-sm font-semibold">Sevimli Qorilar</h3>
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
              <h3 className="text-sm font-semibold">So'nggi Faoliyat</h3>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { text: 'Al-Fotiha O\'qildi', time: '2 soat oldin' },
                { text: 'Oyat ul-Kursi Xatcho\'p Qilindi', time: 'Kecha' },
                { text: 'Yasin Surasi Tinglandi', time: '3 kun oldin' },
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
              <h3 className="text-sm font-semibold">Sozlamalar</h3>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Tarjima', value: 'Sahih International' },
                { label: 'Qori', value: 'Mishary Alafasy' },
                { label: 'Arab shrift o\'lchami', value: '28px' },
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