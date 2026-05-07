// Centralised route map. Reference these constants instead of hard-coding paths.

export const routes = {
  home: '/',
  quran: '/quran',
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
