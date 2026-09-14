# Deployment Guide

This site builds to plain static HTML/CSS/JS (`output: 'export'` in
`next.config.ts`) — no Node server needed on the hosting side.

## Domain

The site now lives on **`albanynyairporttaxi.com`** (a `.com` the business
already owned, unused, no history) instead of the legacy `albanyairport.taxi`.
Rationale: the legacy domain ranked for only ~10 keywords with ~6 monthly
organic visitors per the competitive analysis, so there was negligible domain
equity to preserve, and `.com` avoids the trust/recognition friction of a
novel TLD. Both domains live on the same cPanel account:

- **`albanynyairporttaxi.com`** — the real site. Gets the contents of `/out`
  (this repo's static export) plus `deploy/.htaccess` (canonical-host rules
  only).
- **`albanyairport.taxi`** — kept registered, but its `public_html` gets
  **only** `deploy/old-domain.htaccess` (renamed to `.htaccess` on upload).
  It contains a 301 for every URL in the old PHP site's sitemap straight to
  the equivalent page on the new domain, plus a catch-all redirect to the new
  home page for anything not in that map. Nothing else needs to be uploaded
  there — the legacy PHP files should be removed once this redirect-only
  `.htaccess` is confirmed working, so nothing on that domain still executes
  PHP.

## 1. Build

```bash
npm run build
```

Output lands in `/out`. This is everything that needs to go on the server.

If the contact form backend has been chosen (see "Still open" below), set
its endpoint before building:

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT="https://your-form-backend.example/f/xxxx" npm run build
```

## 2. Regenerate redirects (only needed if content/slugs changed)

```bash
npm run parse-dump          # re-parse the DB export into /content
npm run generate-redirects  # maps every legacy URL to its new slug -> deploy/redirects.json
npm run generate-htaccess   # renders deploy/redirects.json -> deploy/.htaccess
```

This produces two files:
- `deploy/.htaccess` — canonical host enforcement for the **new** domain
  (forces `https://albanynyairporttaxi.com`, no `www`). Goes with the export.
- `deploy/old-domain.htaccess` — a 301 for every URL in the **old** site's
  sitemap.xml (1,156 mapped; the one skipped entry was a literal `tel:`
  string mistakenly inserted into the old sitemap) to the matching new-domain
  URL, plus a catch-all. Goes on the **old** domain only, renamed to
  `.htaccess` there.

## 3. Combine build output + redirects

```bash
cp deploy/.htaccess out/.htaccess
```

`deploy/old-domain.htaccess` is uploaded separately to the old domain's
docroot (see "Domain" section above) — it does not go in `/out`.

## 4. Test on a staging subdomain first

Per the plan: upload `/out` to a staging subdomain on the same cPanel
account before touching production `public_html`. Crawl it (e.g. Screaming
Frog) to confirm no broken internal links, and manually spot-check that a
sample of the 1,156 redirects actually fire (e.g. visit the staging
equivalent of `/service-city-detail.php?id=335&coid=1` and confirm it lands
on `/airport-taxi/logan/albany`).

## 5. Cut over

1. In cPanel File Manager (or via FTP), back up the current `public_html`
   contents somewhere first (the legacy PHP site + database are already
   backed up from the earlier database-export work, but the live files
   directory itself hasn't been separately archived).
2. Replace the contents of `public_html` with the contents of `/out`
   (including `.htaccess`).
3. Submit the new sitemap (`https://albanyairport.taxi/sitemap.xml`) in
   Google Search Console.
4. Monitor Search Console's Coverage and Redirects reports for 2-4 weeks.

I'm not doing this upload step myself — it's a live production change to a
domain that's still actively receiving whatever traffic it gets today, and
should happen after the staging check above, with you driving the actual
cutover.

## Still open before a full production launch

- **Contact form backend** — pick Formspree, Web3Forms, or a small PHP
  endpoint kept on this same cPanel hosting, then set
  `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (step 1 above). Until this is set, the
  contact page shows a "not yet configured" notice instead of a form.
- ~~Call-tracking phone numbers~~ — done. Real static numbers for all 23
  counties are in `scripts/lib/county-tracking-phones.json`, rendered
  server-side on county pages and inherited by their cities.
- **TripAdvisor / Facebook / Instagram links** — add to
  `lib/schema.ts`'s `sameAs` array once you have the real URLs, and wire up
  the footer/header social icons (currently omitted rather than linking
  nowhere, unlike the legacy site's dead `href="#"` links).
- **Real fleet/location photography** and **a real logo** — the site
  currently has no images at all (deliberately, rather than reusing the
  legacy site's stock Themescare photos).
- **"Colonie" is missing** from both the legacy database and the
  client-supplied town list, despite being a major town adjacent to Albany
  International Airport — worth adding real content for it.
