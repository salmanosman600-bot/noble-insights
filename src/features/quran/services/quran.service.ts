import { apiClient } from '@/shared/lib/api-client';
import { apiRoutes } from '@/config/routes';
import type { SuraResponse, TranslationsListResponse } from '../types';

// Client-side service. Hooks call these — never call from inside a component.
// CORS on quranenc.com is `*`, so the browser hits it directly.

export const quranService = {
  translationsList: (langIsoCode?: string) =>
    apiClient.get<TranslationsListResponse>(apiRoutes.quranenc.translationsList(langIsoCode)),

  sura: (translationKey: string, suraNumber: number) =>
    apiClient.get<SuraResponse>(apiRoutes.quranenc.sura(translationKey, suraNumber)),
};
