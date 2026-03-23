import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sql } from "@/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      productSlug,
      currency,
      shipping,
    } = await req.json();

    if (!email || !firstName || !lastName || !productSlug) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    // Get price from DB
    const stripeCurrency = (currency || "eur").toLowerCase();
    const priceRows = await sql`SELECT * FROM prices WHERE id = 'singleton'`;

    let amount: number;
    if (priceRows.length) {
      const r = priceRows[0] as Record<string, unknown>;
      if (productSlug === "carplay-voiture") {
        amount = stripeCurrency === "usd" ? Number(r.carplay_voiture_usd) : Number(r.carplay_voiture_eur);
      } else if (productSlug === "carplay-moto") {
        amount = stripeCurrency === "usd" ? Number(r.carplay_moto_usd) : Number(r.carplay_moto_eur);
      } else {
        return NextResponse.json({ error: "Produit inconnu." }, { status: 400 });
      }
    } else {
      // Fallback defaults
      amount = productSlug === "carplay-voiture"
        ? (stripeCurrency === "usd" ? 16999 : 14999)
        : (stripeCurrency === "usd" ? 14999 : 12999);
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: stripeCurrency,
      description: `OxaPlay — ${productSlug}`,
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });

    // Insert order as PENDING
    const customerName = `${firstName} ${lastName}`;
    const customerAddress = shipping
      ? `${shipping.line1}${shipping.line2 ? ", " + shipping.line2 : ""}, ${shipping.postalCode} ${shipping.city}, ${shipping.country}`
      : null;

    await sql`
      INSERT INTO orders (
        payment_intent_id, customer_email, customer_name, customer_phone,
        customer_address, product_slug, total_price, currency, shipping, status
      ) VALUES (
        ${paymentIntent.id}, ${email}, ${customerName}, ${phone || null},
        ${customerAddress}, ${productSlug}, ${amount}, ${stripeCurrency},
        ${shipping ? JSON.stringify(shipping) : null}::jsonb, 'PENDING'
      )
    `;

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("[POST /api/checkout] Error:", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement." }, { status: 500 });
  }
}
