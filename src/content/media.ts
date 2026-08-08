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
    alt: 'The Kiswah of the Kaaba at night, its gold calligraphy lit against the dark.',
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
    alt: 'A travel consultant at the desk in the MAQAAMU IBRAHIM TRAVEL AGENCY office, with the agency’s route banner behind him.',
    tone: 'dusk',
    focal: 'center',
  } satisfies ImageRef,

  homeInvitation: {
    slot: 'home.invitation',
    src: null,
    alt: 'The Masjid al-Haram in Makkah at night beneath the Royal Clock Tower.',
    tone: 'night',
    focal: 'center',
  } satisfies ImageRef,

  /* ---- Page headers --------------------------------------------------- */
  aboutHeader: {
    slot: 'about.header',
    src: null,
    alt: 'Worshippers filling the courtyard of the Masjid al-Haram in Makkah.',
    tone: 'dawn',
    focal: 'center',
  } satisfies ImageRef,

  aboutPortrait: {
    slot: 'about.portrait',
    src: null,
    alt: 'Inside a mosque, ornate pillars and arches receding down the prayer hall.',
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
    alt: 'The green dome and minarets of Al-Masjid an-Nabawi in Madinah.',
    tone: 'ocean',
    focal: 'center',
  } satisfies ImageRef,

  packagesHeader: {
    slot: 'packages.header',
    src: null,
    alt: 'Al-Masjid an-Nabawi in Madinah seen across the courtyard.',
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
  /**
   * The client's film, transcoded for the web.
   *
   * THE ORIGINAL WAS NOT USABLE AS SUPPLIED: a 1.49 GB QuickTime .MOV,
   * 4K at 120fps in HEVC. Chrome and Firefox cannot decode HEVC at all, so
   * it would have been a blank player for most visitors, and a file that
   * size is rejected outright by most static hosts (Cloudflare Pages and
   * Netlify both cap individual files well below it) — the deploy would
   * have failed before anyone saw it.
   *
   * TWO MORE THINGS WERE WRONG WITH THE SOURCE:
   *  1. Its rotation metadata said -90, which made every tool flip it. The
   *     encode neutralises that with `-display_rotation 0`.
   *  2. The phone was physically turned partway through the take, so the
   *     opening seconds are landscape and the rest is portrait. The first
   *     16 seconds are cut and the remainder is rotated upright, which is
   *     why the finished clip is 9:16 — and why FilmSection presents it in
   *     a phone-shaped player instead of letterboxing it into 16:9.
   *
   * What ships: 720 × 1280, 30fps, H.264 High with AAC audio, 6.7 MB,
   * `+faststart` so playback begins before the file finishes downloading.
   * The 1.49 GB camera original is kept out of the build in
   * /media-originals, which is gitignored.
   *
   * TO REPLACE THE FILM LATER:
   *   ffmpeg -y -display_rotation 0 -ss <trim> -i input.MOV \
   *     -map 0:v:0 -map 0:a:0 -vf "transpose=1,scale=720:-2,fps=30" \
   *     -c:v libx264 -preset veryfast -crf 28 -maxrate 1400k -bufsize 2800k \
   *     -pix_fmt yuv420p -c:a aac -b:a 96k -ac 2 \
   *     -movflags +faststart public/video/film.mp4
   * Drop the `transpose=1` if the replacement was shot landscape, and
   * change FilmSection's aspect ratio to 16/9 to match.
   */
  mp4: '/video/film.mp4' as string | null,
  /** Optional VP9/WebM alternative. H.264 already covers every browser. */
  webm: null as string | null,
  /** Optional .vtt subtitles. Strongly recommended: much of this audience
   *  watches with the sound off, and it makes the film accessible. */
  captions: null as string | null,
  /* The heading describes what the film ACTUALLY shows: a walk around the
     office on Jam Street, past the wall listing the routes and services.
     It was originally captioned "A look at how we travel", which the
     footage does not deliver — and a caption that oversells what follows
     costs more than it gains. Re-caption this if the client sends a
     different film. */
  /* The film is a piece to camera from the office on Jam Street. The
     heading says exactly that. It was briefly captioned "A look at how we
     travel", which the footage does not deliver — a caption that oversells
     what follows costs more than it gains. Re-caption if a different film
     replaces this one. */
  eyebrow: 'Inside the office',
  heading: 'A word from our office on Jam Street',
  body: 'Meet the people who will be arranging your journey, in the office you are welcome to walk into.',
} as const;
