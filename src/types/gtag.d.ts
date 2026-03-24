// TypeScript declarations for Google Ads gtag.js

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: 'event' | 'config' | 'js' | 'set',
      targetOrAction: string | Date,
      params?: {
        send_to?: string;
        value?: number;
        currency?: string;
        transaction_id?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export {};
