import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { company } from '@/content';

/* =========================================================================
   WORDMARK
   -------------------------------------------------------------------------
   TEMPORARY VISUAL IDENTITY — REPLACE WHEN THE CLIENT SUPPLIES A LOGO.

   This is deliberately a typographic lockup and nothing more. No invented
   emblem, monogram or crest: a mark of that kind would look like an
   official logo, would end up screenshotted and circulated as one, and
   would pre-empt a decision that belongs to the client.

   The full trading name is always shown in full. It is set on two lines so
   that a long name reads as a considered lockup rather than an overflow
   problem — and so the name never has to be abbreviated to fit.

   TO SWAP IN THE REAL LOGO:
     drop the file in /public/brand/, replace the markup below with an
     <img>, keep the same accessible name, and keep the two size variants.
   ========================================================================= */

interface WordmarkProps {
  onDark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Renders a plain lockup rather than a link — used inside the footer. */
  asLink?: boolean;
  className?: string;
}

/* The lockup is the widest unbreakable thing on the page: two uppercase
   lines that cannot wrap. At 320px the large size measured 319px of
   min-content and forced the whole footer grid to overflow, so every size
   steps down on small screens and the wide letter-spacing on the second
   line tightens with it. */
/* The lockup is the widest unbreakable thing on the page — two uppercase
   lines that cannot wrap — so the letter-spacing on the second line
   tightens on small screens rather than the type shrinking away to
   nothing. The agency's name has to be readable at arm's length on a
   phone; that matters more here than a fashionably small header. */
const sizes = {
  sm: {
    primary: 'text-[0.8125rem] sm:text-[0.875rem]',
    secondary: 'text-[0.5625rem] tracking-[0.2em] sm:text-[0.625rem] sm:tracking-[0.3em]',
    gap: 'gap-[0.15rem]',
  },
  md: {
    primary: 'text-[1rem] sm:text-[1.0625rem]',
    secondary: 'text-[0.625rem] tracking-[0.18em] sm:text-[0.6875rem] sm:tracking-[0.3em]',
    gap: 'gap-[0.22rem]',
  },
  lg: {
    primary: 'text-[1.1875rem] sm:text-[1.375rem]',
    secondary: 'text-[0.75rem] tracking-[0.18em] sm:text-[0.8125rem] sm:tracking-[0.3em]',
    gap: 'gap-[0.3rem]',
  },
} as const;

function Lockup({ onDark, size = 'md' }: { onDark?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const scale = sizes[size];
  return (
    <span className={cn('flex flex-col leading-none', scale.gap)}>
      <span
        className={cn(
          'font-display-tight font-medium tracking-[0.08em] uppercase',
          scale.primary,
          onDark ? 'text-porcelain-50' : 'text-ink-950',
        )}
      >
        Maqaamu Ibrahim
      </span>
      <span
        className={cn(
          'font-sans font-medium uppercase',
          scale.secondary,
          onDark ? 'text-aegean-300' : 'text-aegean-700',
        )}
      >
        Travel Agency
      </span>
    </span>
  );
}

export function Wordmark({ onDark, size = 'md', asLink = true, className }: WordmarkProps) {
  if (!asLink) {
    return (
      <span className={cn('inline-flex', className)}>
        <span className="sr-only">{company.legalName}</span>
        <span aria-hidden="true">
          <Lockup onDark={onDark} size={size} />
        </span>
      </span>
    );
  }

  return (
    <Link
      to="/"
      className={cn(
        'inline-flex shrink-0 transition-opacity duration-200 hover:opacity-80',
        className,
      )}
    >
      {/* The visible lockup splits the name across two lines, so the
          accessible name is supplied once, in full, from the content layer. */}
      <span className="sr-only">{company.legalName} — home</span>
      <span aria-hidden="true">
        <Lockup onDark={onDark} size={size} />
      </span>
    </Link>
  );
}
