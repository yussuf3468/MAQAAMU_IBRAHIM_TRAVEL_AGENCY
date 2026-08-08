import type { Testimonial } from './types';

/* =========================================================================
   TESTIMONIALS
   -------------------------------------------------------------------------
   THIS ARRAY IS EMPTY ON PURPOSE.

   A fabricated testimonial attributes words to a person who never said
   them. It is the single most damaging thing that can be put on a client's
   website, and it is not worth a filled section. So: nothing here, and the
   component removes itself when there is nothing to show.

   TO ADD A REAL TESTIMONIAL:
     1. Get it in writing from the traveller, with permission to publish.
     2. Quote it as given — light punctuation fixes only, never a rewrite.
     3. `author` is the name the traveller agrees to be published under.
        Initials or a first name only are perfectly acceptable.
     4. `context` is optional, e.g. 'Travelled with family, 2025'.
     5. Set status: 'confirmed'.

   In draft mode a single marked skeleton renders so the section can be
   reviewed in layout. It is stripped in live mode and never ships.
   ========================================================================= */

export const testimonials: Testimonial[] = [];

/** Draft-only skeleton. Never published — see status.ts. */
export const testimonialPlaceholder: Testimonial = {
  quote:
    'A traveller’s own words go here, quoted exactly as they wrote them. Two or three sentences carry more weight than a paragraph.',
  author: 'Traveller name',
  context: 'Awaiting client confirmation',
  status: 'awaiting-client',
};
