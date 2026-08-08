import type { AboutSection, ValuePoint } from './types';

/* =========================================================================
   ABOUT
   -------------------------------------------------------------------------
   Two of the five sections are confirmed. They are written from what the
   agency's own materials state — the services they list, the office they
   trade from, the languages their guides speak, and the promises printed
   on their brochures.

   THREE SECTIONS ARE STILL INTERVIEW SLOTS, and they are the ones that
   matter most: who runs the agency, why it was started, and what it does
   that others do not. Those cannot be written from a flyer. Ask the client
   each heading as a question and paste the answer in — a stranger decides
   whether to trust a travel agency on exactly those three paragraphs.
   ========================================================================= */

export const aboutSections: AboutSection[] = [
  {
    key: 'who',
    eyebrow: 'Who we are',
    heading: 'The people behind the agency',
    body: [
      'Interview slot. Ask: who runs MAQAAMU IBRAHIM TRAVEL AGENCY, how long has the office been on Jam Street, and who will the traveller actually be dealing with? Write the answer here in the agency’s own voice.',
      'A second paragraph can introduce the team and the way they prefer to work with people.',
    ],
    status: 'awaiting-client',
  },
  {
    key: 'what',
    eyebrow: 'What we do',
    heading: 'Pilgrimage, flights, cargo and everything around them',
    body: [
      'We are a Hajj and Umrah service and a travel agency, working from our office at Jam Street, Hodo Souk in Nairobi. We arrange complete Umrah and Hajj journeys — visa processing, return air tickets, accommodation near the Haram, ground transport, ziyarat and experienced guides who speak English, Arabic and other languages.',
      'Alongside the pilgrimage work we book domestic and international flights, reserve hotels, assist with visa applications and handle cargo. From Nairobi we ticket to Saudi Arabia, the UAE, Qatar, India, Malaysia, Türkiye, France, Germany, Canada, the USA, Australia, Ethiopia, Somalia, Uganda, Tanzania and South Africa.',
      // ⚠ CONFIRM THE FREQUENCY. Written from the client's note "we offer
      // flights doing Umrah, every 2-3 day a month". Read as: departures
      // run every two to three days through the month. If they meant two
      // or three departures per month, change this line — it is a
      // scheduling promise and travellers will plan around it.
      'Umrah departures run every two to three days through the month, so there is usually a group leaving soon after you decide to travel.',
      'Whatever the journey, the arrangement is the same: you talk to a person in our office, and that office stays reachable until you are home.',
    ],
    status: 'confirmed',
  },
  {
    key: 'why',
    eyebrow: 'Why we exist',
    heading: 'Why the agency was started',
    body: [
      'Interview slot. Ask: why was this agency started, and what was it meant to fix for travellers from this community? This is the paragraph that makes a stranger care, and it has to be the client’s own story rather than ours.',
    ],
    status: 'awaiting-client',
  },
  {
    key: 'who-we-serve',
    eyebrow: 'Who we serve',
    heading: 'The travellers we look after',
    body: [
      'We look after pilgrims travelling for Umrah and Hajj — first-time pilgrims, families travelling together, and groups departing on our set dates. We also serve travellers flying from Nairobi for work, study or family, and customers sending cargo abroad.',
      'Our brochures, our office and our guides work in English, Arabic and Somali, because that is how our customers prefer to be spoken to.',
    ],
    status: 'confirmed',
  },
  {
    key: 'difference',
    eyebrow: 'What makes us different',
    heading: 'What we do that others do not',
    body: [
      'Interview slot. Ask: what does the agency do that a traveller would not get from the agency next door? One specific habit — something they always do, or never do — is worth more than any superlative.',
    ],
    status: 'awaiting-client',
  },
];

export function getAboutSection(key: AboutSection['key']): AboutSection | undefined {
  return aboutSections.find((section) => section.key === key);
}

/* -------------------------------------------------------------------------
   VALUES
   The agency's own promises, printed across their brochures and signage.
   ------------------------------------------------------------------------- */

export const values: ValuePoint[] = [
  {
    title: 'Safe journey, peace of mind',
    body: 'The line printed on everything we produce, and the standard we hold ourselves to. Arrangements confirmed before you travel, so there is nothing left to worry about at the airport.',
    status: 'confirmed',
  },
  {
    title: 'Your journey, your worship, your comfort',
    body: 'Safarkaaga, cibaadadaada, raaxadaada. The logistics are our concern so that the pilgrimage can be yours.',
    status: 'confirmed',
  },
  {
    title: 'Excellent service, from heart to heart',
    body: 'Adeeg fiican oo qalbiga ka yimaada. We would rather have one traveller who comes back to us than a hundred who do not.',
    status: 'confirmed',
  },
];
