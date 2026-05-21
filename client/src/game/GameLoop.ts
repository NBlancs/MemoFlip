import { useGameStore } from '../state/gameStore';

let animationFrameId: number;
let lastTime = 0;

export const startGameLoop = () => {
  const loop = (time: number) => {
    // 1-second timer tick (roughly)
    if (time - lastTime >= 1000) {
      useGameStore.getState().actions.tickTimer();
      lastTime = time;
    }

    const { gameState, cards, firstCardFlipped } = useGameStore.getState();

    if (gameState === 'PROCESSING_MATCH' && firstCardFlipped) {
      // Find the second card that was flipped but not matched
      const secondCard = cards.find(c => c.isFlipped && !c.isMatched && c.id !== firstCardFlipped.id);
      
      if (secondCard) {
        if (firstCardFlipped.value === secondCard.value) {
          useGameStore.getState().actions.matchCards(firstCardFlipped.id, secondCard.id);
        } else {
          useGameStore.getState().actions.waitForMismatchReset();
          
          setTimeout(() => {
            useGameStore.getState().actions.resetFlippedCards();
          }, 1000);
        }
      }
    }

    animationFrameId = requestAnimationFrame(loop);
  };
  
  lastTime = performance.now();
  animationFrameId = requestAnimationFrame(loop);
};

export const stopGameLoop = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
};
