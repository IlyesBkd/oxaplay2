'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

      if (posthogKey && posthogHost) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          capture_pageview: false, // We'll handle this manually for SSR
          capture_pageleave: true,
          autocapture: false, // We want explicit tracking
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('[PostHog] Initialized successfully');
            }
          },
        });
      } else {
        console.warn('[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST');
      }
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
