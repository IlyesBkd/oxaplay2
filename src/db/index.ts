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
    carplayVoitureEur: Number(r.carplay_voiture_eur),
    carplayVoitureUsd: Number(r.carplay_voiture_usd),
    carplayMotoEur: Number(r.carplay_moto_eur),
    carplayMotoUsd: Number(r.carplay_moto_usd),
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
      carplay_voiture_discount = ${prices.carplayVoitureDiscount},
      carplay_moto_discount = ${prices.carplayMotoDiscount}
    WHERE id = 'singleton'
  `;
}
