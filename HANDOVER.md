# Handover — what to collect, and where it goes

Everything below is either a question for the client or a file to edit.
Run `npm run content:check` at any point to see the current state.

---

## 1. Verify before launch — three things that are wrong if we guessed wrong

| # | Item | Why it matters | File |
| - | ---- | -------------- | ---- |
| 1 | **Name spelling.** The brief says `MAQAAMU IBRAHIM` (double A). Their brochures and signage read `MAQAMU IBRAHIM` (single A). We used the brief's spelling. | It is in the page title, the wordmark, the footer, the manifest and the structured data. | `src/content/company.ts` |
| 2 | **Email spelling.** We used `travelagencyltdmaqaamuibrahim@gmail.com` as given. The printed brochure appears to read `...maqamuibrahim@gmail.com`. | A bouncing address is worse than no address. | `src/content/contact.ts` |
| 3 | **City.** The brochures print `Jam Street, Hodo Souk, 2nd Floor, S26` with no city. We set Nairobi, Kenya from the +254 numbers and the "NAIROBI TO:" flight list. | It is published in the LocalBusiness structured data. | `src/content/contact.ts` |

---

## 2. Still needed from the client

| Item | What to ask | File |
| ---- | ----------- | ---- |
| **Opening hours** | The real office hours. "24/7 support" is a support promise, not office hours — we have not published either as hours. | `src/content/contact.ts` |
| **About: who we are** | Who runs the agency, how long the office has been on Jam Street, who the traveller deals with. | `src/content/about.ts` |
| **About: why we exist** | Why the agency was started, and what it was meant to fix. This is the paragraph that makes a stranger care. | `src/content/about.ts` |
| **About: what makes us different** | One specific habit — something they always do, or never do. Concrete beats superlative. | `src/content/about.ts` |
| **Payment terms** | Methods accepted, whether a deposit is required, when the balance is due. | `src/content/faq.ts` |
| **Change / cancellation policy** | In their own words, including refunds. | `src/content/faq.ts` |
| **Booking lead time** | How early to book for Umrah, for Hajj, for ordinary flights. | `src/content/faq.ts` |
| **Visa document list** | What they need from a traveller for an Umrah visa and for other visas. | `src/content/faq.ts` |
| **Social profiles** | Facebook / Instagram / TikTok URLs, if they maintain them. Delete the rows they do not. | `src/content/contact.ts` |
| **Founding year** | Optional — leave null if they would rather not state one. | `src/content/company.ts` |
| **Exact map link** | Google Maps → find their listing → Share → Copy link, and Share → Embed a map. We currently use a *search* for the address, not a pin we placed. | `src/content/contact.ts` |
| **Additional services** | They said the list is "not limited" to the six. Each new one is a single object. | `src/content/services.ts` |

### Deliberately empty — do not fill these in without evidence

| Item | Why |
| ---- | --- |
| **Testimonials** | Nothing is published without a written quote and permission from the traveller. The section renders nothing until then. |
| **Statistics** (years, pilgrims served) | No figure has been estimated. The trust band works without numbers, so there is no pressure to invent one. |
| **IATA / Boeing / airline logos** | These appear on the office wall. Wall décor is not evidence of an accreditation or a partnership. Publishing a claimed IATA accreditation without the certificate is a legal exposure. Get the certificate or the agency code and it can go in `src/content/trust.ts`. |

---

## 3. Photography — placeholders are in, the agency's own are the win

Every image slot is filled with a relevant stock photograph from Unsplash
(Unsplash License: free for commercial use, no attribution required) — the
Haram, Masjid an-Nabawi, pilgrims, aircraft, a departure board, travel
documents, cargo. The site looks finished today.

**They are not photographs of this agency.** Replace them with the client's
own as soon as they can send them: their groups at the airport, the office
on Jam Street, travellers they have looked after. That is the difference
between a site that looks good and a site that is unmistakably theirs — and
it is the single highest-value thing left on this list.

**Replacing one is a drag and drop.** Overwrite the file in
`src/assets/images/` keeping the same name:

```
src/assets/images/home.hero.jpg
src/assets/images/destination.makkah.jpg
src/assets/images/service.umrah.jpg
```

No code change, no path to edit. The full list of slot names and export sizes
is in **`src/assets/images/README.md`**.

If only four are available, ask for these:

1. `home.hero.jpg` — 2400 × 1600. The first impression, and the one that
   decides whether a visitor keeps scrolling.
2. `destination.makkah.jpg` — 1200 × 1500 portrait.
3. `destination.madinah.jpg` — 1200 × 1500 portrait.
4. `service.umrah.jpg` — 2000 × 1500.

Ask the client for photographs from their own departures — groups at the
airport, travellers they have looked after, the office itself. Those are
worth more here than any stock library.

JPEG at quality 72–80 or WebP, under ~350 KB each, hero under ~500 KB. Add
`alt` text in `src/content/media.ts` for each one.

Also needed: `/public/og-image.jpg` at 1200 × 630 for WhatsApp and Facebook
link previews, and the logo for `/public/brand/`.

---

## 4. The video

The homepage has a film section, below the intro, that **renders nothing at
all** until a video is supplied. It is not the hero backdrop — a promotional
film has narration and music, and a muted autoplaying backdrop throws that
away.

To add it:

1. Save to `/public/video/film.mp4` (H.264/AAC; add a `.webm` if you have one).
2. Export a strong still frame to `/public/images/film-poster.jpg` and set
   `media.homeFilm.src`. The poster *is* the section until someone presses play.
3. Set the paths, heading and caption at the foot of `src/content/media.ts`.
4. A `.vtt` captions file is strongly recommended — much of this audience
   watches with sound off.

Keep it under ~25 MB. Nothing downloads until the visitor presses play.

---

## 5. Going live

`npm run build` already produces a production build — live is the default,
and no environment variable needs setting.

Checklist:

- [ ] `company.siteUrl` set to the real domain (canonical URLs, OG tags, sitemap)
- [ ] The three verification items in section 1 confirmed
- [ ] `VITE_CONTENT_MODE` **not** set in the host's environment (setting it
      to `draft` would block indexing)
- [ ] Publish directory `dist`, build command `npm run build`
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console

Anything still marked `awaiting-client` is stripped automatically, so the
site can go live today and improve as answers arrive.

Anything still marked `awaiting-client` is stripped automatically in live
mode, so the site can go live before every answer is in.

---

## 6. Prices and dates need maintaining

`src/content/packages.ts` carries real commercial commitments transcribed
from the agency's flyers:

- Umrah Normal — USD 1,250 pp, 9–19 August 2026
- Umrah VIP — USD 2,200 pp, 9–19 August 2026
- Umrah Full, 10 days — USD 1,250 pp, 17–27 August 2026

**When a departure sells out or a date moves, this file must be updated.** A
stale price on a website is a customer argument. Agree with the client who
tells us when they change.
