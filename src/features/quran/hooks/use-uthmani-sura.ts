'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { quranService } from '../services/quran.service';

/**
 * Fetches the Uthmani-script Arabic text for a surah from alquran.cloud.
 * The text is identical to the printed Madinah Mushaf (Hafs ʿan ʿĀṣim).
 */
export const useUthmaniSura = (suraNumber: number) =>
  useQuery({
    queryKey: QUERY_KEYS.quran.uthmaniSura(suraNumber),
    queryFn: () => quranService.uthmaniSura(suraNumber),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
    enabled: suraNumber >= 1 && suraNumber <= 114,
  });
