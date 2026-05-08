import { useEffect, useState } from 'react';
import type { QcfVerse } from '../types';

const QCF_V2_CDN = 'https://verses.quran.foundation/fonts/quran/hafs/v2/woff2';

const loadedPages = new Set<number>();

async function loadPageFont(pageNum: number): Promise<void> {
  if (loadedPages.has(pageNum)) return;

  const family = `p${pageNum}-v2`;

  // FontFace.check('1px family') returns true only when the font is fully loaded.
  // Guard first to avoid redundant loads on re-mount.
  if (document.fonts.check(`1px '${family}'`)) {
    loadedPages.add(pageNum);
    return;
  }

  const ff = new FontFace(family, `url('${QCF_V2_CDN}/p${pageNum}.woff2')`);
  await ff.load();
  document.fonts.add(ff);
  loadedPages.add(pageNum);
}

/**
 * Extracts all unique Mushaf page numbers from `verses` and loads the
 * corresponding QCF V2 per-page font files (`p{N}-v2`) via the FontFace API.
 * Returns `true` once every required font is loaded (or failed gracefully).
 */
export const useQcfFonts = (verses: QcfVerse[] | undefined): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!verses || verses.length === 0) return;

    const pageNums = new Set<number>();
    for (const verse of verses) {
      for (const word of verse.words) {
        if (word.page_number) pageNums.add(word.page_number);
      }
    }

    if (pageNums.size === 0) {
      setReady(true);
      return;
    }

    setReady(false);
    Promise.all([...pageNums].map(loadPageFont))
      .catch(() => {
        // Graceful degradation: show text with fallback font if any font fails.
      })
      .finally(() => setReady(true));
  }, [verses]);

  return ready;
};
