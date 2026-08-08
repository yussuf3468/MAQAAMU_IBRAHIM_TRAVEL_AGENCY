import { useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

/* =========================================================================
   FORM FIELDS
   -------------------------------------------------------------------------
   Every field is built from the same shell so that labels, help text,
   errors and required markers behave identically across the site.

   Accessibility contract, enforced here rather than at each call site:
     • the label is always a real <label> bound by htmlFor
     • help text and error text are joined into aria-describedby
     • an invalid field gets aria-invalid, and the error is announced
       politely rather than interrupting
     • required is expressed to assistive tech AND shown visually — an
       asterisk alone is not enough
     • controls are 48px tall, which is a comfortable thumb target

   Placeholders are never used as labels.
   ========================================================================= */

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  helpId: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({
  label,
  htmlFor,
  required,
  helpText,
  error,
  helpId,
  errorId,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Only REQUIRED fields are marked, and with a single character.
          Labelling every optional field "OPTIONAL" put a shouting caps tag
          beside almost every input and made the form look like a tax
          return. The form's intro line says what is required instead. */}
      <label
        htmlFor={htmlFor}
        className="font-sans text-[0.8125rem] font-medium tracking-[0.02em] text-ink-700"
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-1 text-aegean-600">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {children}

      {helpText && !error && (
        <p id={helpId} className="text-[0.8125rem] leading-relaxed text-ink-600">
          {helpText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-[0.8125rem] leading-relaxed text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const controlClasses = (hasError: boolean) =>
  cn(
    'w-full rounded-[2px] border bg-white px-4 text-[0.9375rem] text-ink-900',
    'placeholder:text-ink-300',
    'transition-[border-color,box-shadow] duration-200',
    'focus:outline-none focus-visible:border-aegean-500 focus-visible:ring-2 focus-visible:ring-aegean-500/25',
    hasError ? 'border-danger-line' : 'border-line-strong hover:border-ink-300',
  );

/* ------------------------------------------------------------------------- */

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
  label: string;
  helpText?: string;
  error?: string;
  className?: string;
}

export function TextField({ label, helpText, error, className, ...rest }: TextFieldProps) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = [helpText && !error ? helpId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      required={rest.required}
      helpText={helpText}
      error={error}
      helpId={helpId}
      errorId={errorId}
      className={className}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(controlClasses(Boolean(error)), 'h-12')}
        {...rest}
      />
    </FieldShell>
  );
}

/* ------------------------------------------------------------------------- */

interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'> {
  label: string;
  helpText?: string;
  error?: string;
  className?: string;
}

export function TextAreaField({
  label,
  helpText,
  error,
  className,
  rows = 5,
  ...rest
}: TextAreaFieldProps) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = [helpText && !error ? helpId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      required={rest.required}
      helpText={helpText}
      error={error}
      helpId={helpId}
      errorId={errorId}
      className={className}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(controlClasses(Boolean(error)), 'resize-y py-3.5 leading-relaxed')}
        {...rest}
      />
    </FieldShell>
  );
}

/* ------------------------------------------------------------------------- */

interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'> {
  label: string;
  helpText?: string;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
  placeholderOption?: string;
}

export function SelectField({
  label,
  helpText,
  error,
  className,
  options,
  placeholderOption = 'Please choose',
  ...rest
}: SelectFieldProps) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = [helpText && !error ? helpId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldShell
      label={label}
      htmlFor={id}
      required={rest.required}
      helpText={helpText}
      error={error}
      helpId={helpId}
      errorId={errorId}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            controlClasses(Boolean(error)),
            'h-12 cursor-pointer appearance-none pr-11',
            !rest.value && 'text-ink-500',
          )}
          {...rest}
        >
          <option value="">{placeholderOption}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-ink-900">
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path
              d="M1 1.5 6 6.5l5-5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </FieldShell>
  );
}
