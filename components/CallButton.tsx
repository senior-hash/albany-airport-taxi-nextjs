import { BUSINESS } from "@/lib/content";

/**
 * Canonical phone CTA. Renders the single business number server-side (SEO-safe,
 * NAP-consistent, works with JS disabled). A call-tracking platform's client-side
 * script can later swap the visible number per county page for live visitors
 * only — see plan: "Call Tracking: Local Phone Numbers Per County". This
 * component intentionally does not accept a per-page phone override, so that
 * swap stays a pure client-side enhancement, not a build-time content change.
 */
export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${BUSINESS.phone}`}
      data-call-tracking-canonical={BUSINESS.phone}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-hover ${className}`}
    >
      Call {BUSINESS.phoneDisplay}
    </a>
  );
}
