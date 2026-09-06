import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, spacing, font } from '../tokens';

// ─── Icons (inline SVG, no icon library dependency) ──────────────────────────

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
      fill={active ? colors.primarySurface : 'none'}
    />
    <path
      d="M9 21V12h6v9"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
    />
  </svg>
);

const ShopIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
      fill={active ? colors.primarySurface : 'none'}
    />
    <line
      x1="3" y1="6" x2="21" y2="6"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
    />
    <path
      d="M16 10a4 4 0 01-8 0"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
    />
  </svg>
);

const CardsIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="2" y="5" width="20" height="14" rx="2"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
      fill={active ? colors.primarySurface : 'none'}
    />
    <line
      x1="2" y1="10" x2="22" y2="10"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
    />
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12" cy="8" r="4"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
      fill={active ? colors.primarySurface : 'none'}
    />
    <path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke={active ? colors.primary : colors.textMuted}
      strokeWidth="1.8"
    />
  </svg>
);

const NAV_ITEMS = [
  { label: 'Home', path: '/', Icon: HomeIcon },
  { label: 'Shop', path: '/shop', Icon: ShopIcon },
  { label: 'Cards', path: '/cards', Icon: CardsIcon },
  { label: 'Profile', path: '/profile', Icon: ProfileIcon },
];

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  headerRight?: React.ReactNode;
  transparentHeader?: boolean;
}

export default function AppShell({
  children,
  title,
  showBack,
  headerRight,
  transparentHeader,
}: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = NAV_ITEMS.find((n) =>
    n.path === '/' ? location.pathname === '/' : location.pathname.startsWith(n.path)
  )?.path ?? '/';

  return (
    <div style={styles.root}>
      {/* Mobile frame */}
      <div style={styles.frame}>
        {/* Header */}
        <header
          style={{
            ...styles.header,
            background: transparentHeader ? 'transparent' : colors.headerBg,
          }}
        >
          <div style={styles.headerInner}>
            {showBack ? (
              <button style={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M5 12l7-7M5 12l7 7"
                    stroke={colors.textOnDark}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <span style={styles.logo}>1Fi</span>
            )}
            {title && <span style={styles.headerTitle}>{title}</span>}
            <div style={styles.headerRightSlot}>{headerRight}</div>
          </div>
        </header>

        {/* Scrollable content */}
        <main style={styles.content}>{children}</main>

        {/* Bottom navigation */}
        <nav style={styles.bottomNav}>
          {NAV_ITEMS.map(({ label, path, Icon }) => {
            const active = path === activeTab;
            return (
              <button
                key={path}
                style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}
                onClick={() => navigate(path)}
                aria-label={label}
              >
                <Icon active={active} />
                <span
                  style={{
                    ...styles.navLabel,
                    color: active ? colors.primary : colors.textMuted,
                    fontWeight: active ? font.weightSemibold : font.weightRegular,
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh',
    background: colors.bgPage,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0',
  },
  frame: {
    width: '100%',
    maxWidth: 430,
    minHeight: '100vh',
    background: colors.bgPage,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 0 40px rgba(0,0,0,0.12)',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.md}px ${spacing.base}px`,
    minHeight: 56,
    gap: spacing.sm,
  },
  logo: {
    color: colors.textOnDark,
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    letterSpacing: '-0.5px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minWidth: 32,
  },
  headerTitle: {
    color: colors.textOnDark,
    fontSize: font.sizeLg,
    fontWeight: font.weightSemibold,
    flex: 1,
    textAlign: 'center',
    marginRight: 32, // balance the back button
  },
  headerRightSlot: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  } as React.CSSProperties,
  bottomNav: {
    display: 'flex',
    background: '#1A1A1A',
    borderTop: '1px solid #2A2A2A',
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
  navItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    padding: `${spacing.sm}px 0 ${spacing.sm + 2}px`,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  navItemActive: {},
  navLabel: {
    fontSize: font.sizeXs,
    lineHeight: 1,
  },
};
