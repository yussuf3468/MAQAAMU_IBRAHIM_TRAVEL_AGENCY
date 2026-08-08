import type { Credential, TrustPoint, TrustStat } from './types';

/* =========================================================================
   TRUST
   -------------------------------------------------------------------------
   The three points below are the agency's own promises, taken word for
   word from the footer band of their brochures and from their signage:
   "Trusted Service · Best Prices · Spiritual Journey · Memorable
   Experience", "24/7 Support", "Excellent service from heart to heart",
   and "Fast & Reliable Visa Assistance". They are the client's claims
   about the client, which is the only kind that belongs here.

   ⚠ WHAT IS DELIBERATELY LEFT EMPTY, AND WHY

   trustStats — no number is published. We have not been given years in
   business, pilgrims served or groups flown. A plausible-looking figure
   is the easiest thing in the world to write and the hardest to defend.
   The qualitative band below carries the section on its own, so there is
   no design pressure to invent one. Send us real figures and they appear.

   credentials — the office wall carries an IATA emblem, a Boeing logo and
   several airline logos. None of them are reproduced on the website. Wall
   décor is not evidence of an accreditation or a partnership, and
   publishing a claimed IATA accreditation without the certificate is a
   legal exposure rather than a marketing benefit. If the client provides
   the certificate or the agency code, add it below and it will render in
   the trust band immediately.
   ========================================================================= */

export const trustPoints: TrustPoint[] = [
  {
    title: 'Excellent service, from heart to heart',
    body: 'You deal with the same office from the first message to the day you return. Not a call centre, not a booking screen — people who know your file.',
    icon: 'users',
    status: 'confirmed',
  },
  {
    title: 'Fast and reliable visa assistance',
    body: 'We prepare and submit your paperwork properly so nothing is delayed by an avoidable mistake. We never promise an approval — that decision belongs to the issuing authority.',
    icon: 'shield',
    status: 'confirmed',
  },
  {
    title: 'Support around the clock',
    body: 'We are reachable on the phone and on WhatsApp while you are travelling, not only while you are booking.',
    icon: 'compass',
    status: 'confirmed',
  },
];

/* -------------------------------------------------------------------------
   NUMBERS — see the note above. Fill in only figures the client states.
   ------------------------------------------------------------------------- */

export const trustStats: TrustStat[] = [
  { value: '', label: 'Years arranging travel', status: 'awaiting-client' },
  { value: '', label: 'Pilgrims travelled with us', status: 'awaiting-client' },
  { value: '', label: 'Group departures each year', status: 'awaiting-client' },
];

/* -------------------------------------------------------------------------
   CREDENTIALS — see the note above. Documents required before publishing.
   ------------------------------------------------------------------------- */

export const credentials: Credential[] = [
  { name: '', issuer: null, reference: null, status: 'awaiting-client' },
];

/** A stat is only usable once it actually carries a figure. */
export function usableStats(stats: readonly TrustStat[]): TrustStat[] {
  return stats.filter((stat) => stat.value.trim().length > 0);
}

export function usableCredentials(items: readonly Credential[]): Credential[] {
  return items.filter((item) => item.name.trim().length > 0);
}
