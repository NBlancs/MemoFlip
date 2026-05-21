import { create } from 'zustand';

import { Difficulty } from '../services/settingsService';

export type GameState = 'PEEKING' | 'IDLE' | 'FLIPPED_ONE' | 'PROCESSING_MATCH' | 'GAME_OVER';

export interface Card {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const flipAnimationLockMs = 420;

interface GameStoreState {
  gameState: GameState;
  isAnimating: boolean;
  difficulty: Difficulty;
  cards: Card[];
  moves: number;
  elapsedTime: number;
  firstCardFlipped: Card | null;
  actions: {
    initializeGame: (cards: Card[], difficulty: Difficulty) => void;
    flipCard: (cardId: string) => void;
    unlockInput: () => void;
    finishPeek: () => void;
    waitForMismatchReset: () => void;
    resetFlippedCards: () => void;
    matchCards: (id1: string, id2: string) => void;
    tickTimer: () => void;
    setGameOver: () => void;
  };
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  gameState: 'IDLE',
  isAnimating: false,
  difficulty: 'easy',
  cards: [],
  moves: 0,
  elapsedTime: 0,
  firstCardFlipped: null,
  actions: {
    initializeGame: (cards, difficulty) =>
      set({
        cards: cards.map((card) => ({ ...card, isFlipped: true })),
        difficulty,
        gameState: 'PEEKING',
        isAnimating: false,
        moves: 0,
        elapsedTime: 0,
        firstCardFlipped: null,
      }),
    flipCard: (cardId) => {
      const { gameState, isAnimating, cards, firstCardFlipped } = get();
      if (isAnimating || gameState === 'PEEKING' || gameState === 'PROCESSING_MATCH' || gameState === 'GAME_OVER') return;

      const card = cards.find(c => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;

      if (gameState === 'IDLE') {
        set(state => ({
          gameState: 'FLIPPED_ONE',
          isAnimating: true,
          firstCardFlipped: card,
          cards: state.cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c)
        }));
      } else if (gameState === 'FLIPPED_ONE' && firstCardFlipped) {
        set(state => ({
          gameState: 'PROCESSING_MATCH',
          isAnimating: true,
          moves: state.moves + 1,
          cards: state.cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c)
        }));
      }
    },
    unlockInput: () =>
      set((state) => {
        if (!state.isAnimating) {
          return state;
        }

        return { isAnimating: false };
      }),
    finishPeek: () =>
      set((state) => {
        if (state.gameState !== 'PEEKING') {
          return state;
        }

        return {
          gameState: 'IDLE',
          isAnimating: true,
          firstCardFlipped: null,
          cards: state.cards.map((card) => ({ ...card, isFlipped: false })),
        };
      }),
    waitForMismatchReset: () => set({ gameState: 'PROCESSING_MATCH', isAnimating: false, firstCardFlipped: null }),
    resetFlippedCards: () => set(state => ({
      gameState: 'IDLE',
      isAnimating: true,
      firstCardFlipped: null,
      cards: state.cards.map(c => c.isMatched ? c : { ...c, isFlipped: false })
    })),
    matchCards: (id1, id2) => {
      set(state => {
        const nextCards = state.cards.map(c => 
          (c.id === id1 || c.id === id2) ? { ...c, isMatched: true, isFlipped: true } : c
        );
        const isGameOver = nextCards.every(c => c.isMatched);
        return {
          cards: nextCards,
          gameState: isGameOver ? 'GAME_OVER' : 'IDLE',
          isAnimating: true,
          firstCardFlipped: null
        };
      });
    },
    tickTimer: () => set(state => {
      if (state.gameState !== 'GAME_OVER' && state.gameState !== 'IDLE' && state.moves > 0 || state.firstCardFlipped) {
         return { elapsedTime: state.elapsedTime + 1 };
      }
      return state;
    }),
    setGameOver: () => set({ gameState: 'GAME_OVER', isAnimating: false })
  }
}));

export const useGameActions = () => useGameStore((state) => state.actions);
