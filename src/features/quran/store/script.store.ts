'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Script } from '../types';

// Global preference for Uzbek script (Cyrillic ↔ Latin). Persisted to
// localStorage so the choice survives reloads. Wherever Uzbek text is
// rendered (currently the quran reader; future: tafsir, dashboards),
// transliteration is driven by this single source of truth.

interface ScriptState {
  script: Script;
  setScript: (script: Script) => void;
  toggle: () => void;
}

export const useScriptStore = create<ScriptState>()(
  persist(
    (set) => ({
      script: 'cyrillic',
      setScript: (script) => set({ script }),
      toggle: () =>
        set((state) => ({ script: state.script === 'cyrillic' ? 'latin' : 'cyrillic' })),
    }),
    {
      name: 'noor-script-preference',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
