"use client";

import { useState } from "react";

// Static export can't run server code, so this form posts to an external
// form-backend service (see plan: "the contact form endpoint"). Point
// NEXT_PUBLIC_CONTACT_FORM_ENDPOINT at whichever service is chosen
// (Formspree, Web3Forms, or a small PHP endpoint kept on the existing
// cPanel hosting) — this is a client-facing decision noted as pending in
// the plan, not something to pick unilaterally here.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!ENDPOINT) {
    return (
      <p className="rounded-lg border border-border bg-surface p-6 text-sm text-ink-muted">
        Contact form backend not yet configured — set{" "}
        <code className="rounded bg-background px-1">NEXT_PUBLIC_CONTACT_FORM_ENDPOINT</code>{" "}
        once a form-backend service is chosen. Call or email us directly in the meantime.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      {/* honeypot field — the legacy form had zero spam protection */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "sent" && <p className="text-sm text-green-700">Thanks — we&rsquo;ll be in touch shortly.</p>}
      {status === "error" && <p className="text-sm text-red-700">Something went wrong. Please call us instead.</p>}
    </form>
  );
}
