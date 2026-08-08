import { company } from '../content/company';
import { enquiryDelivery } from '../content/contact';
import { findLiveChannel } from '../content';
import type { EnquiryFieldConfig, EnquiryFieldName } from '../content/types';

/* =========================================================================
   ENQUIRY DELIVERY
   -------------------------------------------------------------------------
   Three routes out, chosen in order:

   1. VITE_ENQUIRY_ENDPOINT is set → POST the enquiry as JSON. Works with
      Formspree, Web3Forms, a Netlify function, or anything that accepts a
      JSON body.
   2. A confirmed WhatsApp channel exists → hand the composed enquiry to
      WhatsApp. The traveller sees the message before it sends, which is
      why this is the default: nothing is sent behind their back.
   3. A confirmed email channel exists → open a prefilled mail draft.

   If none is available (today, because no channel is confirmed yet) the
   form says so honestly in draft mode instead of pretending to submit.
   ========================================================================= */

export type EnquiryValues = Partial<Record<EnquiryFieldName, string>>;

export type DeliveryMethod = 'endpoint' | 'whatsapp' | 'email' | 'unavailable';

export function resolveDeliveryMethod(): DeliveryMethod {
  if (enquiryDelivery.endpoint) return 'endpoint';
  if (enquiryDelivery.fallback === 'whatsapp' && findLiveChannel('whatsapp')) return 'whatsapp';
  if (findLiveChannel('email')) return 'email';
  if (findLiveChannel('whatsapp')) return 'whatsapp';
  return 'unavailable';
}

function labelFor(fields: readonly EnquiryFieldConfig[], name: EnquiryFieldName): string {
  return fields.find((field) => field.name === name)?.label ?? name;
}

/** Human-readable enquiry, used for both WhatsApp and email bodies. */
export function composeMessage(
  values: EnquiryValues,
  fields: readonly EnquiryFieldConfig[],
  optionLabels: Partial<Record<EnquiryFieldName, string>> = {},
): string {
  const lines: string[] = ['Travel enquiry', ''];

  for (const field of fields) {
    const raw = values[field.name];
    if (!raw || raw.trim() === '') continue;
    const display = optionLabels[field.name] ?? raw;
    lines.push(`${labelFor(fields, field.name)}: ${display}`);
  }

  lines.push('', `Sent from ${company.siteUrl}`);
  return lines.join('\n');
}

export interface SubmitResult {
  ok: boolean;
  method: DeliveryMethod;
  /** Set when the browser was handed off to WhatsApp or a mail client. */
  handedOff?: boolean;
  error?: string;
}

export async function submitEnquiry(
  values: EnquiryValues,
  fields: readonly EnquiryFieldConfig[],
  optionLabels: Partial<Record<EnquiryFieldName, string>> = {},
): Promise<SubmitResult> {
  const method = resolveDeliveryMethod();
  const message = composeMessage(values, fields, optionLabels);

  if (method === 'endpoint' && enquiryDelivery.endpoint) {
    try {
      const response = await fetch(enquiryDelivery.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          _subject: `Travel enquiry — ${values.name ?? 'website'}`,
          message,
        }),
      });
      if (!response.ok) {
        return { ok: false, method, error: `Request failed (${response.status})` };
      }
      return { ok: true, method };
    } catch (error) {
      return {
        ok: false,
        method,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  if (method === 'whatsapp') {
    const channel = findLiveChannel('whatsapp');
    if (!channel?.href) return { ok: false, method: 'unavailable' };
    const base = channel.href.split('?')[0] ?? channel.href;
    window.open(`${base}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    return { ok: true, method, handedOff: true };
  }

  if (method === 'email') {
    const channel = findLiveChannel('email');
    if (!channel?.href) return { ok: false, method: 'unavailable' };
    const subject = encodeURIComponent(`Travel enquiry — ${values.name ?? 'website'}`);
    const body = encodeURIComponent(message);
    window.location.href = `${channel.href}?subject=${subject}&body=${body}`;
    return { ok: true, method, handedOff: true };
  }

  return { ok: false, method: 'unavailable' };
}

/* -------------------------------------------------------------------------
   VALIDATION
   Deliberately forgiving. The purpose is to catch a genuine mistake, not
   to reject a traveller whose phone number is formatted unusually.
   ------------------------------------------------------------------------- */

export function validateEnquiry(
  values: EnquiryValues,
  fields: readonly EnquiryFieldConfig[],
): Partial<Record<EnquiryFieldName, string>> {
  const errors: Partial<Record<EnquiryFieldName, string>> = {};

  for (const field of fields) {
    const value = (values[field.name] ?? '').trim();

    if (field.required && value === '') {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }
    if (value === '') continue;

    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      errors[field.name] = 'Please check this email address.';
    }
    if (field.type === 'tel' && value.replace(/[^\d]/g, '').length < 7) {
      errors[field.name] = 'Please enter a full phone number, including country code.';
    }
    if (field.name === 'travellers' && Number(value) < 1) {
      errors[field.name] = 'There must be at least one traveller.';
    }
  }

  const departure = values.departureDate;
  const back = values.returnDate;
  if (departure && back && back < departure) {
    errors.returnDate = 'The return date is before the departure date.';
  }

  return errors;
}

/** Today in YYYY-MM-DD, used as the `min` on date inputs. */
export function todayIso(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}
