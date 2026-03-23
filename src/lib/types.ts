export interface DbOrder {
  id: string;
  payment_intent_id: string;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  product_slug: string;
  total_price: number;
  currency: string;
  shipping: Record<string, string> | null;
  status: string;
  created_at: string;
}

export interface Prices {
  carplayVoitureEur: number;
  carplayVoitureUsd: number;
  carplayMotoEur: number;
  carplayMotoUsd: number;
  carplayVoitureDiscount: number;
  carplayMotoDiscount: number;
}

export const DEFAULT_PRICES: Prices = {
  carplayVoitureEur: 14999,
  carplayVoitureUsd: 16999,
  carplayMotoEur: 12999,
  carplayMotoUsd: 14999,
  carplayVoitureDiscount: 50,
  carplayMotoDiscount: 50,
};
