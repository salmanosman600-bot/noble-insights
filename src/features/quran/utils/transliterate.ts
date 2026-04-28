// Uzbek Cyrillic → Latin transliteration following the 1995 reform.
// Used for the script toggle so Cyrillic-source translations from quranenc.com
// can render in Latin without re-fetching.
//
// Notes:
// - Uppercase Cyrillic letters that map to multi-char Latin (Ё → Yo) get
//   only the first Latin letter capitalised.
// - The special Latin characters Oʻ, Gʻ, ʼ use MODIFIER LETTER TURNED COMMA
//   (U+02BB) and MODIFIER LETTER APOSTROPHE (U+02BC), per the Uzbek standard.

const TURNED_COMMA = 'ʻ';
const MOD_APOSTROPHE = 'ʼ';

const map: Record<string, string> = {
  // Vowels & basic consonants
  А: 'A', а: 'a',
  Б: 'B', б: 'b',
  В: 'V', в: 'v',
  Г: 'G', г: 'g',
  Д: 'D', д: 'd',
  Е: 'E', е: 'e',
  Ё: 'Yo', ё: 'yo',
  Ж: 'J', ж: 'j',
  З: 'Z', з: 'z',
  И: 'I', и: 'i',
  Й: 'Y', й: 'y',
  К: 'K', к: 'k',
  Л: 'L', л: 'l',
  М: 'M', м: 'm',
  Н: 'N', н: 'n',
  О: 'O', о: 'o',
  П: 'P', п: 'p',
  Р: 'R', р: 'r',
  С: 'S', с: 's',
  Т: 'T', т: 't',
  У: 'U', у: 'u',
  Ф: 'F', ф: 'f',
  Х: 'X', х: 'x',
  Ц: 'Ts', ц: 'ts',
  Ч: 'Ch', ч: 'ch',
  Ш: 'Sh', ш: 'sh',
  Щ: 'Shch', щ: 'shch',
  Ъ: MOD_APOSTROPHE, ъ: MOD_APOSTROPHE,
  Ы: 'I', ы: 'i',
  Ь: '',
  Э: 'E', э: 'e',
  Ю: 'Yu', ю: 'yu',
  Я: 'Ya', я: 'ya',

  // Uzbek-specific letters
  Ў: `O${TURNED_COMMA}`, ў: `o${TURNED_COMMA}`,
  Қ: 'Q', қ: 'q',
  Ғ: `G${TURNED_COMMA}`, ғ: `g${TURNED_COMMA}`,
  Ҳ: 'H', ҳ: 'h',
};

export const transliterateUzbekToLatin = (text: string): string => {
  let out = '';
  for (const ch of text) {
    out += map[ch] ?? ch;
  }
  return out;
};
