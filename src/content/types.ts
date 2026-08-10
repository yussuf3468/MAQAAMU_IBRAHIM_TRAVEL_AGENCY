/* =========================================================================
   CONTENT TYPES
   -------------------------------------------------------------------------
   Every piece of business information on this website is typed here and
   authored in the sibling files of this folder. No component hard-codes
   business copy.

   THE STATUS FIELD IS THE SAFETY MECHANISM
   ----------------------------------------
   Each record carries `status`:

     'confirmed'      — supplied by MAQAAMU IBRAHIM TRAVEL AGENCY. Safe to publish.
     'awaiting-client'— a structural placeholder written by the design team.
                        It contains NO factual claims about the business.

   In draft mode the site renders placeholders with a visible marker so the
   layout can be reviewed. In live mode (VITE_CONTENT_MODE=live) every
   'awaiting-client' record is filtered out before it ever reaches a
   component — it is therefore impossible to publish unverified information
   by accident. See ./status.ts.
   ========================================================================= */

export type ContentStatus = 'confirmed' | 'awaiting-client';

export interface ContentRecord {
  /** See the note at the top of this file. Defaults are never assumed. */
  status: ContentStatus;
}

/* ---------------------------------------------------------------------------
   IMAGERY
   An image is referenced by a semantic slot, never by a raw path scattered
   through components. `src` stays null until the client supplies photography;
   until then <EditorialImage> renders a composed abstract in the slot's tone.
   --------------------------------------------------------------------------- */

/** Cinematic tones used by the placeholder art. See lib/placeholder-art.ts. */
export type ImageTone = 'dawn' | 'dusk' | 'ocean' | 'alpine' | 'night' | 'aurora';

export type ImageFocal = 'center' | 'top' | 'bottom' | 'left' | 'right';

export interface ImageRef {
  /** Stable identifier, e.g. 'home.hero'. Used to seed the placeholder art. */
  slot: string;
  /** Path under /public once the client's photograph is dropped in. */
  src: string | null;
  /** Optional 2x / wide source set, same rules as `src`. */
  srcSet?: string | null;
  /** Required. Describes the photograph for screen readers and for SEO. */
  alt: string;
  tone: ImageTone;
  focal?: ImageFocal;
  /** Short caption rendered under editorial images where appropriate. */
  caption?: string;
}

/* ---------------------------------------------------------------------------
   COMPANY & CONTACT
   --------------------------------------------------------------------------- */

export interface CompanyProfile {
  /** Exact registered trading name. Never abbreviated without client sign-off. */
  legalName: string;
  /** Used in <title> tags and the header lockup. */
  displayName: string;
  /** Optional shorter form — only populated with client approval. */
  shortName: string | null;
  tagline: { value: string; status: ContentStatus };
  /** One-paragraph description used for meta descriptions and JSON-LD. */
  summary: { value: string; status: ContentStatus };
  foundedYear: { value: number | null; status: ContentStatus };
  /** Canonical production origin, no trailing slash. */
  siteUrl: string;
  locale: string;
  /** ISO 3166-1 alpha-2, or null until confirmed. */
  countryCode: string | null;
}

export type ContactChannelKind = 'phone' | 'whatsapp' | 'email' | 'address' | 'social';

export interface ContactChannel extends ContentRecord {
  kind: ContactChannelKind;
  label: string;
  /** Human-readable value, e.g. '+000 000 0000'. Empty while awaiting client. */
  value: string;
  /** Fully-formed href, e.g. 'tel:+...', 'mailto:...', 'https://wa.me/...'. */
  href: string | null;
  /** Shown beneath the value, e.g. 'Mon–Sat'. */
  note?: string;
  /** Surface this channel in the mobile action bar. */
  primary?: boolean;
}

export interface OpeningHours extends ContentRecord {
  /** Schema.org day tokens, e.g. ['Monday','Tuesday']. */
  days: string[];
  label: string;
  opens: string | null;
  closes: string | null;
  closed?: boolean;
}

export interface SocialLink extends ContentRecord {
  platform: 'instagram' | 'facebook' | 'x' | 'tiktok' | 'youtube' | 'linkedin';
  label: string;
  href: string | null;
}

export interface PostalAddress extends ContentRecord {
  streetAddress: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  /** Free-text directions line shown on the contact page. */
  directions?: string | null;
  /** Google Maps link opened by the "Open in Google Maps" button. */
  mapUrl: string | null;
  /**
   * Embed URL for the inline map iframe. Must end in `&output=embed`.
   * A search-query embed is used until the client sends the exact place
   * link — it points at a real search, not at an invented pin.
   */
  mapEmbedUrl?: string | null;
}

/* ---------------------------------------------------------------------------
   SERVICES
   --------------------------------------------------------------------------- */

export type ServiceIcon =
  | 'route'
  | 'plane'
  | 'passport'
  | 'compass'
  | 'shield'
  | 'building'
  | 'users'
  | 'globe';

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Service extends ContentRecord {
  slug: string;
  title: string;
  /** Small label above the title on the detail page. */
  eyebrow: string;
  /** One or two sentences. Used on cards and in meta descriptions. */
  summary: string;
  /** Long-form paragraphs for the detail page. */
  description: string[];
  /** 'What's included' list. */
  includes: string[];
  /** 'Who this is for' list. */
  audience: string[];
  /** How the agency handles this service, step by step. */
  process: ProcessStep[];
  icon: ServiceIcon;
  image: ImageRef;
  /** Surfaced on the homepage. */
  featured: boolean;
}

/* ---------------------------------------------------------------------------
   DESTINATIONS
   --------------------------------------------------------------------------- */

export interface Destination extends ContentRecord {
  slug: string;
  name: string;
  /** City / country / region line beneath the name. */
  region: string;
  summary: string;
  description: string[];
  /** e.g. 'Family', 'Group', 'Business'. Client-supplied vocabulary. */
  travelStyles: string[];
  /** Free text, e.g. 'October to March'. Never guessed. */
  bestTime: string | null;
  highlights: string[];
  image: ImageRef;
  featured: boolean;
}

/* ---------------------------------------------------------------------------
   PACKAGES
   --------------------------------------------------------------------------- */

export interface TravelPackage extends ContentRecord {
  slug: string;
  name: string;
  summary: string;
  /** e.g. '7 nights'. Null until confirmed. */
  duration: string | null;
  /** Free-text, e.g. 'From $0,000 per person'. Null until confirmed — the
   *  UI shows an enquiry CTA instead of inventing a number. */
  priceNote: string | null;
  inclusions: string[];
  exclusions: string[];
  /**
   * Small chip shown on the package card and its page.
   *
   * IT MUST STATE A FACT, NOT A SALES CLAIM. "Most included" and "10 days"
   * are checkable against the package itself. "50% off", "Best price in
   * Nairobi" or "Special offer" are commercial claims and may only be used
   * if the agency says so in writing — a discount implies a previous higher
   * price, which is exactly the kind of thing consumer regulators and
   * customers both check.
   */
  badge: string | null;
  /** Draws the card with the emphasised treatment. Use on one package. */
  highlight?: boolean;
  image: ImageRef;
  featured: boolean;
}

/* ---------------------------------------------------------------------------
   SOCIAL PROOF
   --------------------------------------------------------------------------- */

export interface Testimonial extends ContentRecord {
  quote: string;
  author: string;
  /** e.g. 'Travelled with family, 2025'. */
  context: string | null;
}

/** A qualitative trust statement. These describe how the agency works and
 *  are only published once the client confirms each one is accurate. */
export interface TrustPoint extends ContentRecord {
  title: string;
  body: string;
  icon: ServiceIcon;
}

/** A quantitative credential (years, travellers served, destinations).
 *  Deliberately separate from TrustPoint — numbers are never estimated. */
export interface TrustStat extends ContentRecord {
  value: string;
  label: string;
}

export interface Credential extends ContentRecord {
  name: string;
  issuer: string | null;
  /** Reference or licence number, shown only when the client supplies it. */
  reference: string | null;
}

/* ---------------------------------------------------------------------------
   FAQ
   --------------------------------------------------------------------------- */

export interface FaqItem extends ContentRecord {
  question: string;
  answer: string;
  category: string;
}

/* ---------------------------------------------------------------------------
   ABOUT
   --------------------------------------------------------------------------- */

export interface AboutSection extends ContentRecord {
  /** Stable key so the client interview notes map straight onto a slot. */
  key: 'who' | 'what' | 'why' | 'who-we-serve' | 'difference';
  eyebrow: string;
  heading: string;
  body: string[];
}

export interface ValuePoint extends ContentRecord {
  title: string;
  body: string;
}

/* ---------------------------------------------------------------------------
   ENQUIRY FORM
   --------------------------------------------------------------------------- */

export type EnquiryFieldName =
  | 'name'
  | 'phone'
  | 'email'
  | 'service'
  | 'destination'
  | 'departureDate'
  | 'returnDate'
  | 'travellers'
  | 'message';

export interface EnquiryFieldConfig {
  name: EnquiryFieldName;
  label: string;
  type: 'text' | 'tel' | 'email' | 'date' | 'number' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  helpText?: string;
  autoComplete?: string;
  /** Column width in the two-column form grid. Defaults to 'half'. */
  span?: 'half' | 'full';
  /** Turn a field off in one line once the client explains their process. */
  enabled: boolean;
}
