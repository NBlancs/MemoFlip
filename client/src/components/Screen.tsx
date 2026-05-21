import { PropsWithChildren, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme';

interface ScreenProps extends PropsWithChildren {
  dense?: boolean;
}

export const Screen = memo(function Screen({ children, dense = false }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'bottom', 'left']}>
      <View style={[styles.scanline, dense && styles.scanlineDense]} pointerEvents="none" />
      <View style={[styles.content, dense && styles.dense]}>{children}</View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  dense: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  scanline: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    borderTopColor: colors.outlineVariant,
    borderTopWidth: 1,
  },
  scanlineDense: {
    opacity: 0.05,
  },
});
