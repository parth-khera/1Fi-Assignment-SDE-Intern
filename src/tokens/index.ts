// Design tokens extracted from 1Fi app screenshots
// Screenshot 1: light lavender bg, purple primary
// Screenshot 2: dark indigo header, white cards, red/amber accents

export const colors = {
  // Primary brand purple (buttons, active states, links)
  primary: '#6C28D9',
  primaryLight: '#9B5CF6',
  primarySurface: '#F3EEFF',

  // Dark indigo header (from screenshot 2)
  headerBg: '#2A1198',
  headerBgDeep: '#1E0C80',

  // Backgrounds
  bgPage: '#F6F6F6',       // screenshot 2 outer bg
  bgCard: '#FFFFFF',
  bgSurface: '#F8F5FF',    // screenshot 1 lavender tint

  // Text
  textPrimary: '#181819',
  textSecondary: '#6B6B6B',
  textMuted: '#9E9E9E',
  textOnDark: '#FFFFFF',
  textOnDarkMuted: 'rgba(255,255,255,0.65)',

  // Accents
  red: '#DC0F2B',          // screenshot 2 red accent
  amber: '#F6B137',        // screenshot 2 gold/amber
  amberDark: '#E8A020',

  // Borders / dividers
  border: '#E8E8E8',
  borderLight: '#F0EDF8',

  // States
  disabled: '#C4C4C4',
  disabledBg: '#F5F5F5',
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const font = {
  sizeXs: 11,
  sizeSm: 12,
  sizeMd: 14,
  sizeBase: 15,
  sizeLg: 17,
  sizeXl: 20,
  sizeXxl: 24,

  weightRegular: '400',
  weightMedium: '500',
  weightSemibold: '600',
  weightBold: '700',
};

export const shadow = {
  card: '0 1px 4px rgba(0,0,0,0.07)',
  cardHover: '0 2px 10px rgba(108,40,217,0.10)',
  header: '0 2px 8px rgba(0,0,0,0.18)',
};
