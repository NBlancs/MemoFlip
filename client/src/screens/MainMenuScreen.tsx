import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '../components/AppButton';
import { GameModal } from '../components/GameModal';
import { Screen } from '../components/Screen';
import { TerminalHeader } from '../components/TerminalHeader';
import { gameBootstrapService } from '../services/gameBootstrapService';
import { playerService } from '../services/playerService';
import { colors, spacing, type } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MainMenu'>;

export function MainMenuScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);

  useEffect(() => {
    void playerService.getProfile().then((profile) => setUsername(profile?.username ?? ''));
  }, []);

  const play = async () => {
    if (!username.trim()) {
      setUsernameModalVisible(true);
      return;
    }

    await gameBootstrapService.initializeNewGame();
    navigation.navigate('Game');
  };

  const startWithUsername = async () => {
    if (!username.trim()) {
      return;
    }

    await playerService.saveUsername(username);
    setUsernameModalVisible(false);
    await gameBootstrapService.initializeNewGame();
    navigation.navigate('Game');
  };

  return (
    <Screen>
      <TerminalHeader
        path="ROOT/MENU >"
        title="MemoFlip"
        subtitle="A fast memory grid built for clean reads, sharp taps, and short runs."
      />
      <View style={styles.hero}>
        <Text style={styles.logoText}>MemoFlip</Text>
        <Text style={styles.status}>SYSTEM ONLINE</Text>
      </View>
      <View style={styles.actions}>
        <AppButton label="Play" onPress={play} />
        <AppButton label="Leaderboards" onPress={() => navigation.navigate('Leaderboard')} variant="secondary" />
        <AppButton label="How to Play" onPress={() => navigation.navigate('Onboarding')} variant="secondary" />
        <AppButton label="Settings" onPress={() => navigation.navigate('Settings')} variant="ghost" />
        <AppButton label="Credits" onPress={() => navigation.navigate('Credits')} variant="ghost" />
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
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceLow,
    gap: spacing.md,
    overflow: 'hidden',
  },
  logoText: {
    color: colors.onSurface,
    fontFamily: type.fallback,
    fontSize: 38,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  status: {
    color: colors.secondary,
    fontFamily: type.fallback,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
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
  actions: {
    gap: spacing.sm,
  },
});
