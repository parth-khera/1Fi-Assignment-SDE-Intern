import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/AppShell';
import { ErrorState, EmptyState, SkeletonCard } from '../../components/States';
import { PRODUCTS, formatPrice, getMinEmi } from '../../data/products';
import type { Product } from '../../data/products';
import { colors, font, spacing, radius, shadow } from '../../tokens';

const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Tablets', 'Audio', 'Home'];

// Simulate async data fetch
function useProducts(category: string) {
  const [state, setState] = useState<{
    status: 'loading' | 'success' | 'error';
    data: Product[];
  }>({ status: 'loading', data: [] });

  useEffect(() => {
    setState({ status: 'loading', data: [] });
    const timer = setTimeout(() => {
      // Simulate occasional error for demo (never actually errors in this mock)
      const filtered =
        category === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
      setState({ status: 'success', data: filtered });
    }, 600);
    return () => clearTimeout(timer);
  }, [category]);

  return state;
}

export default function MarketplaceScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const { status, data: products } = useProducts(activeCategory);

  return (
    <AppShell
      title="1Fi Marketplace"
      showBack
      headerRight={
        <button style={styles.searchBtn} aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" />
            <path d="M16.5 16.5l4 4" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      }
    >
      {/* Category filter */}
      <div style={styles.categoryScroll}>
        <div style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.categoryChip,
                ...(activeCategory === cat ? styles.categoryChipActive : {}),
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Credit info bar */}
      <div style={styles.creditBar}>
        <span style={styles.creditText}>
          Available credit  <strong style={{ color: colors.primary }}>₹1,24,500</strong>
        </span>
        <span style={styles.creditSep}>·</span>
        <span style={styles.creditText}>No-cost EMI available</span>
      </div>

      {/* Product grid */}
      <div style={styles.grid}>
        {status === 'loading' &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {status === 'error' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <ErrorState message="Couldn't load products." onRetry={() => setActiveCategory(activeCategory)} />
          </div>
        )}

        {status === 'success' && products.length === 0 && (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyState title="No products found" subtitle="Try a different category." />
          </div>
        )}

        {status === 'success' &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/shop/marketplace/${product.id}`)}
            />
          ))}
      </div>
    </AppShell>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId)!;
  const minEmi = getMinEmi(defaultVariant);
  const hasDiscount = defaultVariant.mrp > defaultVariant.price;

  return (
    <button style={styles.card} onClick={onClick}>
      {/* Product image */}
      <div style={styles.imageWrap}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={styles.image}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/300x200/F3EEFF/6C28D9?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {hasDiscount && (
          <span style={styles.discountBadge}>
            {Math.round(((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100)}% off
          </span>
        )}
      </div>

      {/* Info */}
      <div style={styles.cardBody}>
        <span style={styles.cardBrand}>{product.brand}</span>
        <span style={styles.cardName}>{product.name}</span>
        <span style={styles.cardTagline}>{product.tagline}</span>

        <div style={styles.cardPriceRow}>
          <span style={styles.cardPrice}>{formatPrice(defaultVariant.price)}</span>
          {hasDiscount && (
            <span style={styles.cardMrp}>{formatPrice(defaultVariant.mrp)}</span>
          )}
        </div>

        <div style={styles.emiHint}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke={colors.primary} strokeWidth="2" />
            <line x1="2" y1="10" x2="22" y2="10" stroke={colors.primary} strokeWidth="2" />
          </svg>
          <span>EMI from {formatPrice(minEmi)}/mo</span>
        </div>
      </div>
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  categoryScroll: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    padding: `${spacing.md}px ${spacing.base}px 0`,
  } as React.CSSProperties,
  categoryRow: {
    display: 'flex',
    gap: spacing.xs,
    paddingBottom: spacing.md,
    width: 'max-content',
  },
  categoryChip: {
    padding: `${spacing.xs + 2}px ${spacing.md}px`,
    borderRadius: radius.pill,
    border: `1px solid ${colors.border}`,
    background: colors.bgCard,
    color: colors.textSecondary,
    fontSize: font.sizeSm,
    fontWeight: font.weightMedium,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s',
  },
  categoryChipActive: {
    background: colors.primary,
    borderColor: colors.primary,
    color: '#fff',
  },
  creditBar: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm}px ${spacing.base}px`,
    background: colors.bgSurface,
    borderBottom: `1px solid ${colors.borderLight}`,
  },
  creditText: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  creditSep: {
    color: colors.textMuted,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.sm,
    padding: spacing.base,
  },
  card: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    cursor: 'pointer',
    boxShadow: shadow.card,
    transition: 'box-shadow 0.15s',
    padding: 0,
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    paddingTop: '70%',
    background: colors.bgSurface,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    background: colors.red,
    color: '#fff',
    fontSize: font.sizeXs,
    fontWeight: font.weightSemibold,
    borderRadius: radius.sm,
    padding: '2px 6px',
  },
  cardBody: {
    padding: `${spacing.sm}px ${spacing.md}px ${spacing.md}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  cardBrand: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    fontWeight: font.weightMedium,
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  cardName: {
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    color: colors.textPrimary,
    lineHeight: 1.3,
  },
  cardTagline: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
    lineHeight: 1.4,
    marginBottom: spacing.xs,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as React.CSSProperties,
  cardPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: 'auto',
  },
  cardPrice: {
    fontSize: font.sizeMd,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  cardMrp: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    textDecoration: 'line-through',
  },
  emiHint: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: font.sizeXs,
    color: colors.primary,
    fontWeight: font.weightMedium,
    marginTop: 4,
  },
  searchBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },
};
