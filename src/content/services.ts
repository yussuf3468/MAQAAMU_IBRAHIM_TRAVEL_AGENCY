import type { Service } from './types';

/* =========================================================================
   SERVICES
   -------------------------------------------------------------------------
   Six confirmed services, taken from the client brief and from the
   agency's own brochures and office signage.

   WHAT IS EVIDENCED, AND WHERE FROM
     Umrah / Hajj      — the agency trades as "Hajj & Umrah Service"
     Air ticketing     — "TICKET BOOKING · Domestic & International",
                         "FLIGHT BOOKING · Worldwide Flights"
     Cargo             — confirmed in the client brief
     Hotel booking     — "HOTEL BOOKING · Comfortable Stays, Best Prices",
                         "Comfortable Stay Near Haram"
     Visa services     — "VISA SERVICES · Fast & Easy Processing"

   WHAT IS DELIBERATELY NOT CLAIMED
     No visa approval is guaranteed anywhere on this site. The agency
     advertises visa *processing* and *assistance*; a guaranteed outcome is
     a different promise and is not one they have made. Nothing here says
     "approved", "guaranteed" or "100%".

     Airline names, the IATA emblem and the Boeing logo appear on the
     office wall. They are not repeated on the website: wall décor is not
     evidence of an accreditation or a partnership, and publishing either
     without documentation is a legal exposure, not a marketing win. Ask
     the client for certificates and they can be added to trust.ts.

   The client said the list is "not limited" to these — add further
   services here as they confirm them.
   ========================================================================= */

export const services: Service[] = [
  {
    slug: 'umrah',
    title: 'Umrah',
    eyebrow: 'Hajj & Umrah Service',
    summary:
      'Complete Umrah journeys arranged end to end — visa processing, return air ticket, accommodation and guided ziyarat.',
    description: [
      'We arrange the whole Umrah journey from Nairobi so that you arrive with everything already settled: your Umrah visa processed, your return air ticket issued, and your accommodation confirmed before you travel.',
      'Groups depart on set dates and travel together with experienced guides who speak English, Arabic and other languages. Ziyarat tours in Makkah and Madinah are arranged for you, and ground transport is handled between the airport, your hotel and the Haram.',
      'Package prices and departure dates are published on our packages page. If the dates do not suit you, talk to us — we also arrange Umrah for individuals and families outside the group departures.',
    ],
    includes: [
      'Umrah visa processing',
      'Return air ticket',
      'Hotel accommodation',
      'Airport transfers and ground transportation',
      'Ziyarat tours in Makkah and Madinah',
      'Experienced guides — English, Arabic and other languages',
    ],
    audience: [
      'First-time pilgrims',
      'Families travelling together',
      'Group departures',
      'Travellers who want everything arranged in one place',
    ],
    process: [
      {
        title: 'Talk to us',
        body: 'Call or message the office on WhatsApp and tell us when you want to travel and how many of you there are.',
      },
      {
        title: 'We prepare your visa and ticket',
        body: 'We process your Umrah visa, issue your return air ticket and confirm your hotel accommodation.',
      },
      {
        title: 'Travel with the group',
        body: 'You travel with an experienced guide, with transport and ziyarat arranged, and the office reachable throughout.',
      },
    ],
    icon: 'compass',
    image: { slot: 'service.umrah', src: null, alt: 'Pilgrims performing tawaf around the Kaaba in the Masjid al-Haram.', tone: 'night', focal: 'center' },
    featured: true,
    status: 'confirmed',
  },

  {
    slug: 'hajj',
    title: 'Hajj',
    eyebrow: 'Hajj & Umrah Service',
    summary:
      'Hajj arrangements handled by an office that does this every season — from documents and tickets to accommodation and guidance.',
    description: [
      'Hajj is the journey people plan for years, and it is the one where the arrangements matter most. We handle the visa paperwork, the flights, the accommodation and the ground arrangements so that you can concentrate on the pilgrimage itself.',
      'Places and dates are set well in advance and are limited each season. Contact the office early to register your interest and we will tell you exactly what is available, what it costs and what is required from you.',
    ],
    includes: [
      'Hajj visa processing',
      'Return air ticket',
      'Accommodation',
      'Ground transportation',
      'Experienced guides',
    ],
    audience: [
      'Pilgrims performing Hajj',
      'Families travelling together',
      'Groups from Nairobi and the surrounding region',
    ],
    process: [
      {
        title: 'Register your interest early',
        body: 'Hajj places are limited and are arranged months ahead. Contact the office to be told what is available for the coming season.',
      },
      {
        title: 'Documents and payment',
        body: 'We confirm exactly which documents are needed and what the arrangement costs before anything is committed.',
      },
      {
        title: 'Travel and guidance',
        body: 'Flights, accommodation and transport are arranged, and experienced guides travel with the group.',
      },
    ],
    icon: 'route',
    image: { slot: 'service.hajj', src: null, alt: 'Worshippers filling the courtyard of the Masjid al-Haram in Makkah.', tone: 'dusk', focal: 'center' },
    featured: true,
    status: 'confirmed',
  },

  {
    slug: 'air-ticketing',
    title: 'Air ticketing',
    eyebrow: 'Domestic & international',
    summary:
      'Flight booking and ticketing from Nairobi — domestic routes and international destinations across the Gulf, Asia, Europe, Africa and beyond.',
    description: [
      'We book and issue tickets for domestic and international flights. From Nairobi we regularly ticket to Saudi Arabia, the UAE, Qatar, India, Malaysia, Türkiye, France, Germany, Canada, the USA, Australia, Ethiopia, Somalia, Uganda, Tanzania and South Africa.',
      'Tell us where you are going and when. We will come back with the options and issue the ticket once you are happy — you deal with a person in the office, not a booking screen.',
    ],
    includes: [
      'Domestic flight booking',
      'International flight booking',
      'Return and one-way tickets',
      'Date and route advice before you book',
    ],
    audience: [
      'Travellers flying from Nairobi',
      'Families and groups booking together',
      'Business travellers',
      'Anyone who would rather have a person handle the booking',
    ],
    process: [
      {
        title: 'Tell us your route and dates',
        body: 'Call or WhatsApp the office with where you are going, when, and how many people are travelling.',
      },
      {
        title: 'We come back with options',
        body: 'We check the routes and fares available and explain the difference between them.',
      },
      {
        title: 'Ticket issued',
        body: 'Once you confirm, we issue the ticket and send it to you.',
      },
    ],
    icon: 'plane',
    image: { slot: 'service.air-ticketing', src: null, alt: 'The wing of an aircraft above the clouds.', tone: 'dawn', focal: 'center' },
    featured: true,
    status: 'confirmed',
  },

  {
    slug: 'visa-services',
    title: 'Visa services',
    eyebrow: 'Fast and reliable',
    summary:
      'Visa assistance and processing, including Umrah visas — we prepare and submit the paperwork so nothing is held up by a missing document.',
    description: [
      'We assist with visa applications and handle the processing on your behalf, including Umrah visas for our pilgrimage groups.',
      'Our part is preparation and submission: making sure the application is complete, correct and submitted properly. The decision itself always rests with the issuing authority — we do not promise an outcome, and you should be wary of anyone who does.',
    ],
    includes: [
      'Umrah visa processing',
      'Visa application assistance',
      'Document checks before submission',
      'Guidance on what each application requires',
    ],
    audience: [
      'Pilgrims travelling for Umrah or Hajj',
      'Travellers applying for a visa for the first time',
      'Anyone unsure which documents are required',
    ],
    process: [
      {
        title: 'Bring us your documents',
        body: 'We tell you exactly what is needed for your destination and check what you have.',
      },
      {
        title: 'We prepare and submit',
        body: 'The application is completed and submitted properly, so it is not delayed by an avoidable error.',
      },
      {
        title: 'We keep you informed',
        body: 'You hear from us as the application progresses. The decision rests with the issuing authority.',
      },
    ],
    icon: 'passport',
    image: { slot: 'service.visa-services', src: null, alt: 'A passport resting on a wooden table.', tone: 'alpine', focal: 'center' },
    featured: false,
    status: 'confirmed',
  },

  {
    slug: 'hotel-booking',
    title: 'Hotel booking',
    eyebrow: 'Comfortable stays',
    summary:
      'Hotel reservations at fair prices, including accommodation close to the Haram for pilgrims travelling with us.',
    description: [
      'We reserve accommodation for travellers going anywhere we ticket, and for pilgrims we book hotels close to the Haram so that the walk to prayer is short.',
      'Tell us your budget and what matters most — distance, room type, or travelling as a family — and we will find something that fits rather than the first thing available.',
    ],
    includes: [
      'Hotel reservations worldwide',
      'Accommodation near the Haram in Makkah and Madinah',
      'Family and group rooms',
      'Booking confirmed before you travel',
    ],
    audience: [
      'Pilgrims travelling for Umrah or Hajj',
      'Families needing rooms together',
      'Travellers booking flights with us who also need a hotel',
    ],
    process: [
      {
        title: 'Tell us where and when',
        body: 'Give us your city, your dates and how many rooms you need.',
      },
      {
        title: 'We find and hold the room',
        body: 'We come back with options at the price range you have set.',
      },
      {
        title: 'Confirmed before you fly',
        body: 'Your reservation is confirmed and sent to you before you travel.',
      },
    ],
    icon: 'building',
    image: { slot: 'service.hotel-booking', src: null, alt: 'Hotel towers overlooking the Masjid al-Haram in Makkah.', tone: 'ocean', focal: 'center' },
    featured: false,
    status: 'confirmed',
  },

  {
    slug: 'cargo',
    title: 'Cargo',
    eyebrow: 'Freight and shipping',
    summary:
      'Cargo handled alongside your travel — talk to the office about what you are sending and where it needs to go.',
    description: [
      'We handle cargo as well as passenger travel. Contact the office with what you are sending, where it is going and roughly what it weighs, and we will tell you the options and the cost.',
    ],
    includes: [
      'Cargo booking and handling',
      'Advice on what can and cannot be sent',
      'Costs confirmed before anything is shipped',
    ],
    audience: [
      'Customers sending goods abroad',
      'Traders shipping regularly',
      'Travellers sending items ahead or behind them',
    ],
    process: [
      {
        title: 'Tell us what you are sending',
        body: 'Contact the office with the destination, the contents and the approximate weight.',
      },
      {
        title: 'We quote it',
        body: 'We confirm what it will cost and how long it should take before anything is committed.',
      },
      {
        title: 'We send it',
        body: 'The cargo is booked and handled, and you are told when it is on its way.',
      },
    ],
    icon: 'globe',
    image: { slot: 'service.cargo', src: null, alt: 'Shipping containers stacked on a cargo vessel.', tone: 'aurora', focal: 'center' },
    featured: false,
    status: 'confirmed',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Options for the enquiry form's service dropdown. */
export function serviceOptions(available: readonly Service[]): { value: string; label: string }[] {
  return available.map((service) => ({ value: service.slug, label: service.title }));
}
