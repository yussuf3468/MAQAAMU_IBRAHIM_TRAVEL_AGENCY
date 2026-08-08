import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  activeEnquiryFields,
  destinationOptions,
  enquiryCopy,
  isDraftMode,
  isModuleEnabled,
  resolved,
  serviceOptions,
} from '@/content';
import type { EnquiryFieldConfig, EnquiryFieldName } from '@/content';
import {
  resolveDeliveryMethod,
  submitEnquiry,
  todayIso,
  validateEnquiry,
} from '@/lib/enquiry';
import type { EnquiryValues } from '@/lib/enquiry';
import { Button } from '@/components/ui/Button';
import { SelectField, TextAreaField, TextField } from '@/components/ui/Field';
import { PendingChip } from '@/components/ui/Pending';

/* =========================================================================
   ENQUIRY FORM
   -------------------------------------------------------------------------
   Renders itself from src/content/enquiry.ts — the field list, their
   labels, which are required and which are switched off all come from
   there, so the client's answer tonight ("we don't need dates up front")
   is a one-line change, not a rewrite.

   Behaviour worth knowing:
     • Validation runs on submit, then live per-field once a field has been
       touched. Validating as someone types their first character tells
       them they are wrong before they have finished being right.
     • Errors move focus to the first invalid field and announce a summary,
       so a keyboard or screen-reader user is not left guessing.
     • Where no endpoint is configured, the enquiry is composed into a
       WhatsApp or email message. The traveller sees it before it sends.
     • If nothing is configured at all — today, because no channel is
       confirmed — the form says so plainly in draft mode instead of
       pretending to submit.
   ========================================================================= */

type Errors = Partial<Record<EnquiryFieldName, string>>;

export function EnquiryForm({ className }: { className?: string }) {
  const fields = useMemo(() => {
    const active = activeEnquiryFields();
    // Drop selects that have nothing to choose from, so the traveller is
    // never shown an empty dropdown.
    return active.filter((field) => {
      if (field.name === 'service') return resolved.services.length > 0;
      if (field.name === 'destination') {
        return isModuleEnabled('destinations') && resolved.destinations.length > 0;
      }
      return true;
    });
  }, []);

  const services = useMemo(() => serviceOptions(resolved.services), []);
  const destinations = useMemo(() => destinationOptions(resolved.destinations), []);

  const [values, setValues] = useState<EnquiryValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryFieldName, boolean>>>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [failureMessage, setFailureMessage] = useState<string | null>(null);

  const method = resolveDeliveryMethod();
  const unavailable = method === 'unavailable';

  const setValue = (name: EnquiryFieldName, value: string) => {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (touched[name]) setErrors(validateEnquiry(next, fields));
      return next;
    });
  };

  const markTouched = (name: EnquiryFieldName) => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validateEnquiry(values, fields));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateEnquiry(values, fields);
    setErrors(found);
    setTouched(Object.fromEntries(fields.map((field) => [field.name, true])));

    const firstError = Object.keys(found)[0];
    if (firstError) {
      const node = event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`);
      node?.focus();
      node?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (unavailable) {
      setState('error');
      setFailureMessage(
        isDraftMode
          ? enquiryCopy.unconfiguredNotice
          : enquiryCopy.errorBody,
      );
      return;
    }

    setState('submitting');
    setFailureMessage(null);

    const labels: Partial<Record<EnquiryFieldName, string>> = {};
    if (values.service) {
      labels.service = services.find((o) => o.value === values.service)?.label ?? values.service;
    }
    if (values.destination) {
      labels.destination =
        destinations.find((o) => o.value === values.destination)?.label ?? values.destination;
    }

    const result = await submitEnquiry(values, fields, labels);

    if (result.ok) {
      setState('success');
      if (!result.handedOff) setValues({});
    } else {
      setState('error');
      setFailureMessage(result.error ?? enquiryCopy.errorBody);
    }
  };

  if (state === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'flex flex-col items-start gap-4 border border-line bg-surface-raised p-8 sm:p-10',
          className,
        )}
      >
        <span className="grid size-11 place-items-center rounded-full border border-aegean-500/30 bg-aegean-500/[0.08] text-aegean-700">
          <CheckCircle2 className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="font-display-tight text-display-sm text-ink-900">
          {enquiryCopy.successHeading}
        </h3>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-700">
          {enquiryCopy.successBody}
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-2"
          onClick={() => {
            setState('idle');
            setValues({});
            setTouched({});
            setErrors({});
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-7', className)}
      aria-describedby={state === 'error' ? 'enquiry-error' : undefined}
    >
      {isDraftMode && unavailable && (
        <div className="flex flex-col gap-2 border border-dashed border-aegean-500/40 bg-aegean-500/[0.04] p-5">
          <PendingChip>Enquiry delivery not connected</PendingChip>
          <p className="text-small leading-relaxed text-ink-700">
            {enquiryCopy.unconfiguredNotice}
          </p>
        </div>
      )}

      <p className="text-[0.875rem] text-ink-600">{enquiryCopy.requiredNote}</p>

      {/* `items-start` matters: without it a field carrying help text
          stretches its neighbour to match, and the row stops looking like
          a row. */}
      <div className="grid items-start gap-x-6 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={values[field.name] ?? ''}
            error={touched[field.name] ? errors[field.name] : undefined}
            onChange={(value) => setValue(field.name, value)}
            onBlur={() => markTouched(field.name)}
            serviceOptions={services}
            destinationOptions={destinations}
          />
        ))}
      </div>

      {state === 'error' && (
        <p
          id="enquiry-error"
          role="alert"
          className="border-l-2 border-danger-line bg-danger-line/[0.08] px-4 py-3 text-[0.875rem] leading-relaxed text-ink-700"
        >
          <span className="font-medium">{enquiryCopy.errorHeading}</span>{' '}
          {failureMessage ?? enquiryCopy.errorBody}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-ink-600">
          {enquiryCopy.privacyNote}
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={state === 'submitting'}
          className="w-full sm:w-auto"
          leading={
            state === 'submitting' ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
            )
          }
        >
          {method === 'whatsapp' ? enquiryCopy.submitLabelWhatsApp : enquiryCopy.submitLabel}
        </Button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------------- */

interface FieldRendererProps {
  field: EnquiryFieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  serviceOptions: { value: string; label: string }[];
  destinationOptions: { value: string; label: string }[];
}

function FieldRenderer({
  field,
  value,
  error,
  onChange,
  onBlur,
  serviceOptions: services,
  destinationOptions: destinations,
}: FieldRendererProps) {
  const shared = {
    label: field.label,
    name: field.name,
    required: field.required,
    error,
    helpText: field.helpText,
    value,
    onBlur,
  };

  // The column span comes from the field config, so the layout is decided
  // in content/enquiry.ts alongside the field order rather than here.
  const span = cn((field.span ?? 'half') === 'full' && 'sm:col-span-2');

  if (field.type === 'textarea') {
    return (
      <TextAreaField
        {...shared}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={span}
      />
    );
  }

  if (field.type === 'select') {
    const options = field.name === 'service' ? services : destinations;
    return (
      <SelectField
        {...shared}
        options={options}
        onChange={(event) => onChange(event.target.value)}
        className={span}
      />
    );
  }

  return (
    <TextField
      {...shared}
      type={field.type}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      min={field.type === 'date' ? todayIso() : field.type === 'number' ? 1 : undefined}
      inputMode={field.type === 'number' ? 'numeric' : undefined}
      onChange={(event) => onChange(event.target.value)}
      className={span}
    />
  );
}
