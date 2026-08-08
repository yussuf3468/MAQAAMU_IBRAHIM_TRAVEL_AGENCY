import type { ImageRef } from './types';

/* =========================================================================
   IMAGE SLOTS
   -------------------------------------------------------------------------
   REPLACE AFTER THE CLIENT SUPPLIES PHOTOGRAPHY.

   Every image on the site is declared here. No component contains a raw
   image path, so swapping the whole site's photography is an edit to this
   one file.

   While `src` is null, <EditorialImage> renders a composed abstract in the
   slot's tone — deliberately non-photographic, so nobody mistakes it for
   a real picture of the agency, and no unrelated stock photo is used.

   TO DROP IN A REAL PHOTOGRAPH:
     1. Save it to /public/images/<name>.jpg  (see sizes below).
     2. Set `src: '/images/<name>.jpg'`.
     3. Write real `alt` text: describe what is in the photograph. Leave it
        as '' only for images that are purely decorative.
     4. Optionally set `focal` so the subject survives the mobile crop.

   RECOMMENDED EXPORT SIZES
     home.hero          2400 × 1600  (also export 1200 × 800 for srcSet)
     page.* headers     2000 × 1125
     editorial portrait 1200 × 1500
     cards / tiles      1200 × 900
   Export as JPEG at quality 72–80, or WebP. Keep every file under ~350 KB;
   the hero under ~500 KB. Nothing on this site needs a 4 MB photograph.
   ========================================================================= */

export const media = {
  /* ---- Homepage ------------------------------------------------------- */
  homeHero: {
    slot: 'home.hero',
    src: null,
    srcSet: null,
    alt: 'Al-Masjid an-Nabawi in Madinah at dusk, pilgrims crossing the lit courtyard.',
    tone: 'dusk',
    focal: 'center',
  } satisfies ImageRef,

  homeIntro: {
    slot: 'home.intro',
    src: null,
    alt: 'Pilgrims gathered around the Kaaba in the Masjid al-Haram, Makkah.',
    tone: 'dawn',
    focal: 'center',
  } satisfies ImageRef,

  homeStory: {
    slot: 'home.story',
    src: null,
    alt: '',
    tone: 'alpine',
    focal: 'center',
  } satisfies ImageRef,

  /** Poster frame for the film section. See `film` at the foot of this file. */
  homeFilm: {
    slot: 'home.film',
    src: null,
    alt: 'The Masjid al-Haram in Makkah beneath the Royal Clock Tower.',
    tone: 'dusk',
    focal: 'center',
  } satisfies ImageRef,

  homeInvitation: {
    slot: 'home.invitation',
    src: null,
    alt: 'The green dome and minarets of Al-Masjid an-Nabawi in Madinah.',
    tone: 'night',
    focal: 'center',
  } satisfies ImageRef,

  /* ---- Page headers --------------------------------------------------- */
  aboutHeader: {
    slot: 'about.header',
    src: null,
    alt: 'Pilgrims performing tawaf around the Kaaba in the Masjid al-Haram.',
    tone: 'dawn',
    focal: 'center',
  } satisfies ImageRef,

  aboutPortrait: {
    slot: 'about.portrait',
    src: null,
    alt: 'Worshippers filling the courtyard of the Masjid al-Haram in Makkah.',
    tone: 'alpine',
    focal: 'center',
  } satisfies ImageRef,

  servicesHeader: {
    slot: 'services.header',
    src: null,
    alt: 'The wing of an aircraft above the clouds in clear daylight.',
    tone: 'aurora',
    focal: 'center',
  } satisfies ImageRef,

  destinationsHeader: {
    slot: 'destinations.header',
    src: null,
    alt: 'Al-Masjid an-Nabawi in Madinah at dusk, seen across the courtyard.',
    tone: 'ocean',
    focal: 'center',
  } satisfies ImageRef,

  packagesHeader: {
    slot: 'packages.header',
    src: null,
    alt: 'Pilgrims gathered around the Kaaba in the Masjid al-Haram, Makkah.',
    tone: 'dawn',
    focal: 'center',
  } satisfies ImageRef,

  contactHeader: {
    slot: 'contact.header',
    src: null,
    alt: '',
    tone: 'night',
    focal: 'center',
  } satisfies ImageRef,

  bookingHeader: {
    slot: 'booking.header',
    src: null,
    alt: '',
    tone: 'dusk',
    focal: 'center',
  } satisfies ImageRef,

  faqHeader: {
    slot: 'faq.header',
    src: null,
    alt: '',
    tone: 'alpine',
    focal: 'center',
  } satisfies ImageRef,
} as const;

/**
 * Social sharing image. Generate a 1200 × 630 JPEG once the brand assets
 * arrive and save it to /public/og-image.jpg. Until then the meta tag is
 * omitted entirely rather than pointing at a missing file.
 */
export const openGraphImage: string | null = null;

/* =========================================================================
   THE FILM
   -------------------------------------------------------------------------
   The agency's video gets its own section on the homepage, below the fold.
   It is NOT the hero backdrop, deliberately: a promotional film has
   narration and music, and a video playing silently behind a headline
   throws away the sound and competes with the words at the same time.

   In its own band it can be played properly — poster, one clear play
   control, sound on, full width.

   THE SECTION HIDES ITSELF COMPLETELY until `mp4` is set. Nothing to
   remove, nothing to comment out.

   TO ADD THE FILM:
     1. Save it to /public/video/film.mp4  (H.264/AAC; add a .webm too if
        you have one — the browser picks whichever it supports).
     2. Export a good still frame to /public/images/film-poster.jpg and set
        `homeFilm.src` above to it. The poster IS the section until someone
        presses play, so pick a strong frame, not a black one.
     3. Fill in the paths and the caption below.

   ENCODING RULES — these matter more than the design:
     • Under ~25 MB, and ideally under 12. It only downloads when someone
       presses play, but this audience is largely on mobile data.
     • 1920 × 1080 H.264 is plenty. 4K buys nothing here.
     • Keep the audio — this one is meant to be heard.
   ========================================================================= */

export const film = {
  /** e.g. '/video/film.mp4' — the section appears as soon as this is set. */
  mp4: null as string | null,
  /** e.g. '/video/film.webm' — optional, smaller where supported. */
  webm: null as string | null,
  /** Optional .vtt subtitles. Strongly recommended: much of this audience
   *  watches with the sound off, and it makes the film accessible. */
  captions: null as string | null,
  eyebrow: 'Our journeys',
  heading: 'A look at how we travel',
  /** One or two lines under the heading. Replace with the client's own. */
  body: 'A short film from MAQAAMU IBRAHIM TRAVEL AGENCY.',
} as const;
