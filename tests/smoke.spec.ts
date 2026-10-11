import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", name: "home" },
  { path: "/airport-taxi/jfk", name: "airport detail" },
  { path: "/airport-taxi/jfk/troy-albany-county", name: "city (via [placeSlug])" },
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
    expect(canonicalHref).toContain(page.path === "/" ? "albanyairport.taxi" : page.path);

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
