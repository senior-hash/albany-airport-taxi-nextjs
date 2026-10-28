// Fires Google Ads conversion events for the two actions that matter on
// this site: a successful quote-form submit, and a tap on a call button
// (the best signal available for a tel: link — there's no way to know if
// the call actually connected). The quote-form action is live (set 2026-10-28).
// The call-click action doesn't have a conversion label yet — set it once
// its Tag setup screen shows one (Google Ads > Tools & Settings >
// Conversions > [the action] > Tag setup > "Use Google tag directly");
// until then it's a harmless no-op — calls still dial either way.
const CONVERSION_ID = "AW-18537237217"; // shared by both actions
const QUOTE_FORM_CONVERSION_LABEL = "3deZCIr16qwdEOGVn4dF";
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
