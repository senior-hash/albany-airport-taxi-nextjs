import Link from "next/link";
import { CallButton } from "@/components/CallButton";
import { Container } from "@/components/Container";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/airport-taxi", label: "Airports" },
  { href: "/long-distance", label: "Long Distance" },
  { href: "/venues", label: "Venues" },
  { href: "/cars", label: "Fleet" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-primary">
          Albany Airport Taxi <span className="text-ink-muted font-normal">&amp; Limo</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-muted lg:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <CallButton className="shrink-0 text-sm" />
      </Container>
    </header>
  );
}
