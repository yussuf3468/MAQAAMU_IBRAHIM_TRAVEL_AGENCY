import type {
  ContactChannel,
  OpeningHours,
  PostalAddress,
  SocialLink,
} from './types';

/* =========================================================================
   CONTACT
   -------------------------------------------------------------------------
   Taken from the agency's brochures and office signage.

   ⚠ TWO THINGS TO VERIFY WITH THE CLIENT
   1. EMAIL SPELLING. The address below is the one given to us directly.
      The printed brochure appears to read "...maqamuibrahim@gmail.com"
      (single A). If the printed one is correct, fix it here — an email
      address that bounces is worse than no email address at all.
   2. CITY. The office line on every brochure reads "Jam Street, Hodo Souk,
      2nd Floor, S26" without a city. Nairobi / Kenya is set below on the
      strength of the +254 dialling code and the "NAIROBI TO:" flight list
      on their own flyer. Confirm before this goes live, because it is used
      in the LocalBusiness structured data.

   Still outstanding: opening hours, and social media profiles.
   ========================================================================= */

export const contactChannels: ContactChannel[] = [
  {
    kind: 'whatsapp',
    label: 'WhatsApp',
    value: '+254 714 019 953',
    href: 'https://wa.me/254714019953',
    note: 'Fastest reply',
    primary: true,
    status: 'confirmed',
  },
  /* The brochure prints both numbers under "CALL / WHATSAPP". They are
     listed once each rather than twice: 714 019 953 as the WhatsApp line
     above, 708 365 414 as the phone line here. Repeating the same number
     under two labels made the contact block look padded. */
  {
    kind: 'phone',
    label: 'Call the office',
    value: '+254 708 365 414',
    href: 'tel:+254708365414',
    note: 'Or call +254 714 019 953',
    primary: true,
    status: 'confirmed',
  },
  {
    kind: 'email',
    label: 'Email',
    value: 'travelagencyltdmaqaamuibrahim@gmail.com',
    href: 'mailto:travelagencyltdmaqaamuibrahim@gmail.com',
    primary: false,
    status: 'confirmed',
  },
];

/* -------------------------------------------------------------------------
   ADDRESS
   ------------------------------------------------------------------------- */

export const address: PostalAddress = {
  streetAddress: 'Jam Street, Hodo Souk, 2nd Floor, S26',
  region: 'Eastleigh',
  locality: 'Nairobi',
  postalCode: null,
  country: 'Kenya',
  directions: 'Second floor of Hodo Souk, shop S26.',

  /* MAP — a SEARCH link, not a dropped pin.
     We have a street and a building but no coordinates and no Google
     Business listing from the client, so both URLs below run a real
     Google Maps search for the address rather than pointing at a pin we
     placed ourselves. A pin in the wrong doorway is worse than a search
     that lands on the right street.

     TO MAKE IT EXACT: ask the client to open Google Maps on their phone,
     find their own listing, tap Share → Copy link, and send it. Paste it
     into `mapUrl`, and paste the iframe URL from Share → Embed a map into
     `mapEmbedUrl`. Nothing else needs to change. */
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Hodo+Souk%2C+Jam+Street%2C+Eastleigh%2C+Nairobi',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Hodo+Souk%2C+Jam+Street%2C+Eastleigh%2C+Nairobi&z=16&output=embed',

  status: 'confirmed',
};

/* -------------------------------------------------------------------------
   OPENING HOURS
   Not stated on any brochure. The agency advertises 24/7 support, which is
   a support promise rather than office hours — the two are not the same
   thing, so nothing is published here until they tell us the real hours.
   ------------------------------------------------------------------------- */

export const openingHours: OpeningHours[] = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    label: 'Monday – Friday',
    opens: null,
    closes: null,
    status: 'awaiting-client',
  },
  {
    days: ['Saturday'],
    label: 'Saturday',
    opens: null,
    closes: null,
    status: 'awaiting-client',
  },
  {
    days: ['Sunday'],
    label: 'Sunday',
    opens: null,
    closes: null,
    status: 'awaiting-client',
  },
];

/* -------------------------------------------------------------------------
   SOCIAL
   No handles appear on any brochure or on the office signage. Delete any
   row the agency does not maintain rather than leaving it linkless.
   ------------------------------------------------------------------------- */

export const socialLinks: SocialLink[] = [
  {
    platform: 'tiktok',
    label: 'TikTok',
    // Tracking parameters (_r, _t) are stripped: they are tied to the
    // session that generated the share link and are meaningless — often
    // broken — for anyone else. The bare profile URL is the durable one.
    href: 'https://www.tiktok.com/@maqamuibrahimtravelagen1',
    status: 'confirmed',
  },
  { platform: 'facebook', label: 'Facebook', href: null, status: 'awaiting-client' },
  { platform: 'instagram', label: 'Instagram', href: null, status: 'awaiting-client' },
];

/* -------------------------------------------------------------------------
   ENQUIRY DELIVERY
   ------------------------------------------------------------------------- */

export const enquiryDelivery = {
  /**
   * Optional HTTPS endpoint (Formspree, Web3Forms, a Netlify function, …).
   * Set VITE_ENQUIRY_ENDPOINT to enable a true form POST.
   */
  endpoint: import.meta.env.VITE_ENQUIRY_ENDPOINT ?? null,
  /**
   * With no endpoint configured the completed enquiry is handed to
   * WhatsApp on +254 714 019 953 — which is how the agency already takes
   * enquiries, so the form works from day one with no backend.
   */
  fallback: 'whatsapp' as 'whatsapp' | 'email',
} as const;
