"use client";

import { BUSINESS } from "@/lib/business";
import { phoneToTelHref } from "@/lib/phone";
import { useAdPhone } from "@/components/AdPhoneProvider";
import { PhoneIcon } from "@/components/icons";

/**
 * Phone CTA. Defaults to the canonical business number (used site-wide, and
 * in the Organization JSON-LD schema, for NAP consistency). Pages for a
 * specific county can pass that county's real static tracking number
 * instead via `phoneDisplay` — these are genuine local numbers for that
 * service area, not a client-side swap, so it's safe to render them
 * server-side and they still show up correctly with JS disabled or to
 * crawlers.
 *
 * A Google Ads tracking number (see AdPhoneProvider) always wins over
 * whatever `phoneDisplay` was passed, client-side after mount — it's the
 * one case where showing a different number than the crawled HTML is
 * correct, since it only ever applies to a visitor who just clicked that
 * specific ad.
 */
export function CallButton({
  className = "",
  phoneDisplay,
  compactOnMobile = false,
}: {
  className?: string;
  phoneDisplay?: string;
  /** Below the sm breakpoint, shrink to an icon-only circle (no visible
   * text) — used in the Header, where the full-width pill plus the
   * hamburger menu doesn't fit on narrow screens. The text stays in the
   * accessible name via aria-label. */
  compactOnMobile?: boolean;
}) {
  const adPhone = useAdPhone();
  const display = adPhone ?? phoneDisplay ?? BUSINESS.phoneDisplay;
  return (
    <a
      href={phoneToTelHref(display)}
      aria-label={compactOnMobile ? `Call ${display}` : undefined}
      className={`inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent-bright font-bold text-primary transition-colors hover:bg-accent-bright-hover ${compactOnMobile ? "w-14 px-0 sm:w-auto sm:px-6" : "px-6"} ${className}`}
    >
      <PhoneIcon className="h-5 w-5 shrink-0" />
      <span className={compactOnMobile ? "hidden sm:inline" : undefined}>Call {display}</span>
    </a>
  );
}
