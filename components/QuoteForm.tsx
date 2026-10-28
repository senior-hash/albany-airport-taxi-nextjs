"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { fireQuoteFormConversion } from "@/lib/google-ads-conversion";

// Same Web3Forms pipeline as ContactForm (see that file for why: no new
// server-side code on the cPanel account, no account/password to manage).
// Uses its own access key so quote requests can route to a different inbox
// (bookings@uslimoandtaxi.com) than the general contact form — falls back
// to the shared key until that dedicated one is set up.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_QUOTE_ACCESS_KEY ?? process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const AIRPORTS = [
  "Albany International (ALB)",
  "JFK",
  "LaGuardia (LGA)",
  "Newark (EWR)",
  "Boston Logan",
  "Bradley",
  "Albany-Rensselaer Amtrak",
  "Other address",
];

type TripType = "to-airport" | "from-airport" | "other";

const TRIP_TABS: { value: TripType; label: string }[] = [
  { value: "to-airport", label: "To airport" },
  { value: "from-airport", label: "From airport" },
  { value: "other", label: "Other trip" },
];

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => number;
      reset: (widgetId?: number) => void;
    };
    onQuoteRecaptchaApiLoad?: () => void;
  }
}

export function QuoteForm() {
  const [tripType, setTripType] = useState<TripType>("to-airport");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "captcha-required">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  function renderCaptcha() {
    if (!RECAPTCHA_SITE_KEY || !captchaRef.current || !window.grecaptcha || widgetId.current !== null) return;
    widgetId.current = window.grecaptcha.render(captchaRef.current, {
      sitekey: RECAPTCHA_SITE_KEY,
      callback: (token) => setCaptchaToken(token),
      "expired-callback": () => setCaptchaToken(""),
    });
  }

  useEffect(() => {
    window.onQuoteRecaptchaApiLoad = renderCaptcha;
    return () => {
      delete window.onQuoteRecaptchaApiLoad;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ACCESS_KEY) {
      setStatus("error");
      return;
    }
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setStatus("captcha-required");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    // See ContactForm.tsx: the token is intentionally NOT forwarded to
    // Web3Forms — their free tier rejects any submission containing
    // g-recaptcha-response with a "Pro feature" error. The checkbox above
    // still gates submission client-side.
    const formData = new FormData(form);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const json = await res.json().catch(() => null);
      setStatus(res.status === 200 ? "sent" : "error");
      if (res.status === 200) {
        form.reset();
        setTripType("to-airport");
        setCaptchaToken("");
        if (window.grecaptcha && widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
        fireQuoteFormConversion();
      } else {
        setErrorMessage(json?.message ?? "");
      }
    } catch {
      setStatus("error");
    }
  }

  const pickupLabel = tripType === "from-airport" ? "Airport" : "Pickup address";
  const dropoffLabel = tripType === "to-airport" ? "Airport or drop-off" : "Drop-off address";

  if (!ACCESS_KEY) {
    return (
      <div id="quote-form" className="rounded-[20px] bg-surface p-6 text-sm text-ink-muted shadow-[0_12px_32px_rgba(11,15,26,0.10)]">
        Quote form backend not yet configured — call us directly in the meantime.
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div id="quote-form" className="rounded-[20px] bg-surface p-6 shadow-[0_12px_32px_rgba(11,15,26,0.10)]">
        <p className="font-display text-xl font-extrabold text-primary">Got it — thanks!</p>
        <p className="mt-2 text-sm text-ink-muted">
          Every trip is quoted. We&rsquo;ll reply by text or call shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id="quote-form"
      onSubmit={handleSubmit}
      className="scroll-mt-24 rounded-[20px] bg-surface p-6 shadow-[0_12px_32px_rgba(11,15,26,0.10)]"
    >
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit&onload=onQuoteRecaptchaApiLoad"
          strategy="afterInteractive"
        />
      )}
      <p className="font-display text-lg font-extrabold text-primary">Request a quote</p>
      <div className="mt-3 flex gap-2">
        {TRIP_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setTripType(tab.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              tripType === tab.value
                ? "bg-primary text-white"
                : "bg-background text-ink-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <input type="hidden" name="trip_type" value={tripType} />

      <div className="mt-4 space-y-3">
        {tripType === "from-airport" ? (
          <div>
            <label htmlFor="pickup" className="block text-xs font-medium text-ink">{pickupLabel}</label>
            <select id="pickup" name="pickup" className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm">
              {AIRPORTS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="pickup" className="block text-xs font-medium text-ink">{pickupLabel}</label>
            <input id="pickup" name="pickup" required className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
        )}

        {tripType === "to-airport" ? (
          <div>
            <label htmlFor="dropoff" className="block text-xs font-medium text-ink">{dropoffLabel}</label>
            <select id="dropoff" name="dropoff" className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm">
              {AIRPORTS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="dropoff" className="block text-xs font-medium text-ink">{dropoffLabel}</label>
            <input id="dropoff" name="dropoff" className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="date" className="block text-xs font-medium text-ink">Date</label>
            <input id="date" name="date" type="date" className="mt-1 w-full rounded-md border border-border px-2 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="time" className="block text-xs font-medium text-ink">Time</label>
            <input id="time" name="time" type="time" className="mt-1 w-full rounded-md border border-border px-2 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="passengers" className="block text-xs font-medium text-ink">Passengers</label>
            <input id="passengers" name="passengers" type="number" min={1} className="mt-1 w-full rounded-md border border-border px-2 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-ink">Mobile phone</label>
          <input id="phone" name="phone" type="tel" required className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-ink">Name</label>
          <input id="name" name="name" className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="note" className="block text-xs font-medium text-ink">Note (optional)</label>
          <textarea id="note" name="note" rows={2} className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
      </div>

      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New quote request — Albany Airport Taxi" />
      <input type="hidden" name="from_name" value="Albany Airport Taxi Website — Quote Form" />
      {/* honeypot field (Web3Forms' own convention) — invisible to real users, bots fill it in */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {RECAPTCHA_SITE_KEY && <div ref={captchaRef} className="mt-3" />}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-bright px-6 font-bold text-primary transition-colors hover:bg-accent-bright-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request my quote"}
      </button>
      <p className="mt-2 text-center text-xs text-ink-muted">Every trip quoted. We reply by text or call.</p>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-700">
          {errorMessage || "Something went wrong."} Please call (518) 327-0700 instead.
        </p>
      )}
      {status === "captcha-required" && (
        <p className="mt-2 text-sm text-red-700">Please check the &ldquo;I&rsquo;m not a robot&rdquo; box before sending.</p>
      )}
    </form>
  );
}
