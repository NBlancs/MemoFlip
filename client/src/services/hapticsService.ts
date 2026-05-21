import * as Haptics from 'expo-haptics';

import { settingsService } from './settingsService';

export const hapticsService = {
  async selection() {
    const settings = await settingsService.loadSettings();

    if (settings.hapticsEnabled) {
      await Haptics.selectionAsync();
    }
  },

  async score() {
    const settings = await settingsService.loadSettings();

    if (settings.hapticsEnabled) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },

  async collision() {
    const settings = await settingsService.loadSettings();

    if (settings.hapticsEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  async finish() {
    const settings = await settingsService.loadSettings();

    if (settings.hapticsEnabled) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },
};
