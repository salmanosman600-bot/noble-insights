'use client';

import { Button } from '@/components/ui/button';
import { useScriptStore } from '@/features/quran/store/script.store';
import { cn } from '@/lib/utils';
import { Bookmark, Languages, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { label: 'Bosh sahifa', path: '/' },
  { label: "Qur'on", path: '/quran' },
  { label: 'Suralar', path: '/surahs' },
  { label: "Xatcho'plar", path: '/bookmarks' },
  // { label: 'Tarjimalar', path: '/translations' },
  // { label: 'Tafsir', path: '/tafsir' },
  // { label: 'Audio', path: '/audio' },
  // { label: 'Mavzular', path: '/topics' },
  // { label: 'Maqolalar', path: '/articles' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const script = useScriptStore((s) => s.script);
  const toggleScript = useScriptStore((s) => s.toggle);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-xl">
      {/* Thin brand accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-primary/60 via-warm/70 to-primary/60" />
      <div className="container flex h-[4.25rem] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-quran text-2xl leading-none text-warm" aria-hidden="true">☯</span>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">Noor</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Asosiy navigatsiya" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              aria-current={pathname === link.path ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200',
                pathname === link.path
                  ? 'text-primary bg-primary/8 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-hover'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleScript}
            className="text-muted-foreground hover:text-foreground"
            aria-label={`${script === 'cyrillic' ? 'Lotin' : 'Kirill'} yozuviga o'tish`}
            title={`O'zbek yozuvi: ${script === 'cyrillic' ? 'Кирилл' : 'Lotin'}`}
          >
            <Languages className="mr-1.5 h-4 w-4" />
            <span className="text-[13px] font-medium">{script === 'cyrillic' ? 'Кир' : 'Lot'}</span>
          </Button>
          <Link href="/search" aria-label="Qidirish">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" tabIndex={-1} aria-hidden="true">
              <Search className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          <Link href="/bookmarks" aria-label="Xatcho'plar" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" tabIndex={-1} aria-hidden="true">
              <Bookmark className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          {/*
          <Link href="/dashboard" aria-label="Mening Kabinetim" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" tabIndex={-1} aria-hidden="true">
              <User className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            aria-label={mobileOpen ? 'Navigatsiyani yopish' : 'Navigatsiyani ochish'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div id="mobile-nav" className="border-t bg-card lg:hidden animate-fade-in">
          <nav aria-label="Mobil navigatsiya" className="container flex flex-col gap-1 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                aria-current={pathname === link.path ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  pathname === link.path
                    ? 'text-primary bg-primary/8 font-semibold'
                    : 'text-muted-foreground hover:bg-hover hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-hover hover:text-foreground sm:hidden"
            >
              Kabinet
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
