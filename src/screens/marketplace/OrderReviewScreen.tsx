import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppShell from '../../components/AppShell';
import { ErrorState } from '../../components/States';
import { formatPrice } from '../../data/products';
import type { Product, Variant, EmiPlan } from '../../data/products';
import { colors, font, spacing, radius, shadow } from '../../tokens';

interface ReviewState {
  product: Product;
  variant: Variant;
  emiPlan: EmiPlan;
}

export default function OrderReviewScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ReviewState | null;
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!state?.product || !state?.variant || !state?.emiPlan) {
    return (
      <AppShell showBack title="Review Order">
        <ErrorState
          message="Order details not found."
          onRetry={() => navigate('/shop/marketplace')}
        />
      </AppShell>
    );
  }

  const { product, variant, emiPlan } = state;

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1200);
  }

  if (confirmed) {
    return <ConfirmationView product={product} variant={variant} emiPlan={emiPlan} />;
  }

  return (
    <AppShell showBack title="Review Order">
      <div style={styles.container}>
        {/* Product summary */}
        <div style={styles.card}>
          <div style={styles.productRow}>
            <div style={styles.productImageWrap}>
              <img
                src={product.images[0]}
                alt={product.name}
                style={styles.productImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/80x80/F3EEFF/6C28D9?text=${encodeURIComponent(product.brand)}`;
                }}
              />
            </div>
            <div style={styles.productInfo}>
              <span style={styles.productBrand}>{product.brand}</span>
              <span style={styles.productName}>{product.name}</span>
              <span style={styles.productVariant}>{variant.label}</span>
            </div>
            <span style={styles.productPrice}>{formatPrice(variant.price)}</span>
          </div>
        </div>

        {/* EMI plan summary */}
        <SectionCard title="EMI Plan">
          <Row label="Plan" value={`${emiPlan.months} months · ${emiPlan.label}`} />
          <Row label="Monthly EMI" value={formatPrice(emiPlan.monthlyAmount)} bold />
          <Row label="Total payable" value={formatPrice(emiPlan.totalAmount)} />
          {emiPlan.processingFee > 0 && (
            <Row label="Processing fee" value={`₹${emiPlan.processingFee}`} />
          )}
          {emiPlan.interestRate > 0 && (
            <Row label="Interest rate" value={`${emiPlan.interestRate}% p.a.`} />
          )}
        </SectionCard>

        {/* Payment source */}
        <SectionCard title="Payment via">
          <div style={styles.paymentRow}>
            <div style={styles.paymentIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke={colors.primary} strokeWidth="1.8" />
                <line x1="2" y1="10" x2="22" y2="10" stroke={colors.primary} strokeWidth="1.8" />
              </svg>
            </div>
            <div style={styles.paymentInfo}>
              <span style={styles.paymentName}>1Fi Credit</span>
              <span style={styles.paymentSub}>Available limit ₹1,24,500</span>
            </div>
          </div>
        </SectionCard>

        {/* Disclaimer */}
        <p style={styles.disclaimer}>
          This is a demo order. No actual transaction will be processed. EMI amounts are indicative and subject to credit approval.
        </p>

        {/* CTA */}
        <button
          style={{ ...styles.confirmBtn, ...(loading ? styles.confirmBtnLoading : {}) }}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Processing…' : `Confirm · ${formatPrice(emiPlan.monthlyAmount)}/mo`}
        </button>
      </div>
    </AppShell>
  );
}

// ─── Confirmation view ────────────────────────────────────────────────────────

function ConfirmationView({
  product,
  variant,
  emiPlan,
}: {
  product: Product;
  variant: Variant;
  emiPlan: EmiPlan;
}) {
  const navigate = useNavigate();

  return (
    <AppShell title="Order Placed">
      <div style={styles.confirmContainer}>
        {/* Success icon */}
        <div style={styles.successIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={colors.primary} />
            <path
              d="M7 12l3.5 3.5L17 8"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 style={styles.confirmTitle}>Order request submitted</h2>
        <p style={styles.confirmSubtitle}>
          Your {product.brand} {product.name} ({variant.label}) has been added to your 1Fi EMI plan.
        </p>

        {/* Summary card */}
        <div style={{ ...styles.card, width: '100%', boxSizing: 'border-box' }}>
          <Row label="Product" value={`${product.name} · ${variant.label}`} />
          <Row label="Monthly EMI" value={formatPrice(emiPlan.monthlyAmount)} bold />
          <Row label="Duration" value={`${emiPlan.months} months`} />
          <Row label="Total" value={formatPrice(emiPlan.totalAmount)} />
        </div>

        <p style={styles.demoNote}>
          Demo mode — no real transaction was processed.
        </p>

        <button
          style={styles.doneBtn}
          onClick={() => navigate('/shop/marketplace')}
        >
          Back to Marketplace
        </button>
      </div>
    </AppShell>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={styles.row}>
      <span style={styles.rowLabel}>{label}</span>
      <span style={{ ...styles.rowValue, ...(bold ? styles.rowValueBold : {}) }}>{value}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: spacing.base,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  card: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: `${spacing.md}px ${spacing.base}px`,
    boxShadow: shadow.card,
  },
  cardTitle: {
    fontSize: font.sizeSm,
    fontWeight: font.weightSemibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    margin: `0 0 ${spacing.md}px`,
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  productImageWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    background: colors.bgSurface,
    overflow: 'hidden',
    flexShrink: 0,
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: 6,
    boxSizing: 'border-box',
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  productBrand: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  productName: {
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    color: colors.textPrimary,
  },
  productVariant: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
  },
  productPrice: {
    fontSize: font.sizeMd,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
    flexShrink: 0,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    marginBottom: spacing.xs,
    borderBottom: `1px solid ${colors.border}`,
  },
  rowLabel: {
    fontSize: font.sizeSm,
    color: colors.textSecondary,
  },
  rowValue: {
    fontSize: font.sizeSm,
    color: colors.textPrimary,
    fontWeight: font.weightMedium,
  },
  rowValueBold: {
    fontSize: font.sizeMd,
    fontWeight: font.weightBold,
    color: colors.primary,
  },
  paymentRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  paymentIcon: {
    width: 36,
    height: 36,
    background: colors.bgSurface,
    borderRadius: radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  paymentName: {
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    color: colors.textPrimary,
  },
  paymentSub: {
    fontSize: font.sizeXs,
    color: colors.textSecondary,
  },
  disclaimer: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    lineHeight: 1.5,
    textAlign: 'center',
    padding: `0 ${spacing.sm}px`,
  },
  confirmBtn: {
    width: '100%',
    padding: `${spacing.base}px`,
    background: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: radius.md,
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    cursor: 'pointer',
    marginTop: spacing.xs,
    transition: 'opacity 0.15s',
  },
  confirmBtnLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  // Confirmation view
  confirmContainer: {
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.base,
  },
  successIcon: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  confirmTitle: {
    fontSize: font.sizeXl,
    fontWeight: font.weightBold,
    color: colors.textPrimary,
    margin: 0,
    textAlign: 'center',
  },
  confirmSubtitle: {
    fontSize: font.sizeMd,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 1.5,
    margin: 0,
  },
  demoNote: {
    fontSize: font.sizeXs,
    color: colors.textMuted,
    textAlign: 'center',
  },
  doneBtn: {
    width: '100%',
    padding: `${spacing.base}px`,
    background: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: radius.md,
    fontSize: font.sizeMd,
    fontWeight: font.weightSemibold,
    cursor: 'pointer',
    marginTop: spacing.sm,
  },
};
