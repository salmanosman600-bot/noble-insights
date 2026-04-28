'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Quran', path: '/quran' },
  { label: 'Surahs', path: '/surahs' },
  { label: 'Translations', path: '/translations' },
  { label: 'Tafsir', path: '/tafsir' },
  { label: 'Audio', path: '/audio' },
  { label: 'Topics', path: '/topics' },
  { label: 'Articles', path: '/articles' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-xl">
      <div className="container flex h-[4.25rem] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-arabic text-2xl leading-none text-warm" aria-hidden="true">﷽</span>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">Noor</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              aria-current={pathname === link.path ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200',
                pathname === link.path
                  ? 'text-foreground bg-hover'
                  : 'text-muted-foreground hover:text-foreground hover:bg-hover'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Link href="/search" aria-label="Search">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" tabIndex={-1} aria-hidden="true">
              <Search className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          <Link href="/dashboard" aria-label="My Dashboard" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" tabIndex={-1} aria-hidden="true">
              <User className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
          <nav aria-label="Mobile navigation" className="container flex flex-col gap-1 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                aria-current={pathname === link.path ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  pathname === link.path
                    ? 'text-foreground bg-hover'
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
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-xl">
      <div className="container flex h-[4.25rem] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-arabic text-2xl leading-none text-warm">﷽</span>
          <span className="text-[17px] font-semibold tracking-tight text-foreground">Noor</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200',
                location.pathname === link.path
                  ? 'text-foreground bg-hover'
                  : 'text-muted-foreground hover:text-foreground hover:bg-hover'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          <Link to="/dashboard" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="h-[18px] w-[18px]" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t bg-card lg:hidden animate-fade-in">
          <nav className="container flex flex-col gap-1 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-foreground bg-hover'
                    : 'text-muted-foreground hover:bg-hover hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-hover hover:text-foreground sm:hidden"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;