"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { AD_TRACKING_NUMBERS } from "@/lib/ad-phone-numbers";

// A plain string (or null) rather than an object — useSyncExternalStore
// compares snapshots with Object.is, and string primitives compare by value,
// so this stays stable across repeated getSnapshot() calls. An object
// literal like `{ display }` would compare unequal to itself every time
// (different reference), which breaks the hook's consistency check and was
// a real bug here: the override silently never applied.
type AdPhone = string | null;

const STORAGE_KEY = "ad_phone_override";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const AdPhoneContext = createContext<AdPhone>(null);

/** Current ?n= from the URL, if it's in the allowlist. Pure — safe to call
 * repeatedly, never writes anything. */
function freshDisplayFromUrl(): string | undefined {
  const n = new URLSearchParams(window.location.search).get("n");
  return n ? AD_TRACKING_NUMBERS[n] : undefined;
}

/** A still-valid, previously-stored override, if any. Pure. */
function storedDisplay(): string | undefined {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return undefined;
  const parsed = JSON.parse(stored) as { display: string; expiresAt: number };
  return parsed.expiresAt > Date.now() ? parsed.display : undefined;
}

// No subscribe mechanism needed: ?n= only ever changes on a fresh page load
// (an ad click is never a client-side navigation), so the value computed on
// the first render for this mount is correct for the whole session — there's
// nothing external to listen for after that.
const noopSubscribe = () => () => {};

function getSnapshot(): AdPhone {
  try {
    return freshDisplayFromUrl() ?? storedDisplay() ?? null;
  } catch {
    // localStorage unavailable (private browsing, blocked, etc.) — fall back
    // to default phone display everywhere, same as any visitor who never had
    // a tracking number.
    return null;
  }
}

function getServerSnapshot(): AdPhone {
  return null;
}

/** Wraps the whole app (see app/layout.tsx). Resolves the active ad-tracking
 * override, if any, from a fresh ?n= or a still-valid 30-day-old one stored
 * from an earlier visit, and persists a fresh hit for next time. This only
 * ever ADDS a higher-priority override on top of whatever a component would
 * otherwise show — a visitor who never arrives via ?n= sees null forever,
 * leaving every existing phone display (canonical or per-county) completely
 * unaffected. */
export function AdPhoneProvider({ children }: { children: ReactNode }) {
  const override = useSyncExternalStore(noopSubscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    try {
      const display = freshDisplayFromUrl();
      if (display) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ display, expiresAt: Date.now() + THIRTY_DAYS_MS })
        );
      }
    } catch {
      // Same as above — persistence just doesn't happen this time.
    }
  }, []);

  return <AdPhoneContext.Provider value={override}>{children}</AdPhoneContext.Provider>;
}

/** The active ad-tracking phone number display string, or null if none
 * applies. Highest priority wherever a phone number is displayed — see
 * CallButton and Phone. */
export function useAdPhone(): AdPhone {
  return useContext(AdPhoneContext);
}
