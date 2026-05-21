import { useEffect, useRef } from 'react';

import { useGameStore } from '../state/gameStore';
import { audioService } from './audioService';
import { hapticsService } from './hapticsService';

export function useGameFeedbackEvents() {
  const gameState = useGameStore((state) => state.gameState);
  const matchedCount = useGameStore((state) => state.cards.filter((card) => card.isMatched).length);
  const flippedUnmatchedCount = useGameStore(
    (state) => state.cards.filter((card) => card.isFlipped && !card.isMatched).length,
  );
  const previousMatched = useRef(matchedCount);
  const previousFlippedUnmatched = useRef(flippedUnmatchedCount);
  const previousGameState = useRef(gameState);

  useEffect(() => {
    if (matchedCount > previousMatched.current) {
      void hapticsService.score();
      void audioService.playSound('match');
    }

    previousMatched.current = matchedCount;
  }, [matchedCount]);

  useEffect(() => {
    const wasMismatchReset =
      previousGameState.current !== 'PEEKING' &&
      previousFlippedUnmatched.current >= 2 &&
      flippedUnmatchedCount === 0 &&
      matchedCount === previousMatched.current;

    if (wasMismatchReset) {
      void hapticsService.collision();
      void audioService.playSound('miss');
    }

    previousFlippedUnmatched.current = flippedUnmatchedCount;
  }, [flippedUnmatchedCount, matchedCount]);

  useEffect(() => {
    if (gameState === 'GAME_OVER' && previousGameState.current !== 'GAME_OVER') {
      void hapticsService.finish();
      void audioService.playSound('win');
    }

    previousGameState.current = gameState;
  }, [gameState]);
}
