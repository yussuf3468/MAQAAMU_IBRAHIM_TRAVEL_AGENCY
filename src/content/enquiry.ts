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

/* The order below IS the layout. Fields are paired so each row holds two
   related things — name with phone, the two dates together — and only the
   fields that need the full measure take it. Reordering this array
   reorders the form. */
export const enquiryFields: EnquiryFieldConfig[] = [
  {
    name: 'name',
    label: 'Full name',
    type: 'text',
    required: true,
    placeholder: 'As it appears on your passport',
    autoComplete: 'name',
    span: 'half',
    enabled: true,
  },
  {
    name: 'phone',
    label: 'Phone or WhatsApp',
    type: 'tel',
    required: true,
    placeholder: 'Include your country code',
    autoComplete: 'tel',
    span: 'half',
    enabled: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: false,
    placeholder: 'name@example.com',
    autoComplete: 'email',
    span: 'half',
    enabled: true,
  },
  {
    name: 'travellers',
    label: 'Number of travellers',
    type: 'number',
    required: false,
    placeholder: '1',
    span: 'half',
    enabled: true,
  },
  {
    name: 'service',
    label: 'What can we help with?',
    type: 'select',
    required: false,
    span: 'half',
    enabled: true,
  },
  {
    name: 'destination',
    label: 'Where are you going?',
    type: 'select',
    required: false,
    helpText: 'Or tell us in your message below.',
    span: 'half',
    enabled: true,
  },
  {
    name: 'departureDate',
    label: 'Departure date',
    type: 'date',
    required: false,
    span: 'half',
    enabled: true,
  },
  {
    name: 'returnDate',
    label: 'Return date',
    type: 'date',
    required: false,
    span: 'half',
    enabled: true,
  },
  {
    name: 'message',
    label: 'Tell us about your trip',
    type: 'textarea',
    required: false,
    placeholder:
      'Anything that helps us prepare — who is travelling, what matters most, questions you already have.',
    span: 'full',
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
  /** Sits above the fields, so nobody scans the form for asterisks. */
  requiredNote: 'Only your name and a phone number are required.',
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
  /* Real wording, not a placeholder — it states only what is actually true
     of this form: the details go to the agency so they can reply, and
     nowhere else. If the client later adopts a formal privacy policy,
     replace this with theirs and link to it. */
  privacyNote:
    'Your details go to MAQAAMU IBRAHIM TRAVEL AGENCY so we can answer your enquiry. We do not share them with anyone else.',
} as const;
