import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-arabic text-xl text-warm">﷽</span>
              <span className="text-lg font-semibold text-foreground">Noor</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A refined digital experience for the Noble Quran. Access translations, tafsir, recitations, and beneficial Islamic knowledge.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/quran" className="hover:text-foreground transition-colors">Read Quran</Link></li>
              <li><Link to="/surahs" className="hover:text-foreground transition-colors">Surah Index</Link></li>
              <li><Link to="/translations" className="hover:text-foreground transition-colors">Translations</Link></li>
              <li><Link to="/tafsir" className="hover:text-foreground transition-colors">Tafsir</Link></li>
              <li><Link to="/audio" className="hover:text-foreground transition-colors">Recitations</Link></li>
            </ul>
          </div>

          {/* Discover */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Discover</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/topics" className="hover:text-foreground transition-colors">Quran by Topics</Link></li>
              <li><Link to="/articles" className="hover:text-foreground transition-colors">Articles</Link></li>
              <li><Link to="/search" className="hover:text-foreground transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Mission</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Noor — A digital Quran platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
