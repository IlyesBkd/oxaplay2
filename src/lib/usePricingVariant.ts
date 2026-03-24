"use client";

import { useFeatureFlagVariantKey } from "posthog-js/react";
import {
  PRICING_FLAG,
  resolveVariant,
  getPricesForVariant,
  ORIGINAL_PRICES,
  formatPrice,
  discountPercent,
  type PricingVariant,
} from "./pricing";

export interface PricingData {
  variant: PricingVariant;
  loading: boolean;
  voiture: {
    actual: number;       // cents
    original: number;     // cents
    discount: number;     // %
    formatted: string;    // "79,00 €"
    formattedOriginal: string;
  };
  moto: {
    actual: number;
    original: number;
    discount: number;
    formatted: string;
    formattedOriginal: string;
  };
}

/**
 * Hook that reads the PostHog feature flag and returns fully resolved pricing.
 * Shows skeleton (loading=true) until PostHog resolves.
 */
export function usePricingVariant(): PricingData {
  const raw = useFeatureFlagVariantKey(PRICING_FLAG);

  // PostHog returns undefined while loading, then string | boolean
  const loading = raw === undefined;
  const variant = resolveVariant(raw as string | boolean | undefined);
  const prices = getPricesForVariant(variant);

  return {
    variant,
    loading,
    voiture: {
      actual: prices.voiture,
      original: ORIGINAL_PRICES.voiture,
      discount: discountPercent(ORIGINAL_PRICES.voiture, prices.voiture),
      formatted: formatPrice(prices.voiture),
      formattedOriginal: formatPrice(ORIGINAL_PRICES.voiture),
    },
    moto: {
      actual: prices.moto,
      original: ORIGINAL_PRICES.moto,
      discount: discountPercent(ORIGINAL_PRICES.moto, prices.moto),
      formatted: formatPrice(prices.moto),
      formattedOriginal: formatPrice(ORIGINAL_PRICES.moto),
    },
  };
}
