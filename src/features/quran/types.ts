// API types for the quranenc.com data source.
// All numeric IDs come back as strings — keep them as strings here and convert
// at render boundaries.

export interface Aya {
  id: string;
  sura: string;
  aya: string;
  arabic_text: string;
  translation: string;
  footnotes: string | null;
}

export interface SuraResponse {
  result: Aya[];
}

export interface TranslationListItem {
  key: string;
  language_iso_code: string;
  direction: 'ltr' | 'rtl';
  version: string;
  last_update: number;
  title: string;
  description: string;
}

export interface TranslationsListResponse {
  translations: TranslationListItem[];
}

export type Script = 'cyrillic' | 'latin';

// Default translation for the Uzbek-first reading experience. Other Uzbek
// translations available: `uzbek_rwwad`, `uzbek_mansour`.
export const DEFAULT_TRANSLATION_KEY = 'uzbek_moyassar';

// ── alquran.cloud Uthmani-script types ──────────────────────────────────────
// Source: https://api.alquran.cloud/v1/surah/{n}/quran-uthmani
// Returns the Uthmani script exactly as typeset in the official Madinah Mushaf.

export interface UthmaniAya {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface UthmaniSurah {
  number: number;
  /** Arabic name with full Mushaf-style voweling, e.g. "سُورَةُ ٱلْفَاتِحَةِ" */
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: UthmaniAya[];
}

export interface UthmaniSurahResponse {
  code: number;
  status: string;
  data: UthmaniSurah;
}

// ── QCF V2 word-level types (api.qurancdn.com) ───────────────────────────────
// Each word carries a `code_v2` PUA glyph and `page_number` (1–604) which
// determines which per-page font file to load.  The QCF V2 fonts are NOT
// Unicode — each glyph is a full word shape encoded in the Private Use Area.

export type WordCharType = 'word' | 'end' | 'chapter_number';

export interface QcfWord {
  id: number;
  position: number;
  char_type_name: WordCharType;
  page_number: number;
  line_number: number;
  /** Standard Unicode text (for accessibility / fallback). */
  text: string;
  /** PUA glyph character for QCF V2 per-page fonts. */
  code_v2: string;
}

export interface QcfVerse {
  id: number;
  verse_number: number;
  /** "1:1" format */
  verse_key: string;
  page_number: number;
  juz_number: number;
  words: QcfWord[];
}

export interface QcfVersesResponse {
  verses: QcfVerse[];
  pagination: {
    total_count: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
  };
}
