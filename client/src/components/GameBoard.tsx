import { memo, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Card } from '../state/gameStore';
import { spacing } from '../theme';
import { AnimatedTile } from './AnimatedTile';

interface GameBoardProps {
  cards: Card[];
  disabled: boolean;
  onTilePress: (id: string) => void;
}

export const GameBoard = memo(function GameBoard({ cards, disabled, onTilePress }: GameBoardProps) {
  const { width, height } = useWindowDimensions();
  const columns = Math.round(Math.sqrt(cards.length));
  const gap = spacing.xs;
  const boardWidth = Math.min(width - spacing.md * 2, height * 0.72);
  const tileSize = useMemo(() => Math.floor((boardWidth - gap * (columns - 1)) / columns), [boardWidth, columns, gap]);

  return (
    <View style={[styles.grid, { gap, width: boardWidth }]}>
      {cards.map((card) => (
        <AnimatedTile key={card.id} card={card} disabled={disabled} size={tileSize} onPress={onTilePress} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
