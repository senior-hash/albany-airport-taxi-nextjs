import Link from "next/link";
import { CallButton } from "@/components/CallButton";

/** Sticky bottom CTA bar shown only on mobile (lg breakpoint and up relies on
 * the always-visible Header CallButton instead). Reuses CallButton rather
 * than a bespoke tel: link so the Google Ads `?n=` tracking swap stays
 * centralized in one place. Second button jumps to the quote-request form
 * (#quote-form, on the homepage hero) — the href works from any page since
 * it navigates to the homepage first if needed, then the browser scrolls to
 * that element. */
export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex gap-3 border-t border-white/10 bg-primary px-4 py-3 lg:hidden">
      <CallButton className="flex-1" />
      <Link
        href="/#quote-form"
        className="inline-flex h-14 flex-1 items-center justify-center rounded-full border border-white px-6 font-bold text-white transition-colors hover:bg-white hover:text-primary"
      >
        Get quote
      </Link>
    </div>
  );
}
