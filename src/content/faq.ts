import type { FaqItem } from './types';

/* =========================================================================
   FREQUENTLY ASKED QUESTIONS
   -------------------------------------------------------------------------
   Split deliberately into two kinds:

   CONFIRMED — every answer below marked 'confirmed' is drawn directly from
   the agency's flyers: the package prices, the departure dates, what each
   package includes and excludes, the office address, the contact numbers
   and the languages the guides speak. These are safe to publish and they
   feed FAQPage structured data, so they can appear directly in Google.

   AWAITING — payment terms, deposits, cancellation, refunds and how far
   ahead to book are NOT on any flyer. They are exactly the questions that
   turn into disputes, so nothing has been written for them. They render as
   marked placeholders in draft mode and are stripped in live mode until
   the agency gives us their real policy in their own words.
   ========================================================================= */

export const faqItems: FaqItem[] = [
  /* ---- Getting started ------------------------------------------------- */
  {
    category: 'Getting started',
    question: 'How do I start planning a journey with you?',
    answer:
      'Call or message the office on WhatsApp on +254 714 019 953, or call +254 708 365 414. Tell us where you are going and when, and how many of you are travelling. You can also visit the office at Jam Street, Hodo Souk, second floor, shop S26.',
    status: 'confirmed',
  },
  {
    category: 'Getting started',
    question: 'Where is your office?',
    answer:
      'Jam Street, Hodo Souk, second floor, shop S26. You are welcome to come in and speak to us directly.',
    status: 'confirmed',
  },
  {
    category: 'Getting started',
    question: 'What services do you offer?',
    answer:
      'Hajj and Umrah journeys, domestic and international air ticketing, cargo, hotel booking and visa services. If what you need is not listed, ask — we will tell you honestly whether we can help.',
    status: 'confirmed',
  },
  {
    category: 'Getting started',
    question: 'How far in advance should I book?',
    answer:
      'Answer slot — the agency’s own guidance on how early to book for Umrah, for Hajj and for ordinary flights.',
    status: 'awaiting-client',
  },

  /* ---- Umrah and Hajj -------------------------------------------------- */
  {
    category: 'Umrah and Hajj',
    question: 'What does the Umrah package cost?',
    answer:
      'Our Normal Umrah package is USD 1,250 per person and our VIP package is USD 2,200 per person, both departing 9 August 2026 and returning 19 August 2026. A separate ten-day Full package runs 17–27 August 2026 at USD 1,250 per person.',
    status: 'confirmed',
  },
  {
    category: 'Umrah and Hajj',
    question: 'What is included in the Normal package?',
    answer:
      'Umrah visa processing, your return air ticket and hotel accommodation. It does not include the train ticket, meals or food, or any personal expenses.',
    status: 'confirmed',
  },
  {
    category: 'Umrah and Hajj',
    question: 'What is the difference between the Normal and VIP packages?',
    answer:
      'The VIP package adds airport transfers, ground transportation, ziyarah tours, professional guides, Kudar breakfast and a Haramain high-speed train ticket on top of the visa processing, return air ticket and hotel accommodation in the Normal package.',
    status: 'confirmed',
  },
  {
    category: 'Umrah and Hajj',
    question: 'Will there be a guide, and what languages do they speak?',
    answer:
      'Yes. Our guides are experienced and speak English, Arabic and other languages.',
    status: 'confirmed',
  },
  {
    category: 'Umrah and Hajj',
    question: 'Will the hotel be close to the Haram?',
    answer:
      'Yes — we book comfortable accommodation near the Haram so that the walk to prayer is short.',
    status: 'confirmed',
  },

  /* ---- Visas ----------------------------------------------------------- */
  {
    category: 'Visas',
    question: 'Do you handle the Umrah visa?',
    answer:
      'Yes. Umrah visa processing is included in all of our Umrah packages, and we assist with visa applications for other destinations as well.',
    status: 'confirmed',
  },
  {
    category: 'Visas',
    question: 'Can you guarantee my visa will be approved?',
    answer:
      'No, and you should treat anyone who says otherwise with caution. We prepare and submit your application properly and completely so that it is not delayed by an avoidable error, but the decision always rests with the issuing authority.',
    status: 'confirmed',
  },
  {
    category: 'Visas',
    question: 'Which documents do you need from me?',
    answer:
      'Answer slot — the agency’s own list of documents required for an Umrah visa, and for other visa applications.',
    status: 'awaiting-client',
  },

  /* ---- Payment and changes --------------------------------------------- */
  {
    category: 'Payment and changes',
    question: 'How do I pay, and when?',
    answer:
      'Answer slot — the payment methods the agency accepts, whether a deposit is required, and when the balance is due.',
    status: 'awaiting-client',
  },
  {
    category: 'Payment and changes',
    question: 'Can I change or cancel a booking?',
    answer:
      'Answer slot — the agency’s own change and cancellation policy, including any refund terms, in its own words.',
    status: 'awaiting-client',
  },

  /* ---- Flights and cargo ----------------------------------------------- */
  {
    category: 'Flights and cargo',
    question: 'Where do you fly to?',
    answer:
      'From Nairobi we ticket to Saudi Arabia, the UAE (Dubai), Qatar, India, Malaysia, Türkiye, France, Germany, Canada, the USA, Australia, Ethiopia, Somalia, Uganda, Tanzania and South Africa. We also book domestic flights.',
    status: 'confirmed',
  },
  {
    category: 'Flights and cargo',
    question: 'Do you handle cargo as well as travel?',
    answer:
      'Yes. Contact the office with the destination, the contents and the approximate weight, and we will tell you the options and the cost before anything is sent.',
    status: 'confirmed',
  },

  /* ---- While you travel ------------------------------------------------ */
  {
    category: 'While you travel',
    question: 'Can I reach you while I am travelling?',
    answer:
      'Yes. We offer support around the clock — reach us on the phone or on WhatsApp on +254 714 019 953 while you are away, not only while you are booking.',
    status: 'confirmed',
  },
];

/** Groups the FAQ into the order the categories first appear. */
export function groupFaqByCategory(items: readonly FaqItem[]): {
  category: string;
  items: FaqItem[];
}[] {
  const groups: { category: string; items: FaqItem[] }[] = [];
  for (const item of items) {
    const existing = groups.find((group) => group.category === item.category);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ category: item.category, items: [item] });
    }
  }
  return groups;
}
