import type { EnquiryFieldConfig } from './types';

/* =========================================================================
   ENQUIRY FORM
   -------------------------------------------------------------------------
   CONFIRM AT THE CLIENT MEETING.

   This is an enquiry, not a booking engine. Nothing is charged, no
   inventory is held and no availability is claimed — the form's job is to
   get a well-formed message to the agency and to make the traveller feel
   they have been taken seriously.

   TO ADJUST: flip `enabled` on any field. The form, its validation, its
   layout and the composed WhatsApp/email message all follow automatically.
   Ask the client which of these they actually need before someone can be
   quoted — every field removed raises completion.

   If the agency later wants real-time booking, this file is where that
   conversation starts. Do not build it speculatively.
   ========================================================================= */

export const enquiryFields: EnquiryFieldConfig[] = [
  {
    name: 'name',
    label: 'Full name',
    type: 'text',
    required: true,
    placeholder: 'As it appears on your passport',
    autoComplete: 'name',
    enabled: true,
  },
  {
    name: 'phone',
    label: 'Phone or WhatsApp',
    type: 'tel',
    required: true,
    placeholder: 'Include your country code',
    autoComplete: 'tel',
    enabled: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: false,
    placeholder: 'Optional',
    autoComplete: 'email',
    enabled: true,
  },
  {
    name: 'service',
    label: 'What can we help with?',
    type: 'select',
    required: false,
    enabled: true,
  },
  {
    name: 'destination',
    label: 'Where are you going?',
    type: 'select',
    required: false,
    helpText: 'Choose a destination, or tell us in your message.',
    enabled: true,
  },
  {
    name: 'departureDate',
    label: 'Departure',
    type: 'date',
    required: false,
    enabled: true,
  },
  {
    name: 'returnDate',
    label: 'Return',
    type: 'date',
    required: false,
    enabled: true,
  },
  {
    name: 'travellers',
    label: 'Travellers',
    type: 'number',
    required: false,
    placeholder: '1',
    enabled: true,
  },
  {
    name: 'message',
    label: 'Tell us about your trip',
    type: 'textarea',
    required: false,
    placeholder:
      'Anything that helps us prepare — who is travelling, what matters most, questions you already have.',
    enabled: true,
  },
];

export function activeEnquiryFields(): EnquiryFieldConfig[] {
  return enquiryFields.filter((field) => field.enabled);
}

/* -------------------------------------------------------------------------
   FORM COPY
   ------------------------------------------------------------------------- */

export const enquiryCopy = {
  eyebrow: 'Plan your journey',
  heading: 'Tell us where you are going',
  intro:
    'Share as much or as little as you like. A travel consultant will read it personally and come back to you.',
  submitLabel: 'Send enquiry',
  submitLabelWhatsApp: 'Send via WhatsApp',
  /** Shown after a successful submit. Promises no response time — the
   *  client has not given one. Replace once they do. */
  successHeading: 'Thank you — your enquiry is on its way.',
  successBody:
    'We have your details. A member of the team will be in touch to continue the conversation.',
  errorHeading: 'That did not send.',
  errorBody: 'Please try again, or reach us directly using the details below.',
  /** Shown in draft mode while no contact channel is confirmed. */
  unconfiguredNotice:
    'Enquiry delivery is not connected yet. Add a confirmed WhatsApp or email channel in src/content/contact.ts, or set VITE_ENQUIRY_ENDPOINT.',
  privacyNote:
    'Your details are used only to answer your enquiry. Replace this line with the agency’s own privacy wording.',
} as const;
