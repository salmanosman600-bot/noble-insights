import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { mushafService } from '../services/mushaf.service';

/**
 * Fetches QCF V2 word-level glyph data for a surah from api.qurancdn.com.
 * Each word carries a `code_v2` PUA character and `page_number` (1–604).
 * Use these with the per-page QCF V2 fonts for Mushaf-identical rendering.
 */
export const useMushafSura = (suraNumber: number) =>
  useQuery({
    queryKey: QUERY_KEYS.quran.qcfSura(suraNumber),
    queryFn: () => mushafService.surahVerses(suraNumber),
    staleTime: 7 * 24 * 60 * 60 * 1000,
    gcTime: 14 * 24 * 60 * 60 * 1000,
    enabled: suraNumber >= 1 && suraNumber <= 114,
  });
