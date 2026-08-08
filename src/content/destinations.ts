import type { Destination } from './types';

/* =========================================================================
   DESTINATIONS
   -------------------------------------------------------------------------
   Two destinations, because these are the two the agency actually takes
   people to: Makkah and Madinah.

   The ziyarat sites listed under each are the ones pictured and named on
   the agency's own Umrah flyer — Masjid Quba, Masjid Qiblatain, Jabal
   Uhud, Jabal Rahmah and the two Harams. They have been sorted into the
   correct city; nothing has been added to the list.

   The countries the agency FLIES to are a different thing and live in
   ./routes.ts. Sixteen thin country pages would have been padding, and
   would have needed descriptions nobody has given us.

   Descriptions here are written around what the agency arranges, not
   around the religious significance of each site — that is not ours to
   write, and pilgrims do not need it explained to them.
   ========================================================================= */

export const destinations: Destination[] = [
  {
    slug: 'makkah',
    name: 'Makkah',
    region: 'Saudi Arabia',
    summary:
      'Where the Umrah is performed. We arrange accommodation close to the Haram so the walk to prayer is short.',
    description: [
      'Every Umrah and Hajj journey we arrange centres on Makkah. Our part is to remove the logistics from it: your visa processed before you leave Nairobi, your flight ticketed, your hotel booked close to the Masjid al-Haram, and transport arranged from the airport onwards.',
      'Groups travel with experienced guides who speak English, Arabic and other languages, and ziyarah tours are arranged for you rather than left to work out on arrival.',
    ],
    travelStyles: ['Umrah', 'Hajj', 'Family', 'Group departures'],
    bestTime: null,
    highlights: [
      'Accommodation close to the Masjid al-Haram',
      'Airport transfers and ground transportation',
      'Ziyarah tours, including Jabal Rahmah',
      'Experienced guides throughout',
    ],
    image: { slot: 'destination.makkah', src: null, alt: 'The Kaaba at the centre of the Masjid al-Haram, surrounded by pilgrims.', tone: 'night', focal: 'center' },
    featured: true,
    status: 'confirmed',
  },

  {
    slug: 'madinah',
    name: 'Madinah',
    region: 'Saudi Arabia',
    summary:
      'The second half of the journey, with guided ziyarat to the sites around the city and the Haramain train between the two.',
    description: [
      'Our Umrah packages include Madinah as well as Makkah. Travel between the two cities is arranged for you — on our VIP package that is the Haramain high-speed train.',
      'Ziyarat around Madinah is guided, and covers the sites on our published itinerary. Accommodation, transfers and the return flight are all part of the same arrangement.',
    ],
    travelStyles: ['Umrah', 'Hajj', 'Family', 'Group departures'],
    bestTime: null,
    highlights: [
      'Guided ziyarat to Masjid Quba',
      'Guided ziyarat to Masjid Qiblatain',
      'Guided ziyarat to Jabal Uhud',
      'Haramain high-speed train from Makkah on the VIP package',
    ],
    image: { slot: 'destination.madinah', src: null, alt: 'The green dome of Al-Masjid an-Nabawi in Madinah.', tone: 'dusk', focal: 'center' },
    featured: true,
    status: 'confirmed',
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

export function destinationOptions(
  available: readonly Destination[],
): { value: string; label: string }[] {
  return available.map((destination) => ({
    value: destination.slug,
    label: destination.name,
  }));
}
