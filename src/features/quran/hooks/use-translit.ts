'use client';

import { useScriptStore } from '../store/script.store';
import { transliterateUzbekToLatin } from '../utils/transliterate';

/**
 * Returns a function that transliterates Uzbek Cyrillic to Latin when the
 * global script preference is set to 'latin', otherwise returns the text as-is.
 * Use this hook anywhere Uzbek text needs to respond to the script toggle.
 */
export const useTranslit = () => {
  const script = useScriptStore((s) => s.script);
  return (text: string): string =>
    script === 'latin' ? transliterateUzbekToLatin(text) : text;
};
