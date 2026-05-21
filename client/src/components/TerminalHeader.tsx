import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, type } from '../theme';

interface TerminalHeaderProps {
  path: string;
  title: string;
  subtitle?: string;
}

export const TerminalHeader = memo(function TerminalHeader({ path, title, subtitle }: TerminalHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.path}>{path}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  path: {
    color: colors.secondary,
    fontFamily: type.fallback,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.onSurfaceMuted,
    fontFamily: type.fallback,
    fontSize: 14,
    lineHeight: 21,
  },
});
