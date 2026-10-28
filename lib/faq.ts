import "server-only";
import fs from "node:fs";
import path from "node:path";

export type FAQItem = { question: string; answer: string };

const FAQ_DIR = path.join(process.cwd(), "content", "faq");

// Per-page FAQ data, one JSON file per page keyed by a path-like slug (e.g.
// "airport-taxi/jfk", "services/wedding") — real questions researched from
// actual searches, not generic filler. Returns [] for any page without a
// file yet, which FAQ/faqSchema both treat as "render nothing".
export function getPageFAQ(key: string): FAQItem[] {
  const file = path.join(FAQ_DIR, `${key}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as FAQItem[];
}

// Real, grounded questions — researched from a direct local competitor's
// own FAQ page (taxialbanyny.com) to confirm these are genuinely asked in
// this market, not generic/global filler. Answers are based only on
// confirmed facts about this business; anything not yet confirmed (formal
// licensing/insurance status, the specific cancellation-credit window) is
// deliberately left general or omitted rather than guessed at.
export const GENERAL_FAQ: FAQItem[] = [
  {
    question: "How is this different from using Uber or Lyft?",
    answer:
      "We're a local, dispatched car service, not an app matching you with a rotating pool of drivers. Rates are flat with no surge pricing, and we cover rural towns across our 23-county service area where rideshare driver coverage is often thin or nonexistent.",
  },
  {
    question: "Do you serve JFK, LaGuardia, and Newark airports?",
    answer:
      "Yes. We provide door-to-door car service to and from JFK, LaGuardia, and Newark, in addition to Albany International and Boston Logan.",
  },
  {
    question: "Are your fares fixed, or do you run a meter?",
    answer:
      "Flat, transparent pricing — the price you're quoted is what you pay, with no surge charges for weather, holidays, or traffic.",
  },
  {
    question: "How do I book a ride?",
    answer:
      "Call us to book. We'll text you to verify your trip details and confirm our terms before your ride.",
  },
  {
    question: "How do I pay?",
    answer:
      "Payment is prepaid before your ride. Our preferred payment methods are Venmo, Zelle, and Cash App. Card payments are also accepted, with a 10% processing fee.",
  },
  {
    question: "Do I need to tip my driver?",
    answer: "Tipping is optional, and can be added to your payment when you book.",
  },
  {
    question: "Can you track my flight for airport pickups?",
    answer:
      "Yes — we track your flight automatically once you book, so your pickup adjusts for early arrivals or delays. You can also look up any flight's live status yourself.",
  },
  {
    question: "Do you charge extra if my pickup is far from town?",
    answer:
      "No. Our flat rate covers your pickup location — we don't add a separate charge for a longer pickup drive.",
  },
  {
    question: "What if I need to cancel or change my ride?",
    answer:
      "Cancel or change your ride by texting us as early as possible. Call or text us directly for the specifics of our current cancellation policy.",
  },
  {
    question: "Can I bring my pet?",
    answer: "Yes, well-behaved pets are welcome.",
  },
  {
    question: "Do you have a wheelchair-accessible vehicle?",
    answer:
      "Not currently as part of our standard fleet. Call us to discuss your specific mobility needs and we'll do our best to accommodate you.",
  },
  {
    question: "Do you serve towns outside Albany?",
    answer:
      "Yes — we serve 23 counties across New York, Vermont, and Massachusetts, including the Hudson Valley, Adirondacks, and Berkshires.",
  },
  {
    question: "Do you offer corporate accounts for businesses?",
    answer: "Yes. Call us to set up a recurring corporate account for regular business travel.",
  },
];

// Short, genuinely localized FAQ for county pages — real county name, real
// city count, and the real per-county tracking number, not a generic
// template with the name swapped in. Deliberately kept to 2 questions
// rather than repeating the whole general FAQ on all 23 county pages.
export function getLocalFAQ(opts: {
  countyName: string;
  stateName: string;
  cityCount: number;
  trackingPhone: string | null;
  airportName: string;
}): FAQItem[] {
  const phone = opts.trackingPhone ?? "(518) 327-0700";
  return [
    {
      question: `Do you provide taxi service throughout ${opts.countyName}?`,
      answer: `Yes — we provide door-to-door taxi and car service to and from ${opts.airportName}, across all ${opts.cityCount} towns and cities we serve in ${opts.countyName}, ${opts.stateName}.`,
    },
    {
      question: `What's the local number for ${opts.countyName}?`,
      answer: `Call ${phone} for service in ${opts.countyName} — it rings directly through to us, same drivers and dispatch as our main line.`,
    },
  ];
}
