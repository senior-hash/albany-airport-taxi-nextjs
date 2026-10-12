import { BUSINESS } from "@/lib/business";
import { phoneToTelHref } from "@/lib/phone";

/**
 * Phone CTA. Defaults to the canonical business number (used site-wide, and
 * in the Organization JSON-LD schema, for NAP consistency). Pages for a
 * specific county can pass that county's real static tracking number
 * instead — these are genuine local numbers for that service area, not a
 * client-side swap, so it's safe to render them server-side and they still
 * show up correctly with JS disabled or to crawlers.
 */
export function CallButton({
  className = "",
  phone,
  phoneDisplay,
}: {
  className?: string;
  phone?: string;
  phoneDisplay?: string;
}) {
  const display = phoneDisplay ?? BUSINESS.phoneDisplay;
  const href = phone ? phoneToTelHref(phone) : `tel:${BUSINESS.phone}`;
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-bright px-6 py-3 font-medium text-primary transition-colors hover:bg-accent-bright-hover ${className}`}
    >
      Call {display}
    </a>
  );
}
