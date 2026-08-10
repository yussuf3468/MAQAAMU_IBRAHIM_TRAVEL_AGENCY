import type { TravelPackage } from './types';

/* =========================================================================
   TRAVEL PACKAGES
   -------------------------------------------------------------------------
   Three Umrah packages, transcribed from the agency's own 2026 flyers.

   PRICES AND DATES ARE REAL AND ARE COMMERCIAL COMMITMENTS.
   Every figure below is printed on a flyer the agency is already
   circulating. Nothing has been rounded, adjusted or inferred. Two things
   follow from that:

     • When a departure sells out or a date moves, this file must be
       updated — a stale price on a website is a customer argument.
     • Prices are per person and are stated in US dollars, exactly as the
       flyers state them.

   THE EXCLUSIONS ARE AS IMPORTANT AS THE INCLUSIONS. The Normal package
   flyer explicitly lists what is *not* covered, and that list is carried
   through to the website. A package page that shows only the good news is
   how travel companies end up in disputes.
   ========================================================================= */

export const travelPackages: TravelPackage[] = [
  {
    slug: 'umrah-normal-august-2026',
    badge: 'Lowest price',
    name: 'Umrah — Normal Package',
    summary:
      'Our standard Umrah departure: visa, return flight and hotel accommodation arranged, travelling as a group.',
    duration: 'Departs 17 August 2026 · Returns 27 August 2026',
    priceNote: 'USD 1,250 per person',
    inclusions: ['Umrah visa processing', 'Return air ticket', 'Hotel accommodation', 'Ziyarat'],
    exclusions: ['Train ticket', 'Meals and food', 'Personal expenses'],
    image: {
      slot: 'package.umrah-normal',
      src: null,
      alt: 'The view from an aircraft window above the clouds.',
      tone: 'night',
      focal: 'center',
    },
    featured: true,
    status: 'confirmed',
  },

  {
    slug: 'umrah-vip-august-2026',
    badge: 'Most included',
    highlight: true,
    name: 'Umrah — VIP Package',
    summary:
      'The full arrangement: everything in the standard package plus ground transport, ziyarah tours, professional guides, Kudar breakfast and the Haramain high-speed train.',
    duration: 'Departs 17 August 2026 · Returns 27 August 2026',
    priceNote: 'USD 2,200 per person',
    inclusions: [
      'Umrah visa processing',
      'Return air ticket',
      'Hotel accommodation',
      'Airport transfers',
      'Ground transportation',
      'Ziyarah tours',
      'Professional guides',
      'Breakfast',
      'Haramain high-speed train ticket',
    ],
    exclusions: ['Personal expenses'],
    image: { slot: 'package.umrah-vip', src: null, alt: 'An aircraft window looking out over a bank of cloud.', tone: 'dusk', focal: 'center' },
    featured: true,
    status: 'confirmed',
  },

  {
    slug: 'umrah-full-august-2026',
    badge: '10 days',
    name: 'Umrah — Full Package, 10 days',
    summary:
      'A ten-day Umrah covering Makkah and Madinah, with ticketing, hotels near the Haram, transport and experienced guides.',
    duration: '10 days · 17 – 27 August 2026',
    priceNote: 'USD 1,250 per person',
    inclusions: [
      'Ticket booking — domestic and international',
      'Hotel reservation — comfortable stay near the Haram',
      'Transport service — airport transfers and ziyarat tours',
      'Experienced guides — English, Arabic and other languages',
    ],
    exclusions: [],
    image: { slot: 'package.umrah-full', src: null, alt: 'A passport resting on a table.', tone: 'dawn', focal: 'center' },
    featured: false,
    status: 'confirmed',
  },
];

export function getPackageBySlug(slug: string): TravelPackage | undefined {
  return travelPackages.find((item) => item.slug === slug);
}
