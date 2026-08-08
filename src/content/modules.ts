/* =========================================================================
   SITE MODULES
   -------------------------------------------------------------------------
   One switch per optional area of the site. Turning a module off removes
   its route, its navigation entry, its homepage section and its sitemap
   entry together — there is no second place to remember.

   CURRENT STATE — both confirmed by the client's own materials:

     destinations — ON. Makkah and Madinah, the two cities every journey
                    the agency arranges is built around. The sixteen
                    countries they *ticket* to are a different thing and
                    live in ./routes.ts as a list, not as pages.

     packages     — ON. Three real Umrah departures for August 2026, with
                    published prices. Switch this off if the agency stops
                    selling fixed departures and quotes per enquiry
                    instead; the page, the homepage band, the nav entry
                    and the sitemap entries all disappear together.
   ========================================================================= */

export const modules = {
  destinations: true,
  packages: true,
  /** The standalone /booking enquiry flow. Keep on — it is the main CTA. */
  booking: true,
  faq: true,
  /** Testimonials render only when a confirmed testimonial exists anyway. */
  testimonials: true,
} as const;

export type ModuleName = keyof typeof modules;

export function isModuleEnabled(name: ModuleName): boolean {
  return modules[name];
}
