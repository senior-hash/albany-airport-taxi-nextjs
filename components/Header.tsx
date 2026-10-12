"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CallButton } from "@/components/CallButton";
import { Container } from "@/components/Container";
import { MobileMenu } from "@/components/MobileMenu";
import { LOCAL_PHONE_BY_SLUG } from "@/lib/local-phones";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/airport-taxi", label: "Airports" },
  { href: "/long-distance", label: "Long Distance" },
  { href: "/venues", label: "Venues" },
  { href: "/cars", label: "Fleet" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/** On a /airport-taxi/[airport]/[place] page, swap the header's call button to
 * that county's real local number client-side — the server-rendered markup
 * (what crawlers and JS-disabled visitors see) keeps the one canonical
 * number for NAP consistency with the Organization JSON-LD, since the
 * header is identical sitewide chrome rather than page-specific content. */
function useLocalPhone(): string | undefined {
  const pathname = usePathname();
  const placeSlug = pathname.match(/^\/airport-taxi\/[^/]+\/([^/]+)\/?$/)?.[1];
  return placeSlug ? LOCAL_PHONE_BY_SLUG[placeSlug] : undefined;
}

export function Header() {
  const localPhone = useLocalPhone();
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-logo text-lg font-bold tracking-tight text-primary">Albany Airport Taxi</span>
          <span className="font-logo text-[11px] font-medium uppercase tracking-[0.18em] text-accent">&amp; Limo</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-muted lg:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <CallButton className="shrink-0 text-sm" phone={localPhone} phoneDisplay={localPhone} />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </header>
  );
}
