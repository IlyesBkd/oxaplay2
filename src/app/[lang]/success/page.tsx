import Link from "next/link";
import Stripe from "stripe";
import { getOrderByPaymentId, updateOrderStatus } from "@/db";
import { notifyNewOrder } from "@/lib/discord";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { OrderCompletedTracker } from "@/app/components/OrderCompletedTracker";
import { GoogleAdsConversion } from "@/app/components/GoogleAdsConversion";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PRODUCT_LABELS: Record<string, string> = {
  "carplay-voiture": "CarPlay Voiture",
  "carplay-moto": "CarPlay Moto",
};

interface SuccessPageProps {
  searchParams: Promise<{ payment_intent?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { payment_intent } = await searchParams;

  let orderData: {
    id: string;
    productName: string;
    amount: number;
    currency: string;
    status: string;
    email: string;
  } | null = null;

  let error: string | null = null;

  if (payment_intent) {
    try {
      const order = await getOrderByPaymentId(payment_intent);

      if (!order) {
        error = "Commande introuvable.";
      } else {
        const pi = await stripe.paymentIntents.retrieve(payment_intent);

        const wasPending = order.status === "PENDING";
        const productName = PRODUCT_LABELS[order.product_slug] || order.product_slug;

        if (pi.status === "succeeded" && wasPending) {
          await updateOrderStatus(order.id, "PAID");

          console.log(`[SUCCESS] Commande ${order.id} marquée PAID`);

          // Trigger Discord + Resend in parallel (fail silently)
          await Promise.all([
            notifyNewOrder({
              orderId: order.id,
              email: order.customer_email,
              productName,
              amount: order.total_price,
              currency: order.currency,
            }).catch((err) => console.error("[DISCORD] Échec silencieux:", err)),

            order.customer_email
              ? sendOrderConfirmationEmail({
                  to: order.customer_email,
                  orderId: order.id,
                  productName,
                  amount: order.total_price,
                  currency: order.currency,
                }).catch((err) => console.error("[RESEND] Échec silencieux:", err))
              : Promise.resolve(),
          ]);
        }

        orderData = {
          id: order.id,
          productName,
          amount: order.total_price,
          currency: order.currency,
          status: pi.status === "succeeded" ? "PAID" : order.status,
          email: order.customer_email,
        };
      }
    } catch (err) {
      console.error("[SUCCESS PAGE] Erreur:", err);
      error = "Une erreur est survenue lors de la vérification.";
    }
  }

  const formatPrice = (amount: number, currency: string) => {
    const val = (amount / 100).toFixed(2);
    return currency === "usd" ? `$${val}` : `${val} €`;
  };

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      {/* PostHog Order Tracking */}
      {orderData && (
        <>
          <OrderCompletedTracker
            orderId={orderData.id}
            productName={orderData.productName}
            amount={orderData.amount}
            currency={orderData.currency}
            email={orderData.email}
          />
          {/* Google Ads Conversion Tracking */}
          <GoogleAdsConversion
            orderId={orderData.id}
            amount={orderData.amount}
            currency={orderData.currency}
          />
        </>
      )}
      
      <div className="max-w-lg mx-auto px-6 text-center py-20">
        {/* Neon success icon */}
        <div className="relative w-24 h-24 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full bg-green-500/20 blur-[30px]" />
          <div className="relative w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Paiement réussi !
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Votre commande est confirmée.
        </p>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-4 mb-8 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Order summary card */}
        {orderData && (
          <div className="rounded-2xl bg-zinc-900/50 border border-white/[0.08] overflow-hidden mb-8 text-left">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.15em]">Récapitulatif de commande</p>
            </div>

            <div className="px-6 py-3.5 flex justify-between border-b border-white/[0.04]">
              <span className="text-sm text-gray-500">N° Commande</span>
              <span className="text-sm font-mono font-semibold text-white">#{orderData.id.slice(0, 8).toUpperCase()}</span>
            </div>

            <div className="px-6 py-3.5 flex justify-between border-b border-white/[0.04]">
              <span className="text-sm text-gray-500">Produit</span>
              <span className="text-sm font-semibold text-white">{orderData.productName}</span>
            </div>

            <div className="px-6 py-3.5 flex justify-between border-b border-white/[0.04]">
              <span className="text-sm text-gray-500">Total payé</span>
              <span className="text-lg font-bold text-white">{formatPrice(orderData.amount, orderData.currency)}</span>
            </div>

            <div className="px-6 py-3.5 flex justify-between">
              <span className="text-sm text-gray-500">Statut</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {orderData.status}
              </span>
            </div>
          </div>
        )}

        {/* Reassurance */}
        <div className="rounded-xl bg-zinc-800/30 border border-zinc-800 px-5 py-4 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-white">Confirmation envoyée</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Un email de confirmation vous a été envoyé{orderData?.email ? ` à ${orderData.email}` : ""}. Expédition sous 48h.
          </p>
        </div>

        {/* Shipping info */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            <span className="text-sm font-semibold text-white">Livraison estimée</span>
          </div>
          <p className="text-sm text-gray-400">Livraison gratuite en 48h ouvrées par Colissimo.</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-zinc-950 text-sm font-semibold transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
