import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { TerminalHeader } from '../components/TerminalHeader';
import { colors, spacing, type } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Credits'>;

export function CreditsScreen({ navigation }: Props) {
  return (
    <Screen>
      <TerminalHeader path="ROOT/ABOUT >" title="Credits" subtitle="MemoFlip frontend implementation." />
      <View style={styles.panel}>
        <Text style={styles.line}>Design System: Cyber-Grunge Academia</Text>
        <Text style={styles.line}>Renderer: React Native Views</Text>
        <Text style={styles.line}>State: Zustand FSM</Text>
        <Text style={styles.line}>Loop: requestAnimationFrame game loop</Text>
        <Text style={styles.line}>Audio/Haptics: Expo adapters</Text>
      </View>
      <AppButton label="Back" onPress={() => navigation.goBack()} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceLow,
    padding: spacing.md,
  },
  line: {
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 14,
    lineHeight: 22,
  },
});
