// Centralised route map. Reference these constants instead of hard-coding paths.

export const routes = {
  home: '/',
  quran: '/quran',
  mushaf: '/mushaf',
  mushafSurah: (id: number | string) => `/mushaf?surah=${id}`,
  surahs: '/surahs',
  surah: (id: number | string) => `/quran?surah=${id}`,
  translations: '/translations',
  tafsir: '/tafsir',
  audio: '/audio',
  topics: '/topics',
  topic: (id: string) => `/topics/${id}`,
  articles: '/articles',
  search: '/search',
  dashboard: '/dashboard',
  bookmarks: '/bookmarks',
} as const;

// External API paths (relative to NEXT_PUBLIC_QURANENC_API_URL).
export const apiRoutes = {
  // api.quran.com v4 — Quran Foundation public API, CORS *, no key required.
  // Provides QCF V2 `code_v2` PUA glyphs and `page_number` per word.
  // Required for QCF V2 per-page font rendering (cannot use Unicode text).
  qurancdn: {
    baseUrl: 'https://api.quran.com/api/v4' as const,
    versesByChapter: (chapter: number, page: number) =>
      `/verses/by_chapter/${chapter}?words=true&word_fields=code_v2%2Cpage_number&per_page=50&page=${page}`,
  },

  // alquran.cloud — free public API, CORS *, no key required.
  // Provides Uthmani-script text identical to the printed Madinah Mushaf.
  alquranCloud: {
    baseUrl: 'https://api.alquran.cloud/v1' as const,
    uthmaniSura: (suraNumber: number) => `/surah/${suraNumber}/quran-uthmani`,
  },
  quranenc: {
    translationsList: (lang?: string) =>
      lang ? `/translations/list/${lang}/` : '/translations/list/',
    sura: (translationKey: string, suraNumber: number) =>
      `/translation/sura/${translationKey}/${suraNumber}`,
    aya: (translationKey: string, suraNumber: number, ayaNumber: number) =>
      `/translation/aya/${translationKey}/${suraNumber}/${ayaNumber}`,
    audioUrl: (translationKey: string, sura: number, aya: number) => {
      const s = String(sura).padStart(3, '0');
      const a = String(aya).padStart(3, '0');
      return `https://d.quranenc.com/data/audio/${translationKey}/${s}${a}.mp3`;
    },
  },
} as const;
