import { neon } from "@neondatabase/serverless";
import type { DbOrder, Prices } from "@/lib/types";
import { DEFAULT_PRICES } from "@/lib/types";

// ─── SQL Connection ──────────────────────────────────────────────────
export const sql = neon(process.env.DATABASE_URL!);

// ─── Orders ──────────────────────────────────────────────────────────
export async function getOrders(): Promise<DbOrder[]> {
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows as unknown as DbOrder[];
}

export async function getOrderByPaymentId(paymentIntentId: string): Promise<DbOrder | null> {
  const rows = await sql`
    SELECT * FROM orders WHERE payment_intent_id = ${paymentIntentId}
  `;
  return (rows[0] as unknown as DbOrder) || null;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  await sql`
    UPDATE orders SET status = ${status} WHERE id = ${orderId}::uuid
  `;
}

// ─── Prices ──────────────────────────────────────────────────────────
export async function getPrices(): Promise<Prices> {
  const rows = await sql`SELECT * FROM prices WHERE id = 'singleton'`;
  if (!rows.length) return DEFAULT_PRICES;
  const r = rows[0] as Record<string, unknown>;
  return {
    // Prix de vente réels
    carplayVoitureEur: Number(r.carplay_voiture_eur),
    carplayVoitureUsd: Number(r.carplay_voiture_usd),
    carplayMotoEur: Number(r.carplay_moto_eur),
    carplayMotoUsd: Number(r.carplay_moto_usd),
    // Prix originaux barrés
    carplayVoitureOriginalEur: Number(r.carplay_voiture_original_eur || 29999),
    carplayVoitureOriginalUsd: Number(r.carplay_voiture_original_usd || 33999),
    carplayMotoOriginalEur: Number(r.carplay_moto_original_eur || 25999),
    carplayMotoOriginalUsd: Number(r.carplay_moto_original_usd || 29999),
    // Pourcentages de réduction
    carplayVoitureDiscount: Number(r.carplay_voiture_discount || 50),
    carplayMotoDiscount: Number(r.carplay_moto_discount || 50),
  };
}

export async function updatePrices(prices: Prices): Promise<void> {
  await sql`
    UPDATE prices SET
      carplay_voiture_eur = ${prices.carplayVoitureEur},
      carplay_voiture_usd = ${prices.carplayVoitureUsd},
      carplay_moto_eur = ${prices.carplayMotoEur},
      carplay_moto_usd = ${prices.carplayMotoUsd},
      carplay_voiture_original_eur = ${prices.carplayVoitureOriginalEur},
      carplay_voiture_original_usd = ${prices.carplayVoitureOriginalUsd},
      carplay_moto_original_eur = ${prices.carplayMotoOriginalEur},
      carplay_moto_original_usd = ${prices.carplayMotoOriginalUsd},
      carplay_voiture_discount = ${prices.carplayVoitureDiscount},
      carplay_moto_discount = ${prices.carplayMotoDiscount}
    WHERE id = 'singleton'
  `;
}
