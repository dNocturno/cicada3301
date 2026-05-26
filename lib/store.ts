'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EndingChoice = 'nsa' | 'private-group' | 'art-project' | 'hoax';

interface GameState {
  currentStageId: number;
  completedStages: number[];
  decisions: Record<number, { selectedOption: number; attempts: number }>;
  unlockedTools: string[];
  endingChoice?: EndingChoice;
  setStage: (id: number) => void;
  completeStage: (id: number, optionIndex: number) => void;
  setEndingChoice: (choice: EndingChoice) => void;
  reset: () => void;
}

const TOOL_UNLOCK_MAP: Record<number, string> = {
  11: 'gematria',
  12: 'rune-translator',
  19: 'vigenere',
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      currentStageId: 1,
      completedStages: [],
      decisions: {},
      unlockedTools: [],
      endingChoice: undefined,

      setStage: (id) => set({ currentStageId: id }),

      completeStage: (id, optionIndex) =>
        set((state) => {
          const prev = state.decisions[id];
          const attempts = prev ? prev.attempts + 1 : 1;
          const newTools = TOOL_UNLOCK_MAP[id]
            ? [...new Set([...state.unlockedTools, TOOL_UNLOCK_MAP[id]])]
            : state.unlockedTools;
          return {
            currentStageId: id,
            completedStages: state.completedStages.includes(id)
              ? state.completedStages
              : [...state.completedStages, id],
            decisions: { ...state.decisions, [id]: { selectedOption: optionIndex, attempts } },
            unlockedTools: newTools,
          };
        }),

      setEndingChoice: (choice) => set({ endingChoice: choice }),

      reset: () =>
        set({
          currentStageId: 1,
          completedStages: [],
          decisions: {},
          unlockedTools: [],
          endingChoice: undefined,
        }),
    }),
    { name: 'cicada-3301-progress' }
  )
);
