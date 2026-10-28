// Fires a Google Ads conversion event on a successful quote-form submit.
// Scaffolded ahead of having the real values — a "Website quote request"
// conversion action is still being set up in the Ads account (as of
// 2026-10-28). Set both values once the Tag setup screen shows them
// (Google Ads > Tools & Settings > Conversions > [the action] > Tag setup >
// "Use Google tag directly"). Until then this is a harmless no-op — the
// form still submits and emails fine either way.
const CONVERSION_ID = ""; // e.g. "AW-123456789"
const CONVERSION_LABEL = ""; // e.g. "AbC-D1efGHI23jklMN"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function fireQuoteFormConversion(): void {
  if (!CONVERSION_ID || !CONVERSION_LABEL) return;
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${CONVERSION_ID}/${CONVERSION_LABEL}` });
}
