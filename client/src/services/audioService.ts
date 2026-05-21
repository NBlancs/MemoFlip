import { Audio } from 'expo-av';

import { settingsService } from './settingsService';

type SoundName = 'tap' | 'match' | 'miss' | 'win' | 'pause';

let configured = false;

export const audioService = {
  async configure() {
    if (configured) {
      return;
    }

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    configured = true;
  },

  async playSound(_name: SoundName) {
    const settings = await settingsService.loadSettings();

    if (!settings.soundEnabled) {
      return;
    }
  },

  async startMusic() {
    const settings = await settingsService.loadSettings();

    if (!settings.musicEnabled) {
      return;
    }
  },

  async pauseAll() {
    await this.playSound('pause');
  },

  async resumeMusic() {
    await this.startMusic();
  },
};
