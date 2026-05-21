export interface PlayerProfile {
  username: string;
}

const key = 'memoflip-player-profile';

type BasicStorage = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
};

let memoryProfile: PlayerProfile | null = null;

const getStorage = (): BasicStorage | undefined => {
  const maybeStorage = globalThis as typeof globalThis & { localStorage?: BasicStorage };
  return maybeStorage.localStorage;
};

const sanitizeUsername = (username: string) => username.trim().replace(/\s+/g, ' ').slice(0, 24);

export const playerService = {
  async getProfile(): Promise<PlayerProfile | null> {
    const stored = getStorage()?.getItem(key);

    if (!stored) {
      return memoryProfile;
    }

    try {
      const parsed = JSON.parse(stored) as PlayerProfile;
      memoryProfile = parsed.username ? { username: sanitizeUsername(parsed.username) } : null;
    } catch {
      memoryProfile = null;
    }

    return memoryProfile;
  },

  async saveUsername(username: string): Promise<PlayerProfile> {
    const profile = { username: sanitizeUsername(username) };
    memoryProfile = profile;
    getStorage()?.setItem(key, JSON.stringify(profile));
    return profile;
  },
};
