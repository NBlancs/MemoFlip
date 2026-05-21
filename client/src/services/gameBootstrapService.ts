import { Card, useGameStore } from '../state/gameStore';
import { Difficulty, settingsService } from './settingsService';

const symbols = [
  'circle',
  'cloud',
  'cross',
  'diamond',
  'down',
  'hexagon',
  'hexagon_horizontal',
  'left',
  'octagon',
  'octagram',
  'pentagon',
  'reverse_triangle',
  'right',
  'square',
  'star_five',
  'star_four',
  'triangle',
  'up',
];

const pairCountByDifficulty: Record<Difficulty, number> = {
  easy: 8,
  medium: 18,
};

const shuffle = <T,>(items: T[]) => {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
};

export const createDeck = (difficulty: Difficulty): Card[] => {
  const selectedSymbols = symbols.slice(0, pairCountByDifficulty[difficulty]);
  const cards = selectedSymbols.flatMap((value) => [
    { id: `${value}-a`, value, isFlipped: false, isMatched: false },
    { id: `${value}-b`, value, isFlipped: false, isMatched: false },
  ]);

  return shuffle(cards).map((card, index) => ({ ...card, id: `${card.id}-${index}` }));
};

export const gameBootstrapService = {
  async initializeNewGame() {
    const settings = await settingsService.loadSettings();
    const cards = createDeck(settings.difficulty);
    useGameStore.getState().actions.initializeGame(cards, settings.difficulty);
  },
};
