import React from 'react';
import AppShell from '../components/AppShell';
import { colors, font, spacing, radius, shadow } from '../tokens';

export default function HomeScreen() {
  return (
    <AppShell>
      {/* Balance card — dark indigo, matching screenshot 2 */}
      <div style={styles.balanceCard}>
        <p style={styles.balanceLabel}>Available Balance</p>
        <p style={styles.balanceAmount}>₹1,24,500</p>
        <div style={styles.balanceRow}>
          <span style={styles.balanceSub}>Credit limit  ₹2,00,000</span>
          <span style={styles.balanceSub}>Due  ₹12,340</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={styles.section}>
        <p style={styles.sectionTitle}>Quick Actions</p>
        <div style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((a) => (
            <div key={a.label} style={styles.actionItem}>
              <div style={styles.actionIcon}>{a.icon}</div>
              <span style={styles.actionLabel}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions stub */}
      <div style={styles.section}>
        <p style={styles.sectionTitle}>Recent</p>
        {RECENT.map((t) => (
          <div key={t.id} style={styles.txRow}>
            <div style={styles.txIcon}>{t.icon}</div>
            <div style={styles.txInfo}>
              <span style={styles.txName}>{t.name}</span>
              <span style={styles.txDate}>{t.date}</span>
            </div>
            <span style={{ ...styles.txAmount, color: t.credit ? colors.primary : colors.textPrimary }}>
              {t.credit ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

const QUICK_ACTIONS = [
  { label: 'Pay', icon: '↑' },
  { label: 'Receive', icon: '↓' },
  { label: 'Shop', icon: '🛍' },
  { label: 'More', icon: '⋯' },
];

const RECENT = [
  { id: 1, name: 'Swiggy', date: 'Today, 1:30 PM', amount: 340, credit: false, icon: '🍔' },
  { id: 2, name: 'Salary credit', date: 'Yesterday', amount: 85000, credit: true, icon: '💼' },
  { id: 3, name: 'Amazon', date: '4 Sep', amount: 1299, credit: false, icon: '📦' },
];

const styles: Record<string, React.CSSProperties> = {
  balanceCard: {
    background: `linear-gradient(135deg, ${colors.headerBg} 0%, ${colors.headerBgDeep} 100%)`,
    margin: spacing.base,
    borderRadius: radius.lg,
    padding: spacing.xl,
    boxShadow: shadow.header,
  },
  balanceLabel: {
    color: colors.textOnDarkMuted,
    fontSize: font.sizeSm,
    margin: 0,
    marginBottom: spacing.xs,
    fontWeight: font.weightMedium,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  balanceAmount: {
    color: colors.textOnDark,
    fontSize: font.sizeXxl,
    fontWeight: font.weightBold,
    margin: 0,
    marginBottom: spacing.sm,
    letterSpacing: '-0.5px',
  },
  balanceRow: {
    display: 'flex',
    gap: spacing.xl,
  },
  balanceSub: {
    color: colors.textOnDarkMuted,
    fontSize: font.sizeSm,
  },
  section: {
    padding: `0 ${spacing.base}px ${spacing.base}px`,
  },
  sectionTitle: {
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: `${spacing.base}px 0 ${spacing.sm}px`,
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing.sm,
  },
  actionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
    background: colors.bgCard,
    borderRadius: radius.md,
    padding: `${spacing.md}px ${spacing.xs}px`,
    boxShadow: shadow.card,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionLabel: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
    fontWeight: font.weightMedium,
  },
  txRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    background: colors.bgCard,
    borderRadius: radius.md,
    padding: `${spacing.md}px ${spacing.base}px`,
    marginBottom: spacing.xs,
    boxShadow: shadow.card,
  },
  txIcon: {
    fontSize: 20,
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.bgSurface,
    borderRadius: radius.sm,
  },
  txInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  txName: {
    fontSize: font.sizeMd,
    fontWeight: font.weightMedium,
    color: colors.textPrimary,
  },
  txDate: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
  },
  txAmount: {
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
  },
};
