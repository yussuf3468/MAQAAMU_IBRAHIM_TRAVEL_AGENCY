import type { CompanyProfile } from './types';

/* =========================================================================
   COMPANY PROFILE
   -------------------------------------------------------------------------
   Populated from the agency's own brochures, flyers and office signage.

   ⚠ ONE THING TO CONFIRM WITH THE CLIENT — NAME SPELLING
   The brief gave the trading name as "MAQAAMU IBRAHIM" (double A). The
   printed brochures and the office signage read "MAQAMU IBRAHIM" (single
   A), and the email address uses the single-A spelling too. The brief's
   spelling is used here because it was given to us directly. Ask which is
   correct — it appears in the page title, the wordmark, the footer, the
   manifest and the structured data, so it is a one-line fix in this file
   but only if we know the answer.

   Still outstanding: founding year, and the agency's own description of
   itself in a sentence (the summary below is assembled from the services
   listed on their own flyers, not written for them).
   ========================================================================= */

export const company: CompanyProfile = {
  legalName: 'MAQAAMU IBRAHIM TRAVEL AGENCY',
  displayName: 'MAQAAMU IBRAHIM TRAVEL AGENCY',
  shortName: null,

  tagline: {
    // The agency's own line, used across every brochure and their signage.
    value: 'Safe journey, peace of mind.',
    status: 'confirmed',
  },

  summary: {
    value:
      'MAQAAMU IBRAHIM TRAVEL AGENCY arranges Hajj and Umrah journeys, domestic and international air ticketing, cargo, hotel booking and visa services from its office on Jam Street, Hodo Souk, Nairobi.',
    status: 'confirmed',
  },

  foundedYear: {
    value: null,
    status: 'awaiting-client',
  },

  // Update to the real domain before the first production deploy.
  siteUrl: 'https://maqaamuibrahimtravel.com',
  locale: 'en',
  countryCode: 'KE',
};

/** Used in <title> tags: "Page — MAQAAMU IBRAHIM TRAVEL AGENCY". */
export const titleSuffix = company.displayName;

/**
 * The agency's trilingual promise, printed on their brochure. Shown as
 * supplied, in their three languages, with the English first.
 * Confirmed — this is their own copy, not ours.
 */
export const promise = {
  english: 'Your journey. Your worship. Your comfort.',
  somali: 'Safarkaaga. Cibaadadaada. Raaxadaada.',
  arabic: 'رحلتك .. عبادتك .. راحتك',
} as const;
