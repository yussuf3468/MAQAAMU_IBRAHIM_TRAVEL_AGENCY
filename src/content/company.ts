import type { CompanyProfile } from './types';

/* =========================================================================
   COMPANY PROFILE
   -------------------------------------------------------------------------
   Populated from the agency's own brochures, flyers and office signage.

   NAME SPELLING — RESOLVED. The client confirmed "MAQAAMU IBRAHIM" (double
   A) is correct, which is what is used throughout. Some of their older
   printed material reads "MAQAMU" with a single A; that is the outdated
   spelling and should not be copied back in.

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
