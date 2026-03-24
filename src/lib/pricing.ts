/**
 * A/B Test pricing configuration
 * Feature Flag: pricing-tier-ab-test
 *
 * Prices are in CENTS (€).
 * The "original" price is the crossed-out reference price (always fixed).
 */

export const PRICING_FLAG = "pricing-tier-ab-test" as const;

export type PricingVariant = "control" | "test";

interface VariantPrices {
  voiture: number; // cents
  moto: number;    // cents
}

const VARIANT_PRICES: Record<PricingVariant, VariantPrices> = {
  control: { voiture: 100, moto: 9900 }, // TODO: revert voiture to 7900 after test
  test:    { voiture: 11900, moto: 13900 },
};

// Fixed crossed-out "original" prices (cents) — always the same
export const ORIGINAL_PRICES = {
  voiture: 19900, // 199,00 €
  moto: 19900,    // 199,00 €
} as const;

/**
 * Resolve the variant string from PostHog into a safe PricingVariant.
 * Falls back to "control" for any unknown / undefined / loading value.
 */
export function resolveVariant(raw: string | boolean | undefined): PricingVariant {
  if (raw === "test") return "test";
  return "control";
}

/**
 * Get prices (in cents) for a given variant.
 */
export function getPricesForVariant(variant: PricingVariant): VariantPrices {
  return VARIANT_PRICES[variant];
}

/**
 * Server-side: validate a (productSlug, variant) pair and return the
 * exact Stripe amount in cents. Returns null if invalid.
 */
export function getStripeAmount(
  productSlug: string,
  variant: string | undefined
): number | null {
  const v = resolveVariant(variant);
  const prices = VARIANT_PRICES[v];
  if (productSlug === "carplay-voiture") return prices.voiture;
  if (productSlug === "carplay-moto") return prices.moto;
  return null;
}

/**
 * Format cents → display string, e.g. 7900 → "79,00 €"
 */
export function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2).replace(".", ",")} €`;
}

/**
 * Compute discount percentage between original and actual price.
 */
export function discountPercent(original: number, actual: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - actual) / original) * 100);
}
