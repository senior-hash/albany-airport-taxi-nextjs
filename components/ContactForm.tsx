"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Static export can't run server code, so this form posts to Web3Forms
// (api.web3forms.com/submit — a fixed endpoint, same for every account; the
// per-site secret is the access_key field below, not the URL). Chosen over
// Formspree/a custom PHP endpoint: no account/password to manage, and no new
// server-side code added to the cPanel account that was previously
// compromised. Get a key at web3forms.com (just an email address, no
// account) and set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

// The legacy site's contact form had zero spam protection and was
// generating a steady stream of junk email. reCAPTCHA v2 (checkbox) is
// added here as a second layer alongside the honeypot field below — get a
// site key at google.com/recaptcha/admin (register the live domain) and
// set NEXT_PUBLIC_RECAPTCHA_SITE_KEY. The widget is skipped entirely if no
// key is set, so local dev doesn't need one.
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => number;
      reset: (widgetId?: number) => void;
    };
    // Named in the script URL's `onload=` param below. Google's recaptcha
    // API calls this itself once `grecaptcha.render` is actually ready —
    // the script tag's own DOM "load" event fires too early (grecaptcha
    // isn't fully initialized yet), which is a well-documented gotcha.
    onRecaptchaApiLoad?: () => void;
  }
}

export function ContactForm() {
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
    window.onRecaptchaApiLoad = renderCaptcha;
    return () => {
      delete window.onRecaptchaApiLoad;
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
    const formData = new FormData(form);
    // The recaptcha widget auto-injects its own hidden
    // <textarea name="g-recaptcha-response"> into the DOM when it renders
    // (standard behavior, for no-JS form compatibility) — since it sits
    // inside this <form>, FormData(form) picks it up automatically on its
    // own. Web3Forms' free tier rejects any submission containing that
    // field with a "Pro feature" error, so it must be explicitly stripped
    // here — setting/not-setting it ourselves was never what controlled
    // whether it got sent. The checkbox still gates submission client-side
    // above (a human must check it before this handler ever runs).
    formData.delete("g-recaptcha-response");
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
        setCaptchaToken("");
        if (window.grecaptcha && widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
      } else {
        setErrorMessage(json?.message ?? "");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!ACCESS_KEY) {
    return (
      <p className="rounded-lg border border-border bg-surface p-6 text-sm text-ink-muted">
        Contact form backend not yet configured — set{" "}
        <code className="rounded bg-background px-1">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code>{" "}
        (get a free key at web3forms.com). Call or email us directly in the meantime.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {RECAPTCHA_SITE_KEY && (
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaApiLoad"
          strategy="afterInteractive"
        />
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">Name</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone</label>
        <input id="phone" name="phone" type="tel" className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">Message</label>
        <textarea id="message" name="message" rows={4} required className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </div>
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New contact form submission — Albany Airport Taxi" />
      <input type="hidden" name="from_name" value="Albany Airport Taxi Website" />
      {/* honeypot field (Web3Forms' own convention) — invisible to real users, bots fill it in */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {RECAPTCHA_SITE_KEY && <div ref={captchaRef} />}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "sent" && <p className="text-sm text-green-700">Thanks — we&rsquo;ll be in touch shortly.</p>}
      {status === "error" && (
        <p className="text-sm text-red-700">
          {errorMessage || "Something went wrong."} Please call us instead.
        </p>
      )}
      {status === "captcha-required" && (
        <p className="text-sm text-red-700">Please check the &ldquo;I&rsquo;m not a robot&rdquo; box before sending.</p>
      )}
    </form>
  );
}
