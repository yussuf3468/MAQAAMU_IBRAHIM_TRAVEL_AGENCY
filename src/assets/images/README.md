# Photographs

## ⚠ The photographs currently here are placeholders

Every image in this folder is a stock photograph from
[Unsplash](https://unsplash.com), used under the Unsplash License (free for
commercial use, no attribution required). They were chosen to be relevant —
the Haram, Masjid an-Nabawi, pilgrims, aircraft, travel documents — but they
are **not photographs of MAQAAMU IBRAHIM TRAVEL AGENCY, its office, its
groups or its travellers.**

They are here so the site looks finished today. **Replace them with the
agency's own photographs as soon as they are available** — pictures of their
actual groups, their office and the travellers they have looked after are
worth more than any stock library, and they are what will make this site
theirs rather than generic.

Nothing on the site claims these are the agency's own photographs. No alt
text and no caption says otherwise.

---

**Drop a file in this folder named after its slot. That is the whole job —
no code change, no path to edit.**

The site picks it up on the next build and that slot switches from the
composed abstract to the real photograph.

```
src/assets/images/home.hero.jpg   →  the homepage hero
```

---

## Slot names

### Homepage

| Filename | Where it appears | Export at |
| -------- | ---------------- | --------- |
| `home.hero.jpg` | Full-screen hero. **The most important image on the site.** | 2400 × 1600 |
| `home.intro.jpg` | Beside "Your journey. Your worship. Your comfort." | 1600 × 1280 |
| `home.film.jpg` | Poster frame for the video section | 1920 × 1080 |
| `home.invitation.jpg` | The closing "Let's plan your journey" band | 2400 × 1350 |
| `home.story.jpg` | Spare slot, currently unused | 1600 × 1200 |

### Page headers

| Filename | Page | Export at |
| -------- | ---- | --------- |
| `about.header.jpg` | /about | 2000 × 1125 |
| `about.portrait.jpg` | Full-bleed band inside /about | 2400 × 1350 |
| `services.header.jpg` | /services | 2000 × 1125 |
| `destinations.header.jpg` | /destinations | 2000 × 1125 |
| `packages.header.jpg` | /packages | 2000 × 1125 |
| `contact.header.jpg` | /contact | 2000 × 1125 |
| `booking.header.jpg` | /booking | 2000 × 1125 |
| `faq.header.jpg` | /faq | 2000 × 1125 |

### Services — one per service page and card

| Filename | Service |
| -------- | ------- |
| `service.umrah.jpg` | Umrah |
| `service.hajj.jpg` | Hajj |
| `service.air-ticketing.jpg` | Air ticketing |
| `service.visa-services.jpg` | Visa services |
| `service.hotel-booking.jpg` | Hotel booking |
| `service.cargo.jpg` | Cargo |

Export at 2000 × 1500. The name after `service.` is the slug in
`src/content/services.ts` — a new service uses its own slug.

### Destinations

| Filename | Destination |
| -------- | ----------- |
| `destination.makkah.jpg` | Makkah — **high priority** |
| `destination.madinah.jpg` | Madinah — **high priority** |

Export at 1200 × 1500 (portrait — these are tall cards).

### Packages

| Filename | Package |
| -------- | ------- |
| `package.umrah-normal.jpg` | Umrah Normal |
| `package.umrah-vip.jpg` | Umrah VIP |
| `package.umrah-full.jpg` | Umrah Full, 10 days |

Export at 1600 × 1000.

---

## Export settings

- **JPEG at quality 72–80**, or WebP. `.jpg`, `.jpeg`, `.png`, `.webp` and
  `.avif` are all picked up.
- **Under ~350 KB each**, and the hero under ~500 KB. Nothing here needs a
  4 MB photograph — it is the first thing that downloads on mobile data.
- Portrait crops for destination cards, landscape for everything else.
- Vite hashes and cache-busts every file automatically, so replacing a
  photograph later takes effect immediately for returning visitors.

## Alt text

Setting the file is enough to make the image appear, but please also write
`alt` text for it in `src/content/media.ts` (or in the service, destination
or package entry). One short sentence describing what is in the photograph
— it is read aloud to blind visitors and it is read by Google.

Leave `alt: ''` only where the image is purely decorative.

## Priority

If only four photographs are available, make them these:

1. `home.hero.jpg`
2. `destination.makkah.jpg`
3. `destination.madinah.jpg`
4. `service.umrah.jpg`
