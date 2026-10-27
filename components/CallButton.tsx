"use client";

import { BUSINESS } from "@/lib/business";
import { phoneToTelHref } from "@/lib/phone";
import { useAdPhone } from "@/components/AdPhoneProvider";

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
}: {
  className?: string;
  phoneDisplay?: string;
}) {
  const adPhone = useAdPhone();
  const display = adPhone ?? phoneDisplay ?? BUSINESS.phoneDisplay;
  return (
    <a
      href={phoneToTelHref(display)}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-bright px-6 py-3 font-medium text-primary transition-colors hover:bg-accent-bright-hover ${className}`}
    >
      Call {display}
    </a>
  );
}
