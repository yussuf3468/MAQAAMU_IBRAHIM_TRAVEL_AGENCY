/* =========================================================================
   EDITORIAL COPY
   -------------------------------------------------------------------------
   Every headline, eyebrow and section intro on the site.

   The voice is built from the agency's own printed lines — "Safe journey,
   peace of mind", "Your journey, your worship, your comfort", "Excellent
   service from heart to heart". Nothing here claims anything the agency
   has not claimed itself: no superlatives, no guaranteed visas, no
   invented statistics.

   Business facts do not live here. They live in the typed content files
   with a status field beside them.
   ========================================================================= */

export const copy = {
  /* -----------------------------------------------------------------------
     THE HERO SETS WHAT KIND OF BUSINESS THIS IS.
     An earlier version led with "Hajj & Umrah Service" and a photograph of
     Al-Masjid an-Nabawi. That is what their printed material leads with,
     but it made the website read as a pilgrimage specialist — so a customer
     wanting a ticket to Dubai, a hotel, a visa or a cargo shipment could not
     tell the site was for them.

     The agency is a full travel agency that is also very good at Hajj and
     Umrah. The eyebrow, headline, subhead and hero image now all say that,
     and the services grid sits directly beneath so the whole range is
     visible without scrolling.
     ----------------------------------------------------------------------- */
  hero: {
    /** The agency's own line, printed on every brochure and their signage. */
    headline: 'Safe journey, peace of mind.',
    eyebrow: 'Travel Agency · Nairobi',
    subhead:
      'Flights across Kenya and the world, cargo, hotels, visas — and Hajj and Umrah arranged end to end. One office on Jam Street handles all of it.',
    primaryCta: 'Plan Your Journey',
    secondaryCta: 'Explore Our Services',
    scrollHint: 'Scroll',
  },

  intro: {
    eyebrow: 'The agency',
    heading: 'Everything a journey needs, in one office.',
    body: 'A trip is a hundred small arrangements that have to hold together — a ticket, a visa, a room, transport that turns up, cargo that arrives. Our work is to make all of it invisible to you, so that what you remember is the journey and not the paperwork behind it.',
    cta: 'More about us',
  },

  services: {
    eyebrow: 'What we do',
    heading: 'Nine things we handle for you',
    intro:
      'Flights, cargo, visas, hotels, Hajj and Umrah, and travel arranged around whatever you need. One office, from the first message to the day you are home.',
    cta: 'View all services',
    detailIncludes: 'What’s included',
    detailAudience: 'Who this is for',
    detailProcess: 'How it works',
    empty:
      'Our services are being finalised. Get in touch and we will tell you exactly what we can arrange for you.',
  },

  destinations: {
    eyebrow: 'Pilgrimage',
    heading: 'Makkah and Madinah',
    intro:
      'For those travelling for Umrah or Hajj: accommodation near the Haram, guided ziyarat, and the transport between the two cities.',
    cta: 'View destinations',
    detailHighlights: 'What we arrange here',
    detailBestTime: 'Best time to travel',
    detailStyles: 'Travel styles',
    empty:
      'Destination details are on the way. Tell us where you would like to go and we will let you know what we can arrange.',
  },

  packages: {
    eyebrow: 'On offer now · Umrah 2026',
    heading: 'August 2026 departures',
    intro:
      'Three Umrah packages leaving this August, with the price, the dates and exactly what each one covers. Places on each departure are limited.',
    priceOnEnquiry: 'Price on enquiry',
    detailInclusions: 'Included',
    detailExclusions: 'Not included',
    empty:
      'Our packages are being prepared. In the meantime we are happy to build something around your dates.',
  },

  routes: {
    eyebrow: 'Air ticketing',
    heading: 'Where we fly from Nairobi',
    intro:
      'Destinations we ticket regularly. We also book domestic flights — if your route is not listed, ask us.',
  },

  trust: {
    eyebrow: 'Why travellers stay with us',
    heading: 'Handled properly, start to finish.',
    intro:
      'No exaggerated promises — only the way we work, and the standard we hold ourselves to on every arrangement.',
  },

  testimonials: {
    eyebrow: 'In their words',
    heading: 'Travellers we have looked after',
  },

  about: {
    eyebrow: 'About',
    heading: 'MAQAAMU IBRAHIM TRAVEL AGENCY',
    intro:
      'A full travel agency working from Jam Street, Hodo Souk in Nairobi — flights, cargo, visas, hotels, and Hajj and Umrah.',
    valuesEyebrow: 'What we hold to',
    valuesHeading: 'The way we work',
  },

  faq: {
    eyebrow: 'Questions',
    heading: 'Frequently asked questions',
    intro:
      'The things travellers ask us most. If your question is not here, ask us directly — we would rather answer than have you guess.',
    stillAsking: 'Still have a question?',
    stillAskingBody: 'Ask us directly. A real person will answer.',
  },

  contact: {
    eyebrow: 'Contact',
    heading: 'Talk to us',
    intro:
      'Call, message on WhatsApp, write, or come into the office on Jam Street. You will reach a person, not a queue.',
    channelsHeading: 'Reach us',
    visitHeading: 'Visit the office',
    hoursHeading: 'Opening hours',
    followHeading: 'Follow the agency',
    mapCta: 'Open in Google Maps',
  },

  booking: {
    eyebrow: 'Plan your journey',
    heading: 'Start your enquiry',
    intro:
      'This is not an instant booking — it is the start of a conversation. Tell us what you have in mind and we will come back to you with real options.',
  },

  cta: {
    eyebrow: 'Ready when you are',
    heading: 'Let’s plan your journey.',
    body: 'Tell us where you are going. We will handle what comes next.',
    primary: 'Plan Your Journey',
    secondary: 'Contact the agency',
  },

  notFound: {
    heading: 'This page has moved on.',
    body: 'The page you were looking for is not here. Everything else still is.',
    cta: 'Return home',
  },

  general: {
    skipToContent: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    backToServices: 'All services',
    backToDestinations: 'All destinations',
    backToPackages: 'All packages',
    loading: 'Loading',
  },
} as const;
