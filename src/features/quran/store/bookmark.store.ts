'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Persists bookmarked verses across sessions as "surahId:verseNum" strings.

export const bookmarkKey = (surahId: number, verseNum: number) => `${surahId}:${verseNum}`;

interface BookmarkState {
  bookmarks: string[];
  toggle: (surahId: number, verseNum: number) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      bookmarks: [],
      toggle: (surahId, verseNum) => {
        const k = bookmarkKey(surahId, verseNum);
        set((s) => ({
          bookmarks: s.bookmarks.includes(k)
            ? s.bookmarks.filter((b) => b !== k)
            : [...s.bookmarks, k],
        }));
      },
    }),
    {
      name: 'noor-bookmarks',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
