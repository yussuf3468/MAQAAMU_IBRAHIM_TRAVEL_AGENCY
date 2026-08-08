/* =========================================================================
   CONTENT BARREL
   -------------------------------------------------------------------------
   Components import from '@/content'. They never reach into a data file
   directly, and they never define business copy of their own.

   The `resolved` object below applies the publish rules from ./status.ts
   once, at module load, so no component has to remember to filter.
   ========================================================================= */

export * from './types';
export * from './status';

export { company, titleSuffix } from './company';
export { copy } from './copy';
export { media, openGraphImage } from './media';
export { modules, isModuleEnabled } from './modules';
export type { ModuleName } from './modules';

export { services, getServiceBySlug, serviceOptions } from './services';
export { flightRoutes, departureCity } from './routes';
export type { FlightRoute } from './routes';
export { destinations, getDestinationBySlug, destinationOptions } from './destinations';
export { travelPackages, getPackageBySlug } from './packages';
export { faqItems, groupFaqByCategory } from './faq';
export { aboutSections, getAboutSection, values } from './about';
export { trustPoints, trustStats, credentials, usableStats, usableCredentials } from './trust';
export { testimonials, testimonialPlaceholder } from './testimonials';
export {
  contactChannels,
  address,
  openingHours,
  socialLinks,
  enquiryDelivery,
} from './contact';
export { enquiryFields, activeEnquiryFields, enquiryCopy } from './enquiry';

import { publishable, publishableOne } from './status';
import { services } from './services';
import { destinations } from './destinations';
import { travelPackages } from './packages';
import { faqItems } from './faq';
import { aboutSections, values } from './about';
import { trustPoints, trustStats, credentials, usableStats, usableCredentials } from './trust';
import { testimonials, testimonialPlaceholder } from './testimonials';
import { contactChannels, address, openingHours, socialLinks } from './contact';
import { isDraftMode } from './status';

/**
 * The content the site is actually allowed to render, with the draft/live
 * rules already applied. This is the object components should read.
 */
export const resolved = {
  services: publishable(services),
  destinations: publishable(destinations),
  packages: publishable(travelPackages),
  faq: publishable(faqItems),
  about: publishable(aboutSections),
  values: publishable(values),
  trustPoints: publishable(trustPoints),
  /** Only stats that carry a figure AND are publishable. */
  trustStats: usableStats(publishable(trustStats)),
  credentials: usableCredentials(publishable(credentials)),
  /**
   * Real testimonials only. In draft mode a single marked skeleton stands in
   * so the section can be reviewed; it can never reach production because
   * `publishable` strips it in live mode.
   */
  testimonials: (() => {
    const real = publishable(testimonials);
    if (real.length > 0) return real;
    return isDraftMode ? [testimonialPlaceholder] : [];
  })(),
  contactChannels: publishable(contactChannels),
  address: publishableOne(address),
  openingHours: publishable(openingHours),
  socialLinks: publishable(socialLinks),
} as const;

/** Contact channels that are genuinely usable — confirmed and with an href. */
export const liveContactChannels = contactChannels.filter(
  (channel) => channel.status === 'confirmed' && Boolean(channel.href),
);

export const liveSocialLinks = socialLinks.filter(
  (link) => link.status === 'confirmed' && Boolean(link.href),
);

export function findLiveChannel(kind: 'phone' | 'whatsapp' | 'email') {
  return liveContactChannels.find((channel) => channel.kind === kind) ?? null;
}
