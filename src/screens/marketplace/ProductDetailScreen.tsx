import React, { useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppShell from '../../components/AppShell';
import { ErrorState } from '../../components/States';
import { getProduct, getVariant, formatPrice } from '../../data/products';
import type { Variant, EmiPlan } from '../../data/products';
import { colors, font, spacing, radius } from '../../tokens';

// ─── State ────────────────────────────────────────────────────────────────────

interface DetailState {
  selectedVariantId: string;
  selectedEmiId: string | null;
  imageIndex: number;
}

type DetailAction =
  | { type: 'SELECT_VARIANT'; id: string; defaultEmiId: string }
  | { type: 'SELECT_EMI'; id: string }
  | { type: 'SET_IMAGE'; index: number };

function reducer(state: DetailState, action: DetailAction): DetailState {
  switch (action.type) {
    case 'SELECT_VARIANT':
      return { ...state, selectedVariantId: action.id, selectedEmiId: action.defaultEmiId, imageIndex: 0 };
    case 'SELECT_EMI':
      return { ...state, selectedEmiId: action.id };
    case 'SET_IMAGE':
      return { ...state, imageIndex: action.index };
    default:
      return state;
  }
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProductDetailScreen() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = productId ? getProduct(productId) : undefined;

  const defaultVariant = product?.variants.find((v) => v.id === product.defaultVariantId);

  const [state, dispatch] = useReducer(reducer, {
    selectedVariantId: product?.defaultVariantId ?? '',
    selectedEmiId: defaultVariant?.emiPlans[0]?.id ?? null,
    imageIndex: 0,
  });

  if (!product) {
    return (
      <AppShell showBack title="Product">
        <ErrorState message="Product not found." onRetry={() => navigate('/shop/marketplace')} />
      </AppShell>
    );
  }

  const selectedVariant = getVariant(product, state.selectedVariantId)!;
  const selectedEmi = selectedVariant.emiPlans.find((p) => p.id === state.selectedEmiId) ?? null;
  const canProceed = selectedVariant.available && selectedEmi !== null;

  function handleVariantSelect(variant: Variant) {
    dispatch({
      type: 'SELECT_VARIANT',
      id: variant.id,
      defaultEmiId: variant.emiPlans[0]?.id ?? '',
    });
  }

  function handleProceed() {
    if (!canProceed) return;
    navigate('/shop/marketplace/review', {
      state: {
        product,
        variant: selectedVariant,
        emiPlan: selectedEmi,
      },
    });
  }

  return (
    <AppShell showBack>
      {/* Product images */}
      <div style={styles.imageSection}>
        <div style={styles.mainImageWrap}>
          <img
            src={product.images[state.imageIndex] ?? product.images[0]}
            alt={product.name}
            style={styles.mainImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/400x300/F3EEFF/6C28D9?text=${encodeURIComponent(product.name)}`;
            }}
          />
        </div>
        {product.images.length > 1 && (
          <div style={styles.imageDots}>
            {product.images.map((_, i) => (
              <button
                key={i}
                style={{
                  ...styles.dot,
                  ...(i === state.imageIndex ? styles.dotActive : {}),
                }}
                onClick={() => dispatch({ type: 'SET_IMAGE', index: i })}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div style={styles.body}>
        {/* Name + price */}
        <div style={styles.nameRow}>
          <div>
            <p style={styles.brand}>{product.brand}</p>
            <h1 style={styles.name}>{product.name}</h1>
          </div>
          <div style={styles.priceBlock}>
            <span style={styles.price}>{formatPrice(selectedVariant.price)}</span>
            {selectedVariant.mrp > selectedVariant.price && (
              <span style={styles.mrp}>{formatPrice(selectedVariant.mrp)}</span>
            )}
          </div>
        </div>

        <p style={styles.tagline}>{product.tagline}</p>

        <Divider />

        {/* Variant selector */}
        <Section title="Choose variant">
          <div style={styles.variantGrid}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                style={{
                  ...styles.variantChip,
                  ...(v.id === state.selectedVariantId ? styles.variantChipActive : {}),
                  ...(v.available ? {} : styles.variantChipUnavailable),
                }}
                onClick={() => v.available && handleVariantSelect(v)}
                disabled={!v.available}
                title={v.available ? undefined : 'Out of stock'}
              >
                {v.label}
                {!v.available && <span style={styles.outOfStock}> · Out of stock</span>}
              </button>
            ))}
          </div>
        </Section>

        <Divider />

        {/* EMI plan selector */}
        <Section title="Select EMI plan">
          <div style={styles.emiList}>
            {selectedVariant.emiPlans.map((plan) => (
              <EmiPlanRow
                key={plan.id}
                plan={plan}
                selected={plan.id === state.selectedEmiId}
                onSelect={() => dispatch({ type: 'SELECT_EMI', id: plan.id })}
              />
            ))}
          </div>
          <p style={styles.emiDisclaimer}>
            * EMI amounts are indicative. Final terms subject to credit approval.
          </p>
        </Section>

        <Divider />

        {/* Highlights */}
        <Section title="Highlights">
          <ul style={styles.highlights}>
            {product.highlights.map((h) => (
              <li key={h} style={styles.highlightItem}>
                <span style={styles.bullet}>·</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Spacer for sticky CTA */}
        <div style={{ height: 80 }} />
      </div>

      {/* Sticky CTA */}
      <div style={styles.ctaBar}>
        <div style={styles.ctaSummary}>
          {selectedEmi ? (
            <>
              <span style={styles.ctaEmiAmount}>{formatPrice(selectedEmi.monthlyAmount)}/mo</span>
              <span style={styles.ctaEmiLabel}>
                {selectedEmi.months} months · {selectedEmi.label}
              </span>
            </>
          ) : (
            <span style={styles.ctaEmiLabel}>Select an EMI plan</span>
          )}
        </div>
        <button
          style={{
            ...styles.ctaBtn,
            ...(canProceed ? {} : styles.ctaBtnDisabled),
          }}
          onClick={handleProceed}
          disabled={!canProceed}
        >
          Proceed
        </button>
      </div>
    </AppShell>
  );
}

// ─── EMI plan row ─────────────────────────────────────────────────────────────

function EmiPlanRow({
  plan,
  selected,
  onSelect,
}: {
  plan: EmiPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      style={{
        ...styles.emiRow,
        ...(selected ? styles.emiRowSelected : {}),
      }}
      onClick={onSelect}
    >
      {/* Radio indicator */}
      <div style={{ ...styles.radio, ...(selected ? styles.radioSelected : {}) }}>
        {selected && <div style={styles.radioDot} />}
      </div>

      {/* Plan info */}
      <div style={styles.emiInfo}>
        <div style={styles.emiTopRow}>
          <span style={styles.emiMonths}>{plan.months} months</span>
          {plan.interestRate === 0 && (
            <span style={styles.noCostTag}>No-cost</span>
          )}
        </div>
        <div style={styles.emiBottomRow}>
          <span style={styles.emiMonthly}>{formatPrice(plan.monthlyAmount)}/mo</span>
          <span style={styles.emiTotal}>Total {formatPrice(plan.totalAmount)}</span>
        </div>
        {plan.processingFee > 0 && (
          <span style={styles.emiProcessing}>
            Processing fee ₹{plan.processingFee}
          </span>
        )}
      </div>
    </button>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function Divider() {
  return <div style={{ height: 1, background: colors.border, margin: `${spacing.base}px 0` }} />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: spacing.sm }}>
      <p style={styles.sectionTitle}>{title}</p>
      {children}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  imageSection: {
    background: colors.bgSurface,
    borderBottom: `1px solid ${colors.borderLight}`,
  },
  mainImageWrap: {
    width: '100%',
    paddingTop: '65%',
    position: 'relative',
    overflow: 'hidden',
  },
  mainImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: spacing.base,
    boxSizing: 'border-box',
  },
  imageDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: `${spacing.sm}px 0 ${spacing.md}px`,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: colors.border,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'background 0.15s',
  },
  dotActive: {
    background: colors.primary,
    width: 18,
    borderRadius: 3,
  },
  body: {
    padding: `${spacing.base}px ${spacing.base}px 0`,
  },
  nameRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  brand: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    fontWeight: font.weightMedium,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    margin: 0,
    marginBottom: 2,
  },
  name: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
    margin: 0,
    lineHeight: 1.2,
  },
  priceBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  price: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  mrp: {
    fontSize: font.sizeSm,
    color: colors.textMuted,
    textDecoration: 'line-through',
  },
  tagline: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    margin: `${spacing.xs}px 0 0`,
    lineHeight: 1.5,
  },
  sectionTitle: {
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    margin: `0 0 ${spacing.sm}px`,
  },
  variantGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  variantChip: {
    padding: `${spacing.xs + 2}px ${spacing.md}px`,
    borderRadius: radius.sm,
    border: `1.5px solid ${colors.border}`,
    background: colors.bgCard,
    color: colors.textPrimary,
    fontSize: font.sizeSm,
    fontWeight: font.weightMedium,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  variantChipActive: {
    borderColor: colors.primary,
    background: colors.primarySurface,
    color: colors.primary,
  },
  variantChipUnavailable: {
    opacity: 0.4,
    cursor: 'not-allowed',
    textDecoration: 'line-through',
  },
  outOfStock: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
  },
  emiList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  emiRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: `${spacing.md}px`,
    borderRadius: radius.md,
    border: `1.5px solid ${colors.border}`,
    background: colors.bgCard,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'border-color 0.15s, background 0.15s',
  },
  emiRowSelected: {
    borderColor: colors.primary,
    background: colors.primarySurface,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: `2px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
    transition: 'border-color 0.15s',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: colors.primary,
  },
  emiInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  emiTopRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  emiMonths: {
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    color: colors.textPrimary,
  },
  noCostTag: {
    fontSize: font.sizeXs,
    fontWeight: font.weightSemibold,
    color: colors.primary,
    background: colors.primarySurface,
    borderRadius: radius.pill,
    padding: '2px 7px',
    border: `1px solid ${colors.borderLight}`,
  },
  emiBottomRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  emiMonthly: {
    fontSize: font.sizeMd,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  emiTotal: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  emiProcessing: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
  },
  emiDisclaimer: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 1.5,
  },
  highlights: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  highlightItem: {
    display: 'flex',
    gap: spacing.sm,
    fontSize: font.sizeSm,
    color: colors.textSecondary,
    lineHeight: 1.5,
  },
  bullet: {
    color: colors.primary,
    fontWeight: font.weightBold,
    flexShrink: 0,
  },
  ctaBar: {
    position: 'sticky',
    bottom: 0,
    background: colors.bgCard,
    borderTop: `1px solid ${colors.border}`,
    padding: `${spacing.md}px ${spacing.base}px`,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    zIndex: 50,
    boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
  },
  ctaSummary: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  ctaEmiAmount: {
    fontSize: font.sizeLg,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
  },
  ctaEmiLabel: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
  },
  ctaBtn: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    background: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: radius.md,
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'opacity 0.15s',
  },
  ctaBtnDisabled: {
    background: colors.disabled,
    cursor: 'not-allowed',
  },
};
