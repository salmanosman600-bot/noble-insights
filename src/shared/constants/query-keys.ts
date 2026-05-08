// All TanStack Query keys live here. Never inline a string key.

export const QUERY_KEYS = {
  quran: {
    all: ['quran'] as const,
    translationsList: (langIsoCode?: string) =>
      ['quran', 'translations-list', langIsoCode ?? 'all'] as const,
    sura: (translationKey: string, suraNumber: number) =>
      ['quran', 'sura', translationKey, suraNumber] as const,
    aya: (translationKey: string, suraNumber: number, ayaNumber: number) =>
      ['quran', 'aya', translationKey, suraNumber, ayaNumber] as const,
    // Uthmani Arabic text from alquran.cloud — separate from translation cache.
    uthmaniSura: (suraNumber: number) =>
      ['quran', 'uthmani-sura', suraNumber] as const,
    // QCF V2 word glyphs from api.qurancdn.com — needed for per-page font rendering.
    qcfSura: (suraNumber: number) =>
      ['quran', 'qcf-sura', suraNumber] as const,
  },
} as const;
