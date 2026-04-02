import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, Globe } from 'lucide-react';
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
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-arabic text-xl text-warm">﷽</span>
          <span className="text-lg font-semibold tracking-tight text-foreground">Noor</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-hover',
                location.pathname === link.path
                  ? 'text-foreground bg-hover'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:flex">
            <Globe className="h-4 w-4" />
          </Button>
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:flex">
              <User className="h-4 w-4" />
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
        <div className="border-t bg-card lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-foreground bg-hover'
                    : 'text-muted-foreground hover:bg-hover'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
