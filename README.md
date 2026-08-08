# MAQAAMU IBRAHIM TRAVEL AGENCY — website

Hajj & Umrah service and travel agency, Jam Street, Hodo Souk, Nairobi.

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion · React Router 6.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build into dist/
npm run preview      # serve the production build locally
npm run typecheck    # TypeScript, no emit
npm run content:check # what business information is still outstanding
```

---

## The one thing to understand first

**All business information lives in `src/content/`. No component contains a
phone number, a price, a service name or a paragraph of copy.**

```
src/content/
  company.ts       trading name, tagline, summary, domain
  contact.ts       phone, WhatsApp, email, address, map, hours, social
  services.ts      the six services  → /services/:slug
  packages.ts      the Umrah departures, prices and dates → /packages/:slug
  destinations.ts  Makkah and Madinah → /destinations/:slug
  routes.ts        the countries ticketed from Nairobi
  faq.ts           questions and answers → feeds FAQ structured data
  about.ts         the five About sections and the values
  trust.ts         qualitative trust points, statistics, credentials
  testimonials.ts  empty by design — read the file before adding any
  media.ts         every image slot, and the homepage film
  copy.ts          headlines and section intros (voice, not facts)
  modules.ts       switches for the optional areas of the site
```

Adding a service is one object in `services.ts`. It gets a page, a homepage
card, a sitemap entry, structured data and an option in the enquiry form
automatically.

### Every record carries a `status`

```ts
status: 'confirmed'        // supplied by the agency. Safe to publish.
status: 'awaiting-client'  // a structural placeholder. Contains no facts.
```

`VITE_CONTENT_MODE` decides what happens to the second kind:

| Mode             | Behaviour                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `live` (default) | Every `awaiting-client` record is stripped before it reaches a component. Empty sections remove themselves. Indexing allowed. |
| `draft`          | Outstanding slots render with a visible marker so the team can see what is missing. **robots.txt blocks indexing.** |

**`npm run build` produces a production build.** Use draft only to review
what is still outstanding:

```bash
VITE_CONTENT_MODE=draft npm run build
```

This is why unverified information cannot reach production by accident.
Run `npm run content:check` for the current state.

---

## Adding photographs

**Drop a file into `src/assets/images/` named after its slot. That is all.**

```
src/assets/images/home.hero.jpg          → the homepage hero
src/assets/images/destination.makkah.jpg → the Makkah page
src/assets/images/service.umrah.jpg      → the Umrah service page
```

No path to edit, no code change. Vite hashes the file and the slot switches
from its composed abstract to the real photograph on the next build.

**The full list of slot names and export sizes is in
[`src/assets/images/README.md`](src/assets/images/README.md).**

Until a slot has a file it renders a composed abstract built from layered
gradients in that slot's tone — deliberately non-photographic, so nobody
mistakes it for a picture of the agency, and no unrelated stock photo is
used. Please also add `alt` text in `src/content/media.ts` for each
photograph you add.

---

## What is still outstanding

Run `npm run content:check`, or see `HANDOVER.md` for the full list with
the questions to ask.

---

## Brand assets

The wordmark is **typographic and temporary** (`components/layout/Wordmark.tsx`).
No emblem or monogram has been invented — a mark of that kind would end up
circulating as if it were the agency's official logo. Same reasoning for the
favicon.

When the client supplies their logo: drop it in `/public/brand/`, replace the
markup in `Wordmark.tsx`, keep the accessible name and the three size variants.

Photography: every image slot is declared in `src/content/media.ts` with
recommended export sizes. Until a slot has a `src`, it renders a composed
abstract in its tone rather than an unrelated stock photograph.

---

## Deploying

The build outputs a static site. Any static host works.

```bash
npm run build
```

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node:** 20 or newer

`public/_redirects` carries the SPA fallback for Netlify. On Vercel, Cloudflare
Pages or S3/CloudFront, add the equivalent rewrite of `/*` → `/index.html`;
the static per-route HTML files are served directly and only dynamic slugs
need the fallback.

**Before the first production deploy:** set `company.siteUrl` in
`src/content/company.ts` to the real domain. It is used for canonical URLs,
Open Graph tags and the sitemap.

---

## Environment variables

Both optional — see `.env.example`.

| Variable                | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `VITE_CONTENT_MODE`     | Unset (production) or `draft` for internal review. See above.            |
| `VITE_ENQUIRY_ENDPOINT` | HTTPS endpoint for the enquiry form. Without it the form composes the enquiry into a WhatsApp message to +254 714 019 953. |

---

## Notes on the build

`npm run build` runs `tsc -b`, then `vite build`, then `scripts/postbuild.mjs`,
which:

1. writes a real HTML file per route with its own `<title>`, description,
   canonical URL and Open Graph tags — so WhatsApp, Facebook and X show the
   right preview, none of which execute JavaScript;
2. generates `sitemap.xml` from the same route source the app uses, so the
   two cannot drift apart;
3. generates `robots.txt`, which **disallows indexing in draft mode**.

---

## Accessibility and quality

Checked across `/`, every service, destination and package page, the FAQ,
contact, booking and 404, at 320 / 390 / 768 / 1440 px:

- no horizontal scrolling at any width
- no console errors, page errors or failed requests
- every image has alt text; exactly one `<h1>` per page
- every link and button has an accessible name
- all tap targets clear the 24px WCAG 2.5.8 minimum; primary actions are 44px+
- text contrast is documented in `src/styles/index.css` — nothing below 4.5:1
- full keyboard support, focus trapping in the mobile menu, skip link
- `prefers-reduced-motion` honoured throughout
