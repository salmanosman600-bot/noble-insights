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
