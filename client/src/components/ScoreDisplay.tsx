import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, type } from '../theme';

interface ScoreDisplayProps {
  label: string;
  value: string | number;
  accent?: 'primary' | 'secondary' | 'danger';
}

export const ScoreDisplay = memo(function ScoreDisplay({ label, value, accent = 'primary' }: ScoreDisplayProps) {
  return (
    <View style={[styles.container, styles[accent]]}>
      <Text style={styles.label}>{label}</Text>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.value}>
        {value}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexBasis: 64,
    minHeight: 54,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceLow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
  },
  primary: {
    borderColor: colors.primary,
  },
  secondary: {
    borderColor: colors.secondary,
  },
  danger: {
    borderColor: colors.danger,
  },
  label: {
    color: colors.onSurfaceMuted,
    fontFamily: type.fallback,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0,
  },
});
