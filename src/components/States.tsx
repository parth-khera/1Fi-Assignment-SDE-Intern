import React from 'react';
import { colors, font, spacing } from '../tokens';

// ─── Loading spinner ──────────────────────────────────────────────────────────

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <div style={styles.center}>
      <div style={styles.spinner} />
      <p style={styles.msg}>{message}</p>
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

export function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={styles.center}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke={colors.textSecondary} strokeWidth="1.5" />
        <path d="M9 9h6M9 12h4" stroke={colors.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p style={styles.emptyTitle}>{title}</p>
      {subtitle && <p style={styles.msg}>{subtitle}</p>}
    </div>
  );
}

// ─── Error state ─────────────────────────────────────────────────────────────

export function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div style={styles.center}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
        <circle cx="12" cy="12" r="9" stroke={colors.red} strokeWidth="1.5" />
        <path d="M12 8v4M12 16h.01" stroke={colors.red} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <p style={{ ...styles.emptyTitle, color: colors.textPrimary }}>{message}</p>
      {onRetry && (
        <button style={styles.retryBtn} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

export function SkeletonCard() {
  return (
    <div style={styles.skeletonCard}>
      <div style={{ ...styles.skeletonBlock, height: 160, borderRadius: 8, marginBottom: spacing.sm }} />
      <div style={{ ...styles.skeletonBlock, height: 14, width: '60%', marginBottom: 6 }} />
      <div style={{ ...styles.skeletonBlock, height: 12, width: '40%' }} />
    </div>
  );
}

const pulse: React.CSSProperties = {
  animation: 'pulse 1.4s ease-in-out infinite',
};

const styles: Record<string, React.CSSProperties> = {
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.xxl * 2}px ${spacing.base}px`,
    gap: spacing.md,
    textAlign: 'center',
  },
  spinner: {
    width: 32,
    height: 32,
    border: `3px solid ${colors.borderLight}`,
    borderTopColor: colors.primary,
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
  msg: {
    fontSize: font.sizeMd,
    color: colors.textMuted,
    margin: 0,
  },
  emptyTitle: {
    fontSize: font.sizeLg,
    fontWeight: font.weightSemibold,
    color: colors.textSecondary,
    margin: 0,
  },
  retryBtn: {
    marginTop: spacing.sm,
    padding: `${spacing.sm}px ${spacing.xl}px`,
    background: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    cursor: 'pointer',
  },
  skeletonCard: {
    background: colors.bgCard,
    borderRadius: 10,
    padding: spacing.md,
    ...pulse,
  },
  skeletonBlock: {
    background: colors.borderLight,
    borderRadius: 4,
    ...pulse,
  },
};
