"use client";

import { BUSINESS } from "@/lib/business";
import { phoneToTelHref } from "@/lib/phone";
import { useAdPhone } from "@/components/AdPhoneProvider";
import { fireCallClickConversion } from "@/lib/google-ads-conversion";

/** Plain-text/inline phone mention + tel: link (e.g. the footer's contact
 * list). For the call-to-action pill button, use CallButton instead — both
 * share the same ad-tracking override via useAdPhone. */
export function Phone({ className = "", fallback }: { className?: string; fallback?: string }) {
  const adPhone = useAdPhone();
  const display = adPhone ?? fallback ?? BUSINESS.phoneDisplay;
  return (
    <a href={phoneToTelHref(display)} onClick={fireCallClickConversion} className={className}>
      {display}
    </a>
  );
}
