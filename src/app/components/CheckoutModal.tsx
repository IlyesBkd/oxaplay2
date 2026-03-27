"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";
import type { PricingVariant } from "@/lib/pricing";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

/* ─── Product image map ─── */
const PRODUCT_IMAGES: Record<string, string> = {
  "carplay-voiture": "/Voiture/photos_produits/2.jpg",
  "carplay-moto": "/Moto/photos_produits/3.jpg",
};

/* ─── Stripe Appearance (Premium Native dark) ─── */
const STRIPE_APPEARANCE = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#ffffff",
    colorBackground: "#18181b",
    colorText: "#ffffff",
    colorTextSecondary: "#a1a1aa",
    colorTextPlaceholder: "#52525b",
    colorDanger: "#ef4444",
    colorIcon: "#a1a1aa",
    borderRadius: "12px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizeBase: "14px",
    spacingUnit: "4px",
    spacingGridRow: "16px",
    spacingGridColumn: "16px",
  },
  rules: {
    ".Tab": {
      border: "1px solid #27272a",
      backgroundColor: "#18181b",
      boxShadow: "none",
    },
    ".Tab:hover": {
      border: "1px solid #3f3f46",
      backgroundColor: "#27272a",
    },
    ".Tab--selected": {
      border: "1px solid #52525b",
      backgroundColor: "#27272a",
      boxShadow: "none",
    },
    ".Input": {
      border: "1px solid #3f3f46",
      backgroundColor: "#18181b",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #71717a",
      boxShadow: "none",
    },
    ".Label": {
      color: "#a1a1aa",
      fontSize: "13px",
    },
  },
};

/* ─── Zod Schema ─── */
const contactSchema = z.object({
  email: z.string().email("Email invalide"),
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  phone: z.string().optional(),
  line1: z.string().min(1, "Adresse requise"),
  line2: z.string().optional(),
  city: z.string().min(1, "Ville requise"),
  postalCode: z.string().min(1, "Code postal requis"),
  country: z.string().min(1, "Pays requis"),
});

type ContactForm = z.infer<typeof contactSchema>;

/* ─── Props ─── */
interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  productSlug: string;
  productName: string;
  price: string;
  variant: PricingVariant;
}

/* ─── Reassurance Badges (reused in both steps) ─── */
function ReassuranceBadges() {
  return (
    <div className="space-y-3 pt-4">
      {/* Security + payment badges */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[11px] font-medium">Paiement 100% s&eacute;curis&eacute;</span>
        </div>
        <span className="w-px h-3 bg-zinc-800" />
        <span className="text-[11px] text-zinc-600 font-medium">via Stripe</span>
      </div>

      {/* Card logos */}
      <div className="flex items-center justify-center">
        <Image src="/badges_paiement.png" alt="Visa, Mastercard, Amex, Apple Pay" width={200} height={24} className="h-5 w-auto object-contain opacity-40" />
      </div>
    </div>
  );
}

/* ─── Product Summary Card ─── */
function ProductSummary({ productSlug, productName, price }: { productSlug: string; productName: string; price: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
      {/* Product thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
        <Image
          src={PRODUCT_IMAGES[productSlug] || "/Voiture/photos_produits/2.jpg"}
          alt={productName}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white truncate">{productName}</h3>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-white tracking-tight">{price}</span>
        </div>

        <div className="flex items-center gap-3 mt-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Livraison gratuite
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Garantie 30 jours
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Payment Form ─── */
function PaymentStep({
  onSuccess,
  onBack,
  productSlug,
  productName,
  price,
}: {
  onSuccess: () => void;
  onBack: () => void;
  productSlug: string;
  productName: string;
  price: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (result.error) {
      setError(result.error.message || "Erreur de paiement");
      setLoading(false);
    }
  };

  const handleExpressCheckoutConfirm = useCallback(
    async (_event: StripeExpressCheckoutElementConfirmEvent) => {
      if (!stripe || !elements) return;
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });
      if (error) {
        setError(error.message || "Erreur de paiement express");
      }
    },
    [stripe, elements]
  );

  return (
    <div className="space-y-5 pt-4">
      {/* Product summary */}
      <ProductSummary productSlug={productSlug} productName={productName} price={price} />

      {/* Express Checkout (Apple Pay / Google Pay) */}
      <div>
        <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-3">
          Paiement express
        </p>
        <ExpressCheckoutElement
          options={{
            buttonType: {
              applePay: "buy",
              googlePay: "buy",
              paypal: "buynow",
            },
            buttonHeight: 52,
            layout: {
              maxColumns: 1,
              maxRows: 3,
              overflow: "never",
            },
            paymentMethods: {
              applePay: "always",
              googlePay: "always",
              paypal: "always",
            },
          }}
          onConfirm={handleExpressCheckoutConfirm}
        />
      </div>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-zinc-900 px-4 text-xs text-zinc-600">
            ou payer par carte
          </span>
        </div>
      </div>

      {/* Card Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="flex-1 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Traitement...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Payer maintenant
              </>
            )}
          </button>
        </div>

        {/* Reassurance */}
        <ReassuranceBadges />
      </form>
    </div>
  );
}

/* ─── Main Modal ─── */
export default function CheckoutModal({
  open,
  onClose,
  productSlug,
  productName,
  price,
  variant,
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { country: "FR" },
  });

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(1);
      setClientSecret(null);
    }
  }, [open]);

  const detectCurrency = (): "eur" | "usd" => {
    if (typeof navigator !== "undefined") {
      const lang = navigator.language || "";
      if (lang.includes("US") || lang.includes("en-US")) return "usd";
    }
    return "eur";
  };

  const onContactSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          productSlug,
          variant,
          currency: detectCurrency(),
          shipping: {
            line1: data.line1,
            line2: data.line2,
            city: data.city,
            postalCode: data.postalCode,
            country: data.country,
          },
        }),
      });
      const result = await res.json();
      if (result.clientSecret) {
        setClientSecret(result.clientSecret);
        setStep(2);
        
        // Track Checkout_Step_Completed and identify user
        if (posthog) {
          try {
            // Identify user with email
            posthog.identify(data.email);
            
            // Track step completion
            posthog.capture('Checkout_Step_Completed', {
              step: 1,
              product_name: productName,
              email: data.email,
            });
          } catch (error) {
            console.error('[PostHog] Error tracking step completion:', error);
          }
        }
      } else {
        console.error("Checkout error:", result.error);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSuccess = () => {
    window.location.href = "/success";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal: fullscreen mobile, centered popup desktop */}
      <div className="relative w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] bg-zinc-900 md:border md:border-zinc-800 md:rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col">
        {/* Close button - top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="relative px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white tracking-tight">Finaliser votre commande</h2>
        </div>

        {/* Progress Steps */}
        <div className="px-5 sm:px-8 py-4 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 transition-all ${step === 1 ? "opacity-100" : "opacity-50"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs transition-all ${
                step > 1 
                  ? "bg-white text-zinc-950" 
                  : "bg-zinc-800 text-white border border-zinc-700"
              }`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className="text-sm font-medium text-white">Informations</span>
            </div>
            
            <div className="flex-1 h-px bg-zinc-800 overflow-hidden">
              <div className={`h-full bg-white transition-all duration-500 ${step === 2 ? "w-full" : "w-0"}`} />
            </div>
            
            <div className={`flex items-center gap-2 transition-all ${step === 2 ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs transition-all ${
                step === 2 
                  ? "bg-zinc-800 text-white border border-zinc-700" 
                  : "bg-zinc-800/50 text-zinc-600 border border-zinc-800"
              }`}>
                2
              </div>
              <span className="text-sm font-medium text-white">Paiement</span>
            </div>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="px-4 sm:px-6 pb-6 flex-1 overflow-y-auto overflow-x-hidden">
          {step === 1 && (
            <form onSubmit={handleSubmit(onContactSubmit)} className="space-y-3 pt-4">
              {/* Product summary */}
              <ProductSummary productSlug={productSlug} productName={productName} price={price} />

              {/* Contact Section */}
              <div className="space-y-2.5 pt-2">
                <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Contact
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      {...register("firstName")}
                      placeholder="Prénom *"
                      className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠</span> {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("lastName")}
                      placeholder="Nom *"
                      className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠</span> {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email *"
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Shipping Section */}
              <div className="space-y-2.5 pt-1">
                <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Livraison
                </h3>

                <div>
                  <input
                    {...register("line1")}
                    placeholder="Adresse *"
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                  />
                  {errors.line1 && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <span>⚠</span> {errors.line1.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("line2")}
                    placeholder="Complément d'adresse (optionnel)"
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      {...register("postalCode")}
                      placeholder="Code postal *"
                      className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                    />
                    {errors.postalCode && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠</span> {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("city")}
                      placeholder="Ville *"
                      className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-all duration-300"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠</span> {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <select
                    {...register("country")}
                    className="w-full px-3 py-2.5 text-sm rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-zinc-500 transition-all duration-300 cursor-pointer"
                  >
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="DE">Allemagne</option>
                    <option value="ES">Espagne</option>
                    <option value="IT">Italie</option>
                    <option value="GB">Royaume-Uni</option>
                    <option value="US">&Eacute;tats-Unis</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Chargement...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Continuer vers le paiement
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>

                {/* Reassurance */}
                <ReassuranceBadges />
              </div>
            </form>
          )}

          {step === 2 && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: STRIPE_APPEARANCE,
              }}
            >
              <PaymentStep
                onSuccess={handleSuccess}
                onBack={() => setStep(1)}
                productSlug={productSlug}
                productName={productName}
                price={price}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
