// Fires Google Ads conversion events for the two actions that matter on
// this site: a successful quote-form submit, and a tap on a call button
// (the best signal available for a tel: link — there's no way to know if
// the call actually connected). Both conversion actions are still being
// set up in the Ads account (as of 2026-10-28); set each pair of values
// once its Tag setup screen shows them (Google Ads > Tools & Settings >
// Conversions > [the action] > Tag setup > "Use Google tag directly").
// Until then these are harmless no-ops — forms still submit/email and
// calls still dial either way.
const CONVERSION_ID = ""; // e.g. "AW-123456789" — shared by both actions
const QUOTE_FORM_CONVERSION_LABEL = ""; // e.g. "AbC-D1efGHI23jklMN"
const CALL_CLICK_CONVERSION_LABEL = ""; // e.g. "XyZ-A9bcDEF45ghiJK"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fireConversion(label: string): void {
  if (!CONVERSION_ID || !label) return;
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: `${CONVERSION_ID}/${label}` });
}

export function fireQuoteFormConversion(): void {
  fireConversion(QUOTE_FORM_CONVERSION_LABEL);
}

export function fireCallClickConversion(): void {
  fireConversion(CALL_CLICK_CONVERSION_LABEL);
}
