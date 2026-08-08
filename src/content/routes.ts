import type { ContentRecord } from './types';

/* =========================================================================
   FLIGHT ROUTES
   -------------------------------------------------------------------------
   The international destinations the agency tickets from Nairobi,
   transcribed exactly from the list printed on their brochure — in the
   same order, with no additions.

   Why these are not /destinations pages: this is a list of places the
   agency can sell you a ticket to, not places it runs trips to. Turning
   sixteen countries into sixteen pages would mean writing sixteen
   descriptions nobody has given us, for pages no one would read. As a
   single confirmed list it is genuinely useful, and it is honest.

   The brochure prints each destination in English and Somali. Both are
   kept, because their customers read both.
   ========================================================================= */

export interface FlightRoute extends ContentRecord {
  /** As printed in the English column of the brochure. */
  name: string;
  /** As printed in the Somali column. */
  nameSomali: string;
}

export const departureCity = 'Nairobi';

export const flightRoutes: FlightRoute[] = [
  { name: 'Saudi Arabia', nameSomali: 'Sacuudiga', status: 'confirmed' },
  { name: 'UAE (Dubai)', nameSomali: 'Isutagga Imaaraadka (Dubai)', status: 'confirmed' },
  { name: 'Qatar', nameSomali: 'Qadar', status: 'confirmed' },
  { name: 'India', nameSomali: 'Hindiya', status: 'confirmed' },
  { name: 'Malaysia', nameSomali: 'Malaysia', status: 'confirmed' },
  { name: 'Türkiye', nameSomali: 'Turkiga', status: 'confirmed' },
  { name: 'France', nameSomali: 'Faransiiska', status: 'confirmed' },
  { name: 'Germany', nameSomali: 'Jarmalka', status: 'confirmed' },
  { name: 'Canada', nameSomali: 'Kanada', status: 'confirmed' },
  { name: 'USA', nameSomali: 'Maraykanka', status: 'confirmed' },
  { name: 'Australia', nameSomali: 'Australia', status: 'confirmed' },
  { name: 'Ethiopia', nameSomali: 'Itoobiya', status: 'confirmed' },
  { name: 'Somalia', nameSomali: 'Soomaaliya', status: 'confirmed' },
  { name: 'Uganda', nameSomali: 'Uganda', status: 'confirmed' },
  { name: 'Tanzania', nameSomali: 'Tanzania', status: 'confirmed' },
  { name: 'South Africa', nameSomali: 'Koonfur Afrika', status: 'confirmed' },
];
