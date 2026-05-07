import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:pr-8">
            <div className="flex items-center gap-2.5">
              <span className="font-quran text-2xl text-warm">☯</span>
              <span className="text-[17px] font-semibold text-foreground">Noor</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Qur'oni Karim uchun nozik raqamli tajriba. Tarjimalar, tafsir, qiroatlar va foydali islomiy bilimlarni oling.
            </p>
          </div>

          {/* Ko'rish */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/70">Ko'rish</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/quran" className="hover:text-foreground transition-colors duration-200">Qur'on o'qish</Link></li>
              <li><Link href="/surahs" className="hover:text-foreground transition-colors duration-200">Suralar ro'yxati</Link></li>
              {/* <li><Link href="/translations" className="hover:text-foreground transition-colors duration-200">Tarjimalar</Link></li> */}
              {/* <li><Link href="/tafsir" className="hover:text-foreground transition-colors duration-200">Tafsir</Link></li> */}
              {/* <li><Link href="/audio" className="hover:text-foreground transition-colors duration-200">Qiroatlar</Link></li> */}
            </ul>
          </div>

          {/* Kashf etish */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/70">Kashf etish</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {/* <li><Link href="/topics" className="hover:text-foreground transition-colors duration-200">Mavzular bo'yicha Qur'on</Link></li> */}
              {/* <li><Link href="/articles" className="hover:text-foreground transition-colors duration-200">Maqolalar</Link></li> */}
              <li><Link href="/search" className="hover:text-foreground transition-colors duration-200">Qidirish</Link></li>
              <li><Link href="/bookmarks" className="hover:text-foreground transition-colors duration-200">Xatcho&apos;plar</Link></li>
              {/* <li><Link href="/dashboard" className="hover:text-foreground transition-colors duration-200">Kabinet</Link></li> */}
            </ul>
          </div>

          {/*
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-foreground/70">Haqida</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#">Maqsad</a></li>
              <li><a href="#">Maxfiylik siyosati</a></li>
              <li><a href="#">Foydalanish shartlari</a></li>
              <li><a href="#">Aloqa</a></li>
            </ul>
          </div>
          */}
        </div>

        <div className="ornament-line mt-16 mb-8" />
        <p className="text-center text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Noor — Raqamli Qur'on platformasi. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;