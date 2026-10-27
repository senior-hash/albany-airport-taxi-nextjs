# Deployment Guide

This site builds to plain static HTML/CSS/JS (`output: 'export'` in
`next.config.ts`) — no Node server needed on the hosting side.

## Domain

The site replaces the legacy PHP site **in place** on **`albanyairport.taxi`**
— the domain the business has used for years. `albanynyairporttaxi.com` is a
separate `.com` the business owns but is reserved for a future project; it is
not part of this deployment and nothing should be uploaded there.

## 1. Build

```bash
npm run build
```

Output lands in `/out`. This is everything that needs to go on the server.

The contact form posts to Web3Forms, and reCAPTCHA keeps it from becoming
a junk-mail source the way the legacy site's did — both are live and
already configured in this machine's local `.env.local` (gitignored, never
committed). **The real build command for a production deploy must set the
same two values**, or the live site will ship with the contact form showing
its "not yet configured" notice and no spam protection:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="<the real access key>" \
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="<the real site key>" \
npm run build
```

## 1b. Pull new Soro blog posts (only needed if Soro has published since the last build)

Soro has no native Next.js/headless connector — only WordPress and Shopify
integrations. The bridge is a headless WordPress instance (not customer-
facing) that the Soro WordPress plugin publishes into; this script pulls
its published posts via the WP REST API and converts them into this
project's blog post format:

```bash
SORO_WORDPRESS_URL="https://content.albanyairport.taxi" npm run fetch-soro-posts
```

This fully replaces `content/blog/soro/` each run (WordPress is the source
of truth — unpublishing a post there removes it here on the next run). Run
this before `npm run build` so new posts are included in the static export.
See "Still open" below for the current status of the WordPress side.

## 2. Regenerate redirects (only needed if content/slugs changed)

```bash
npm run parse-dump          # re-parse the DB export into /content
npm run generate-redirects  # maps every legacy URL to its new slug -> deploy/redirects.json
npm run generate-htaccess   # renders deploy/redirects.json -> deploy/.htaccess
```

`deploy/.htaccess` includes:
- Canonical host enforcement (forces `https://albanyairport.taxi`, no `www`)
- A 301 redirect for every URL in the **old** site's sitemap.xml (1,156
  mapped; the one skipped entry was a literal `tel:` string that had been
  mistakenly inserted into the old sitemap and was never a real page)
- A `ForceType` rule for the Next.js dynamic icon/OG-image routes (see
  "Still open" below — they export as extensionless files, which plain
  Apache serves with the wrong MIME type unless forced)

## 3. Combine build output + redirects

```bash
cp deploy/.htaccess out/.htaccess
```

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

## Status (updated after the Google Ads landing-page/call-tracking build)

### Done — ready for launch
- ~~Contact form backend~~ — Web3Forms, live, tested end-to-end.
- ~~reCAPTCHA~~ — live, verified rendering and gating correctly.
- ~~Call-tracking phone numbers~~ — real static numbers for all 23 counties,
  server-rendered on county pages and inherited by their cities.
- ~~Google Ads call-tracking (`?n=`)~~ — swaps the displayed number sitewide
  for ad visitors, 30-day persistence, canonical number unaffected for
  organic/GBP visitors. See `components/AdPhoneProvider.tsx`.
- ~~Google Ads landing pages~~ — `/college-rides` (+ `/williams`,
  `/cornell-ithaca`), `/medical-rides`, `/local-rides`, `/airport-rides`.
- ~~Real fleet photography~~ — live under `/cars` and the homepage.
- ~~Real logo~~ — wordmark + favicon, live.
- ~~TripAdvisor / Facebook links~~ — real URLs in `lib/schema.ts`'s
  `sameAs` and the footer icon row.
- ~~Legal name / DBA~~ — verified against the real NY Dept. of State
  filing; `legalName`/`alternateName` in the Organization schema.
- ~~"No shuttle" wording~~ — removed sitewide per the Ads brief.

### Not done, doesn't block launch — fix after
- **Instagram link** — waiting on the URL once it's set up.
- **Google Ads conversion tag (gtag.js)** — waiting on the tag ID +
  conversion label from the Ads account.
- **Soro → WordPress connection** — the `content.albanyairport.taxi`
  subdomain is created; WordPress install/hardening + the Soro plugin
  connection is still pending. `npm run fetch-soro-posts` (step 1b above)
  is built and tested against a real external WP site, just has nothing of
  ours to pull from yet. The blog works fine at launch without it — new
  posts just have to be added by hand to `content/blog/original/` until
  it's connected.
- **"Colonie"** is still missing from the city/county data despite being a
  major town adjacent to ALB — real content for it, blog SEO polish, and
  anything else from here is all fair game post-launch.
- **TripAdvisor's listed address/hours** don't match the real business
  details yet (on hold per your call).
