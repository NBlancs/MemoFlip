import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { startGameLoop, stopGameLoop } from '../game/GameLoop';
import { audioService } from './audioService';

export function useGameLoopLifecycle(isPaused: boolean, onBackgroundPause: () => void) {
  const running = useRef(false);

  const start = useCallback(() => {
    if (running.current || isPaused) {
      return;
    }

    stopGameLoop();
    startGameLoop();
    running.current = true;
    void audioService.resumeMusic();
  }, [isPaused]);

  const stop = useCallback(() => {
    if (!running.current) {
      return;
    }

    stopGameLoop();
    running.current = false;
    void audioService.pauseAll();
  }, []);

  useEffect(() => {
    if (isPaused) {
      stop();
    } else {
      start();
    }

    return stop;
  }, [isPaused, start, stop]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (status !== 'active') {
        onBackgroundPause();
        stop();
      }
    });

    return () => subscription.remove();
  }, [onBackgroundPause, stop]);

  return { start, stop };
}
