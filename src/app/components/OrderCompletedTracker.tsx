'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

interface OrderCompletedTrackerProps {
  orderId: string;
  productName: string;
  amount: number;
  currency: string;
  email: string;
}

export function OrderCompletedTracker({
  orderId,
  productName,
  amount,
  currency,
  email,
}: OrderCompletedTrackerProps) {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog && orderId) {
      try {
        // Identify user if not already done
        if (email) {
          posthog.identify(email);
        }

        // Track Order_Completed event
        posthog.capture('Order_Completed', {
          order_id: orderId,
          revenue: amount / 100, // Convert cents to currency units
          currency: currency.toUpperCase(),
          product_name: productName,
        });

        console.log('[PostHog] Order_Completed tracked:', orderId);
      } catch (error) {
        console.error('[PostHog] Error tracking Order_Completed:', error);
      }
    }
  }, [posthog, orderId, productName, amount, currency, email]);

  return null;
}
