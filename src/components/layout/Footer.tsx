import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:pr-8">
            <div className="flex items-center gap-2.5">
              <span className="font-arabic text-2xl text-warm">﷽</span>
              <span className="text-[17px] font-semibold text-foreground">Noor</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A refined digital experience for the Noble Quran. Access translations, tafsir, recitations, and beneficial Islamic knowledge.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/70">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/quran" className="hover:text-foreground transition-colors duration-200">Read Quran</Link></li>
              <li><Link to="/surahs" className="hover:text-foreground transition-colors duration-200">Surah Index</Link></li>
              <li><Link to="/translations" className="hover:text-foreground transition-colors duration-200">Translations</Link></li>
              <li><Link to="/tafsir" className="hover:text-foreground transition-colors duration-200">Tafsir</Link></li>
              <li><Link to="/audio" className="hover:text-foreground transition-colors duration-200">Recitations</Link></li>
            </ul>
          </div>

          {/* Discover */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/70">Discover</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/topics" className="hover:text-foreground transition-colors duration-200">Quran by Topics</Link></li>
              <li><Link to="/articles" className="hover:text-foreground transition-colors duration-200">Articles</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors duration-200">Search</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors duration-200">Dashboard</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/70">About</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors duration-200">Mission</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="ornament-line mt-16 mb-8" />
        <p className="text-center text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Noor — A digital Quran platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;