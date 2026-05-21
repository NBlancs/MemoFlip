import { Dimensions } from 'react-native';

export const colors = {
  background: '#0a0a0a',
  surface: '#131313',
  surfaceLow: '#1c1b1b',
  surfaceHigh: '#2a2a2a',
  surfaceHighest: '#353534',
  onSurface: '#e5e2e1',
  onSurfaceMuted: '#b9cacb',
  outline: '#849495',
  outlineVariant: '#3a494b',
  primary: '#00f2ff',
  primarySoft: '#74f5ff',
  primaryOn: '#002022',
  secondary: '#b6f700',
  secondaryOn: '#141f00',
  danger: '#ffb4ab',
  dangerContainer: '#93000a',
  transparent: 'transparent',
};

const { width } = Dimensions.get('window');
const baseWidth = 390;

export const scale = (value: number) => Math.max(1, Math.round((width / baseWidth) * value));

export const spacing = {
  xxs: scale(4),
  xs: scale(8),
  sm: scale(12),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
};

export const type = {
  heading: 'Space Mono',
  body: 'JetBrains Mono',
  fallback: 'monospace',
};

export const touchTarget = scale(44);

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remaining = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${remaining}`;
};
