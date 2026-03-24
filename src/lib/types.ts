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
  // Prix réel de vente (ce que le client paie)
  carplayVoitureEur: number;
  carplayVoitureUsd: number;
  carplayMotoEur: number;
  carplayMotoUsd: number;
  // Prix original barré (avant réduction)
  carplayVoitureOriginalEur: number;
  carplayVoitureOriginalUsd: number;
  carplayMotoOriginalEur: number;
  carplayMotoOriginalUsd: number;
  // Pourcentage de réduction pour affichage
  carplayVoitureDiscount: number;
  carplayMotoDiscount: number;
}

export const DEFAULT_PRICES: Prices = {
  // Prix de vente réels
  carplayVoitureEur: 14999, // 149,99€
  carplayVoitureUsd: 16999, // 169,99$
  carplayMotoEur: 12999,    // 129,99€
  carplayMotoUsd: 14999,    // 149,99$
  // Prix originaux barrés
  carplayVoitureOriginalEur: 29999, // 299,99€
  carplayVoitureOriginalUsd: 33999, // 339,99$
  carplayMotoOriginalEur: 25999,    // 259,99€
  carplayMotoOriginalUsd: 29999,    // 299,99$
  // Pourcentages de réduction
  carplayVoitureDiscount: 50,
  carplayMotoDiscount: 50,
};
