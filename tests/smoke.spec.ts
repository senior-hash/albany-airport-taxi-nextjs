import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", name: "home" },
  { path: "/airport-taxi/jfk", name: "airport detail" },
  // Troy's town hub has passed the quality gate, so this city page's
  // canonical intentionally points there instead of to itself — see
  // getTownHub() in [airportSlug]/[placeSlug]/page.tsx.
  { path: "/airport-taxi/jfk/troy-rensselaer-county", name: "city (via [placeSlug])", expectCanonical: "/towns/troy-rensselaer-county" },
  { path: "/airport-taxi/alb/albany-county", name: "county (via [placeSlug])" },
  { path: "/cars", name: "cars list" },
  { path: "/cars/toyota-highlander", name: "car detail" },
  { path: "/blog", name: "blog list" },
  { path: "/long-distance/albany-to-nyc", name: "flagship long-distance" },
  { path: "/long-distance/boston", name: "long-distance destination" },
  { path: "/hudson-valley", name: "hudson valley" },
  { path: "/airport-taxi/alb/ulster-county", name: "hudson valley county (via [placeSlug])" },
  { path: "/services/non-emergency-medical-transportation", name: "NEMT" },
  { path: "/services/courier", name: "courier" },
  { path: "/services/wedding", name: "wedding" },
  { path: "/services/corporate", name: "corporate" },
  { path: "/venues", name: "venues list" },
  { path: "/venues/albany-med", name: "venue detail" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/college-rides", name: "college rides" },
  { path: "/college-rides/williams", name: "williams college rides" },
  { path: "/college-rides/cornell-ithaca", name: "cornell/ithaca college rides" },
  { path: "/medical-rides", name: "medical rides" },
  { path: "/local-rides", name: "local rides" },
  { path: "/airport-rides", name: "airport rides" },
];

for (const page of PAGES) {
  test(`${page.name} (${page.path}): title, meta, canonical, JSON-LD`, async ({ page: pw }) => {
    const res = await pw.goto(page.path);
    expect(res?.status(), "page should respond 200").toBe(200);

    const title = await pw.title();
    expect(title.trim().length, "title should be non-empty").toBeGreaterThan(0);

    const description = await pw.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length ?? 0, "meta description should be non-empty").toBeGreaterThan(0);

    const canonicalHref = await pw.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonicalHref, "canonical tag should exist").toBeTruthy();
    const expectedCanonical = page.path === "/" ? "albanyairport.taxi" : (page.expectCanonical ?? page.path);
    expect(canonicalHref).toContain(expectedCanonical);

    const jsonLdBlocks = await pw.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLdBlocks.length, "should have at least one JSON-LD block (Organization)").toBeGreaterThan(0);
    for (const block of jsonLdBlocks) {
      const parsed = JSON.parse(block); // throws if malformed
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"]).toBeTruthy();
    }

    // Exactly one H1 per page (standardized via PageHeading), except the home
    // page which uses a hero h1 without the shared component.
    const h1Count = await pw.locator("h1").count();
    expect(h1Count, "page should have exactly one H1").toBe(1);
  });
}

test("contact page renders a form or a clear not-yet-configured notice", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator("form");
  const notice = page.getByText(/not yet configured/i);
  expect((await form.count()) > 0 || (await notice.count()) > 0).toBeTruthy();
});

test("title tag shows the DBA consistently (Google Ads business-name match)", async ({ page }) => {
  await page.goto("/college-rides");
  await expect(page).toHaveTitle(/US Limo and Taxi/);
});

test("ad tracking: visitor without ?n= sees the canonical number everywhere", async ({ page }) => {
  await page.goto("/college-rides");
  await expect(page.locator('a[href="tel:+15183270700"]').first()).toBeVisible();
  expect(await page.locator('a[href="tel:+14132695004"]').count()).toBe(0);
});

test("ad tracking: ?n= swaps every phone number on the landing page it points to", async ({ page }) => {
  await page.goto("/college-rides?n=4132695004");
  const trackedLinks = page.locator('a[href="tel:+14132695004"]');
  // This is a client-side swap (static HTML ships with the canonical number,
  // React swaps it in after hydration) — toBeVisible() auto-waits for that,
  // unlike a bare .count() check, which would race hydration and often catch
  // the pre-swap DOM.
  await expect(trackedLinks.first()).toBeVisible();
  // Header CTA, hero CTA, and sidebar BookingCard CallButton all render the
  // same tracked number — expect more than one to confirm it's sitewide
  // within the page, not just one lucky spot.
  expect(await trackedLinks.count()).toBeGreaterThan(1);
  await expect(page.getByText("(413) 269-5004").first()).toBeVisible();
  // the canonical number must not appear anywhere while tracking is active
  await expect(page.locator('a[href="tel:+15183270700"]')).toHaveCount(0);
});

test("ad tracking: the override persists via localStorage across navigation without ?n=", async ({ page }) => {
  await page.goto("/college-rides?n=4132695004");
  await expect(page.locator('a[href="tel:+14132695004"]').first()).toBeVisible();
  await page.goto("/"); // no ?n= this time — should still show the tracked number
  await expect(page.locator('a[href="tel:+14132695004"]').first()).toBeVisible();
});
