'use client';

import { useScriptStore } from '../store/script.store';
import { transliterateUzbekToLatin } from '../utils/transliterate';

/**
 * Returns a function that renders Uzbek text in the globally selected script.
 * When `latinOverride` is provided it is used directly instead of algorithmic
 * transliteration, which is especially useful for surah names that have a
 * canonical Latin spelling stored in the data layer.
 */
export const useTranslit = () => {
  const script = useScriptStore((s) => s.script);
  return (cyrillicText: string, latinOverride?: string): string => {
    if (script !== 'latin') return cyrillicText;
    return latinOverride ?? transliterateUzbekToLatin(cyrillicText);
  };
};
