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

The contact form posts to Web3Forms (see "Still open" below for setup) —
set its access key before building, along with a reCAPTCHA site key to keep
the form from becoming a junk-mail source the way the legacy site's did:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="your-web3forms-access-key" \
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-v2-site-key" \
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

## Still open before a full production launch

- **Contact form backend** — decided: [Web3Forms](https://web3forms.com).
  Chosen over Formspree (full account + lower free-tier limit) and a custom
  PHP endpoint (would add new server-side code to the cPanel account that
  was previously compromised). To finish setup:
  1. Go to web3forms.com and submit the email that should receive
     submissions — no account/password needed, you get an access key by
     email instantly. Free tier: 250 submissions/month.
  2. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to that key before building
     (step 1 above). Until this is set, the contact page shows a "not yet
     configured" notice instead of a form.
- **reCAPTCHA site key** — register the live domain at
  google.com/recaptcha/admin (choose reCAPTCHA v2, "I'm not a robot"
  checkbox) and set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (step 1 above). The
  form works without it (falls back to just the honeypot field), but the
  legacy site's form had none and was a steady source of junk email —
  worth setting before this form goes live.
- ~~Call-tracking phone numbers~~ — done. Real static numbers for all 23
  counties are in `scripts/lib/county-tracking-phones.json`, rendered
  server-side on county pages and inherited by their cities.
- ~~Real fleet photography~~ — done. Real photos of the current fleet
  (Toyota Highlander, Honda CR-V, Chrysler Pacifica, Toyota Sienna, Kia EV9,
  Cadillac Escalade IQ) are live under `/cars` and on the homepage. A real
  logo is still outstanding.
- **TripAdvisor / Facebook / Instagram links** — add to
  `lib/schema.ts`'s `sameAs` array once you have the real URLs, and wire up
  the footer/header social icons (currently omitted rather than linking
  nowhere, unlike the legacy site's dead `href="#"` links).
- **Soro → WordPress connection** — `npm run fetch-soro-posts` (see step 1b
  above) is built and tested, but there's no headless WordPress instance
  for it to pull from yet. Needs: a WordPress install (subdomain on this
  same cPanel account, hardened — strong unique password, auto-updates,
  minimal plugins, given this account's prior compromise), the Soro
  WordPress plugin installed and connected with a Soro API key, then the
  site URL passed to `fetch-soro-posts`. Until then, new blog content has
  to be added by hand to `content/blog/original/` or `content/blog/legacy/`.
- **"Colonie" is missing** from both the legacy database and the
  client-supplied town list, despite being a major town adjacent to Albany
  International Airport — worth adding real content for it.
