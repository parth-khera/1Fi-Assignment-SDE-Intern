import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/AppShell';
import { colors, font, spacing, radius, shadow } from '../../tokens';

interface ShopOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  path: string;
  icon: React.ReactNode;
  available: boolean;
}

const SHOP_OPTIONS: ShopOption[] = [
  {
    id: 'top-brands',
    title: 'Top Brands',
    subtitle: 'Exclusive offers from leading brands',
    path: '/shop/top-brands',
    available: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke={colors.amber}
          strokeWidth="1.8"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: 'nearby-stores',
    title: 'Nearby Stores',
    subtitle: 'Shop at stores near you with 1Fi',
    path: '/shop/nearby',
    available: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke={colors.primary}
          strokeWidth="1.8"
          fill="none"
        />
        <circle cx="12" cy="9" r="2.5" stroke={colors.primary} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'marketplace',
    title: '1Fi Marketplace',
    subtitle: 'Buy now, pay in easy EMIs',
    badge: 'New',
    path: '/shop/marketplace',
    available: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke={colors.primary} strokeWidth="1.8" fill="none" />
        <path d="M16 7V5a4 4 0 00-8 0v2" stroke={colors.primary} strokeWidth="1.8" />
        <path d="M12 12v4M10 14h4" stroke={colors.primary} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ShopScreen() {
  const navigate = useNavigate();

  return (
    <AppShell title="Shop">
      <div style={styles.container}>
        {/* Section header */}
        <p style={styles.sectionLabel}>Where would you like to shop?</p>

        {/* Shop option cards */}
        <div style={styles.optionsList}>
          {SHOP_OPTIONS.map((option) => (
            <button
              key={option.id}
              style={{
                ...styles.optionCard,
                opacity: option.available ? 1 : 0.55,
                cursor: option.available ? 'pointer' : 'default',
              }}
              onClick={() => option.available && navigate(option.path)}
              disabled={!option.available}
            >
              <div style={styles.optionIconWrap}>{option.icon}</div>
              <div style={styles.optionText}>
                <div style={styles.optionTitleRow}>
                  <span style={styles.optionTitle}>{option.title}</span>
                  {option.badge && (
                    <span style={styles.badge}>{option.badge}</span>
                  )}
                  {!option.available && (
                    <span style={styles.comingSoon}>Coming soon</span>
                  )}
                </div>
                <span style={styles.optionSubtitle}>{option.subtitle}</span>
              </div>
              {option.available && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={styles.chevron}>
                  <path
                    d="M9 18l6-6-6-6"
                    stroke={colors.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* EMI info strip */}
        <div style={styles.infoStrip}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="9" stroke={colors.primary} strokeWidth="1.5" />
            <path d="M12 8v4M12 16h.01" stroke={colors.primary} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={styles.infoText}>
            Use your 1Fi credit limit to shop and pay in no-cost EMIs.
          </span>
        </div>
      </div>
    </AppShell>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: spacing.base,
  },
  sectionLabel: {
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: `${spacing.sm}px 0 ${spacing.md}px`,
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  optionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: `${spacing.base}px`,
    textAlign: 'left',
    width: '100%',
    boxShadow: shadow.card,
    transition: 'box-shadow 0.15s, transform 0.1s',
  },
  optionIconWrap: {
    width: 44,
    height: 44,
    background: colors.bgSurface,
    borderRadius: radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  optionTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  optionTitle: {
    fontSize: font.sizeBase,
    fontWeight: font.weightSemibold,
    color: colors.textPrimary,
  },
  badge: {
    fontSize: font.sizeXs,
    fontWeight: font.weightSemibold,
    color: colors.textOnDark,
    background: colors.primary,
    borderRadius: radius.pill,
    padding: '2px 7px',
    lineHeight: 1.4,
  },
  comingSoon: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    background: colors.bgSurface,
    borderRadius: radius.pill,
    padding: '2px 7px',
    lineHeight: 1.4,
  },
  optionSubtitle: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  chevron: {
    flexShrink: 0,
  },
  infoStrip: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.sm,
    background: colors.primarySurface,
    borderRadius: radius.md,
    padding: `${spacing.md}px ${spacing.base}px`,
    marginTop: spacing.xl,
    border: `1px solid ${colors.borderLight}`,
  },
  infoText: {
    fontSize: font.sizeSm,
    color: colors.primary,
    lineHeight: 1.5,
  },
};
