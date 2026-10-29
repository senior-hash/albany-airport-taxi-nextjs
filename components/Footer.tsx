import Link from "next/link";
import { BUSINESS } from "@/lib/content";
import { SOCIAL } from "@/lib/business";
import { Container } from "@/components/Container";
import { Phone } from "@/components/Phone";
import { LogoMark } from "@/components/LogoMark";
import { CopyrightYear } from "@/components/CopyrightYear";
import { PhoneIcon, ClockIcon, FacebookIcon, TripAdvisorIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-primary">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2.5 font-logo text-lg font-extrabold text-white">
            <LogoMark className="h-8 w-8 shrink-0 text-white" />
            {BUSINESS.dba} &ndash; Albany Airport Taxi &amp; Limo
          </p>
          <p className="mt-3 text-sm text-white/70">
            Serving the Albany, NY area and surrounding counties in New York,
            Massachusetts, and Vermont, 24 hours a day.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium text-white">Services</p>
          <ul className="mt-3 space-y-2 text-white/70">
            <li><Link href="/airport-taxi" className="hover:text-white">Airport Taxi</Link></li>
            <li><Link href="/long-distance" className="hover:text-white">Long Distance</Link></li>
            <li><Link href="/hudson-valley" className="hover:text-white">Hudson Valley Service</Link></li>
            <li><Link href="/services/non-emergency-medical-transportation" className="hover:text-white">Non-Emergency Medical Transportation</Link></li>
            <li><Link href="/services/courier" className="hover:text-white">Courier &amp; Messenger</Link></li>
            <li><Link href="/services/airbnb-transportation" className="hover:text-white">Airbnb &amp; Vacation Rentals</Link></li>
            <li><Link href="/services/recovery-transportation" className="hover:text-white">Recovery &amp; Treatment Transportation</Link></li>
            <li><Link href="/services/wedding" className="hover:text-white">Wedding Guest Transportation</Link></li>
            <li><Link href="/services/corporate" className="hover:text-white">Corporate Transportation</Link></li>
            <li><Link href="/venues" className="hover:text-white">Venues We Serve</Link></li>
            <li><Link href="/service-area" className="hover:text-white">Service Area</Link></li>
            <li><Link href="/cars" className="hover:text-white">Our Fleet</Link></li>
            <li><Link href="/taxi-vs-uber-lyft" className="hover:text-white">Taxi vs. Uber &amp; Lyft</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium text-white">Company</p>
          <ul className="mt-3 space-y-2 text-white/70">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/licensed-and-insured" className="hover:text-white">Licensed &amp; Insured</Link></li>
            <li><Link href="/cancellation-and-changes" className="hover:text-white">Cancellation &amp; Changes</Link></li>
            <li><Link href="/payment" className="hover:text-white">Payment</Link></li>
            <li><Link href="/safety" className="hover:text-white">Safety</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-white/70">
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
              <Phone className="hover:text-white" />
            </li>
            <li><Link href="/contact" className="hover:text-white">Email Us</Link></li>
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
              className="text-white/70 transition-colors hover:text-accent"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SOCIAL.tripadvisorRating} stars, ${SOCIAL.tripadvisorReviewCount} reviews on TripAdvisor`}
              className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-accent"
            >
              <TripAdvisorIcon className="h-5 w-5" />
              <span className="text-xs">
                {SOCIAL.tripadvisorRating} ({SOCIAL.tripadvisorReviewCount})
              </span>
            </a>
          </div>
          {/* Yelp is deliberately not linked here — thin, currently negative
           * sample (1.0, 2 reviews), see lib/business.ts. Add a Google
           * review link here once the Business Profile is reinstated
           * (currently suspended). */}
          <p className="mt-3 text-xs">
            <a
              href={SOCIAL.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline transition-colors hover:text-accent"
            >
              Read our reviews
            </a>
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        &copy; <CopyrightYear /> {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}
