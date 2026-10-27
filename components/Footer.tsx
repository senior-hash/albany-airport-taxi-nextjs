import Link from "next/link";
import { BUSINESS } from "@/lib/content";
import { SOCIAL } from "@/lib/business";
import { Container } from "@/components/Container";
import { Phone } from "@/components/Phone";
import { PhoneIcon, ClockIcon, FacebookIcon, TripAdvisorIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-logo text-lg font-bold text-primary">
            {BUSINESS.dba} &ndash; Albany Airport Taxi &amp; Limo
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Serving the Albany, NY area and surrounding counties in New York,
            Massachusetts, and Vermont, 24 hours a day.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium text-ink">Services</p>
          <ul className="mt-3 space-y-2 text-ink-muted">
            <li><Link href="/airport-taxi" className="hover:text-ink">Airport Taxi</Link></li>
            <li><Link href="/long-distance" className="hover:text-ink">Long Distance</Link></li>
            <li><Link href="/hudson-valley" className="hover:text-ink">Hudson Valley Service</Link></li>
            <li><Link href="/services/non-emergency-medical-transportation" className="hover:text-ink">Non-Emergency Medical Transportation</Link></li>
            <li><Link href="/services/courier" className="hover:text-ink">Courier &amp; Messenger</Link></li>
            <li><Link href="/services/airbnb-transportation" className="hover:text-ink">Airbnb &amp; Vacation Rentals</Link></li>
            <li><Link href="/services/recovery-transportation" className="hover:text-ink">Recovery &amp; Treatment Transportation</Link></li>
            <li><Link href="/services/wedding" className="hover:text-ink">Wedding Guest Transportation</Link></li>
            <li><Link href="/services/corporate" className="hover:text-ink">Corporate Transportation</Link></li>
            <li><Link href="/venues" className="hover:text-ink">Venues We Serve</Link></li>
            <li><Link href="/service-area" className="hover:text-ink">Service Area</Link></li>
            <li><Link href="/cars" className="hover:text-ink">Our Fleet</Link></li>
            <li><Link href="/taxi-vs-uber-lyft" className="hover:text-ink">Taxi vs. Uber &amp; Lyft</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium text-ink">Company</p>
          <ul className="mt-3 space-y-2 text-ink-muted">
            <li><Link href="/about" className="hover:text-ink">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-ink">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium text-ink">Contact</p>
          <ul className="mt-3 space-y-2 text-ink-muted">
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
              <Phone className="hover:text-ink" />
            </li>
            <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-ink">{BUSINESS.email}</a></li>
            <li>{BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressRegion} {BUSINESS.postalCode}</li>
            <li className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 shrink-0 text-accent" />
              Available 24/7
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="text-ink-muted transition-colors hover:text-accent"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SOCIAL.tripadvisorRating} stars, ${SOCIAL.tripadvisorReviewCount} reviews on TripAdvisor`}
              className="flex items-center gap-1.5 text-ink-muted transition-colors hover:text-accent"
            >
              <TripAdvisorIcon className="h-5 w-5" />
              <span className="text-xs">
                {SOCIAL.tripadvisorRating} ({SOCIAL.tripadvisorReviewCount})
              </span>
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-border py-6 text-center text-xs text-ink-muted">
        &copy; {year} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
