import { apiClient } from '@/shared/lib/api-client';
import { apiRoutes } from '@/config/routes';
import type { QcfVerse, QcfVersesResponse } from '../types';

// Client-side service for QCF V2 word-level data from api.qurancdn.com.
// CORS on api.qurancdn.com is `*`, so the browser hits it directly.
// Fetches all pages sequentially and accumulates — most surahs fit in 1–3 pages.

const fetchPage = (chapter: number, page: number) =>
  apiClient.get<QcfVersesResponse>(
    apiRoutes.qurancdn.versesByChapter(chapter, page),
    { baseUrl: apiRoutes.qurancdn.baseUrl },
  );

export const mushafService = {
  async surahVerses(chapter: number): Promise<QcfVerse[]> {
    const first = await fetchPage(chapter, 1);
    const all: QcfVerse[] = [...first.verses];

    let nextPage = first.pagination.next_page;
    while (nextPage !== null) {
      const resp = await fetchPage(chapter, nextPage);
      all.push(...resp.verses);
      nextPage = resp.pagination.next_page;
    }

    return all;
  },
};
