import { apiClient } from '@/shared/lib/api-client';
import { apiRoutes } from '@/config/routes';
import type { SuraResponse, TranslationsListResponse, UthmaniSurahResponse } from '../types';

// Client-side service. Hooks call these — never call from inside a component.
// CORS on quranenc.com and alquran.cloud is `*`, so the browser hits them directly.

export const quranService = {
  translationsList: (langIsoCode?: string) =>
    apiClient.get<TranslationsListResponse>(apiRoutes.quranenc.translationsList(langIsoCode)),

  sura: (translationKey: string, suraNumber: number) =>
    apiClient.get<SuraResponse>(apiRoutes.quranenc.sura(translationKey, suraNumber)),

  // Uthmani-script Arabic text from alquran.cloud — identical to the printed Madinah Mushaf.
  uthmaniSura: (suraNumber: number) =>
    apiClient.get<UthmaniSurahResponse>(apiRoutes.alquranCloud.uthmaniSura(suraNumber), {
      baseUrl: apiRoutes.alquranCloud.baseUrl,
    }),
};
