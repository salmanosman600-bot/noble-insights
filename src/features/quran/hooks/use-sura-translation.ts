'use client';

import { useQuery } from '@tanstack/react-query';
import { quranService } from '../services/quran.service';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

export const useSuraTranslation = (translationKey: string, suraNumber: number) =>
  useQuery({
    queryKey: QUERY_KEYS.quran.sura(translationKey, suraNumber),
    queryFn: () => quranService.sura(translationKey, suraNumber),
    // Quran content is immutable — long stale time is appropriate.
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
    enabled: Boolean(translationKey) && suraNumber >= 1 && suraNumber <= 114,
  });
