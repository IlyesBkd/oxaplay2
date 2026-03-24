"use client";

import { useEffect, useRef } from "react";

interface GoogleAdsConversionProps {
  orderId: string;
  amount: number;
  currency: string;
}

/**
 * Component to track Google Ads conversion on the success page
 * Ensures conversion is only tracked once per transaction_id
 */
export function GoogleAdsConversion({
  orderId,
  amount,
  currency,
}: GoogleAdsConversionProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per order
    if (hasTracked.current) {
      console.log("[Google Ads] Conversion already tracked for this order");
      return;
    }

    // Wait for gtag to be available
    if (typeof window !== "undefined" && window.gtag) {
      try {
        // Track conversion event
        window.gtag("event", "conversion", {
          send_to: "AW-18013095662/WzGECJa-rY4cEO6NqI1D",
          value: amount / 100, // Convert from cents to currency unit
          currency: currency.toUpperCase(),
          transaction_id: orderId,
        });

        console.log("[Google Ads] Conversion tracked:", {
          orderId,
          value: amount / 100,
          currency: currency.toUpperCase(),
        });

        hasTracked.current = true;
      } catch (error) {
        console.error("[Google Ads] Error tracking conversion:", error);
      }
    } else {
      console.warn("[Google Ads] gtag not available yet");
      
      // Retry after a short delay if gtag is not ready
      const timeout = setTimeout(() => {
        if (window.gtag && !hasTracked.current) {
          try {
            window.gtag("event", "conversion", {
              send_to: "AW-18013095662/WzGECJa-rY4cEO6NqI1D",
              value: amount / 100,
              currency: currency.toUpperCase(),
              transaction_id: orderId,
            });

            console.log("[Google Ads] Conversion tracked (delayed):", {
              orderId,
              value: amount / 100,
              currency: currency.toUpperCase(),
            });

            hasTracked.current = true;
          } catch (error) {
            console.error("[Google Ads] Error tracking conversion (delayed):", error);
          }
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [orderId, amount, currency]);

  return null; // This component doesn't render anything
}
