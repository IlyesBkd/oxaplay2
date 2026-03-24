import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sql } from "@/db";
import { getStripeAmount } from "@/lib/pricing";

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
      variant,
      currency,
      shipping,
    } = await req.json();

    if (!email || !firstName || !lastName || !productSlug) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    // Resolve price from A/B test variant (server-side validation)
    const stripeCurrency = (currency || "eur").toLowerCase();
    const amount = getStripeAmount(productSlug, variant);

    if (amount === null) {
      return NextResponse.json({ error: "Produit inconnu." }, { status: 400 });
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
