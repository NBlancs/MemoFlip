import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { GameModal } from '../components/GameModal';
import { Screen } from '../components/Screen';
import { TerminalHeader } from '../components/TerminalHeader';
import { gameBootstrapService } from '../services/gameBootstrapService';
import { playerService } from '../services/playerService';
import { settingsService } from '../services/settingsService';
import { colors, spacing, type } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const steps = [
  'Flip two cards to reveal their IDs.',
  'Matching IDs lock in and raise your score.',
  'Misses flip back after the loop resolves them.',
  'Win by clearing every pair with low moves and clean time.',
];

export function OnboardingScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);

  useEffect(() => {
    void playerService.getProfile().then((profile) => setUsername(profile?.username ?? ''));
  }, []);

  const start = async () => {
    await settingsService.updateSettings({ tutorialSeen: true });

    if (!username.trim()) {
      setUsernameModalVisible(true);
      return;
    }

    await gameBootstrapService.initializeNewGame();
    navigation.replace('Game');
  };

  const startWithUsername = async () => {
    if (!username.trim()) {
      return;
    }

    await settingsService.updateSettings({ tutorialSeen: true });
    await playerService.saveUsername(username);
    setUsernameModalVisible(false);
    await gameBootstrapService.initializeNewGame();
    navigation.replace('Game');
  };

  return (
    <Screen>
      <TerminalHeader path="ROOT/BRIEFING >" title="How to Play" subtitle="Concentration rules, tuned for fast memory runs." />
      <View style={styles.panel}>
        {steps.map((step, index) => (
          <View key={step} style={styles.step}>
            <Text style={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <AppButton label="Start Run" onPress={start} />
        <AppButton label="Main Menu" onPress={() => navigation.replace('MainMenu')} variant="ghost" />
      </View>
      <GameModal
        visible={usernameModalVisible}
        title="Enter Username"
        primaryLabel="Start"
        secondaryLabel="Cancel"
        onPrimary={startWithUsername}
        onSecondary={() => setUsernameModalVisible(false)}
      >
        <Text style={styles.modalText}>Choose a display name for local score tracking.</Text>
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={24}
          onChangeText={setUsername}
          onSubmitEditing={startWithUsername}
          placeholder="Username"
          placeholderTextColor={colors.outline}
          returnKeyType="done"
          style={styles.input}
          value={username}
        />
      </GameModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.sm,
  },
  step: {
    minHeight: 72,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceLow,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepNumber: {
    color: colors.primary,
    fontFamily: type.fallback,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0,
  },
  stepText: {
    flex: 1,
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    gap: spacing.sm,
  },
  modalText: {
    color: colors.onSurfaceMuted,
    fontFamily: type.fallback,
    fontSize: 14,
    lineHeight: 21,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceLow,
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 16,
    paddingHorizontal: spacing.md,
  },
});
