import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { TerminalHeader } from '../components/TerminalHeader';
import { ToggleRow } from '../components/ToggleRow';
import { Difficulty, GameSettings, settingsService } from '../services/settingsService';
import { colors, spacing, touchTarget, type } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const difficultyOptions: Difficulty[] = ['easy', 'medium'];

export function SettingsScreen({ navigation }: Props) {
  const [settings, setSettings] = useState<GameSettings | null>(null);

  useEffect(() => {
    void settingsService.loadSettings().then(setSettings);
  }, []);

  const update = async (partial: Partial<GameSettings>) => {
    setSettings(await settingsService.updateSettings(partial));
  };

  return (
    <Screen>
      <TerminalHeader path="ROOT/CONFIG >" title="Settings" subtitle="Stored through the client settings adapter." />
      {settings ? (
        <View style={styles.panel}>
          <ToggleRow
            label="Sound"
            value={settings.soundEnabled}
            onValueChange={(soundEnabled) => void update({ soundEnabled })}
          />
          <ToggleRow
            label="Music"
            value={settings.musicEnabled}
            onValueChange={(musicEnabled) => void update({ musicEnabled })}
          />
          <ToggleRow
            label="Haptics"
            value={settings.hapticsEnabled}
            onValueChange={(hapticsEnabled) => void update({ hapticsEnabled })}
          />
          <View style={styles.segment}>
            {difficultyOptions.map((difficulty) => {
              const selected = settings.difficulty === difficulty;

              return (
                <Pressable
                  key={difficulty}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => void update({ difficulty })}
                  style={[styles.segmentButton, selected && styles.segmentSelected]}
                >
                  <Text style={[styles.segmentLabel, selected && styles.segmentLabelSelected]}>{difficulty}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : (
        <Text style={styles.loading}>Loading settings...</Text>
      )}
      <AppButton label="Back" onPress={() => navigation.goBack()} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    gap: spacing.sm,
  },
  segment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  segmentButton: {
    flex: 1,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceLow,
  },
  segmentSelected: {
    backgroundColor: colors.primary,
  },
  segmentLabel: {
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  segmentLabelSelected: {
    color: colors.primaryOn,
  },
  loading: {
    flex: 1,
    color: colors.onSurfaceMuted,
    fontFamily: type.fallback,
    fontSize: 14,
  },
});
