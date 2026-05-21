import { PropsWithChildren, memo } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, type } from '../theme';
import { AppButton } from './AppButton';

interface GameModalProps extends PropsWithChildren {
  visible: boolean;
  title: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

export const GameModal = memo(function GameModal({
  visible,
  title,
  children,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: GameModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>{children}</View>
          <View style={styles.actions}>
            <AppButton label={primaryLabel} onPress={onPrimary} />
            {secondaryLabel && onSecondary ? (
              <AppButton label={secondaryLabel} onPress={onSecondary} variant="ghost" />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.72)',
    padding: spacing.md,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  body: {
    gap: spacing.sm,
  },
  actions: {
    gap: spacing.sm,
  },
});
