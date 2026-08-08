import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { isPending, showPlaceholderMarkers } from '@/content';
import type { ContentRecord } from '@/content';

/* =========================================================================
   PLACEHOLDER MARKERS
   -------------------------------------------------------------------------
   These exist so that nobody — not us, not the client, not a stakeholder
   glancing at a screenshot — can mistake a structural placeholder for
   confirmed business information.

   They render only in draft mode. In live mode the records they mark have
   already been filtered out of the page entirely, so these components have
   nothing left to label and disappear with them.
   ========================================================================= */

interface PendingChipProps {
  children?: ReactNode;
  onDark?: boolean;
  className?: string;
}

export function PendingChip({
  children = 'Awaiting client content',
  onDark = false,
  className,
}: PendingChipProps) {
  if (!showPlaceholderMarkers) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1',
        'font-sans text-[0.6875rem] leading-none font-medium tracking-[0.08em] uppercase',
        onDark
          ? 'border-aegean-300/40 bg-aegean-300/10 text-aegean-200'
          : 'border-aegean-500/30 bg-aegean-500/[0.07] text-aegean-800',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

/** Renders the chip only when the given record is still a placeholder. */
export function PendingMark({
  record,
  onDark,
  label,
  className,
}: {
  record: Pick<ContentRecord, 'status'>;
  onDark?: boolean;
  label?: string;
  className?: string;
}) {
  if (!isPending(record)) return null;
  return (
    <PendingChip onDark={onDark} className={className}>
      {label}
    </PendingChip>
  );
}

/**
 * A note to the team, shown in place of a section that has no confirmed
 * content at all. Draft mode only — in production the section removes
 * itself instead.
 */
export function PendingSection({
  title,
  children,
  file,
}: {
  title: string;
  children: ReactNode;
  file: string;
}) {
  if (!showPlaceholderMarkers) return null;
  return (
    <div className="rounded-[3px] border border-dashed border-aegean-500/40 bg-aegean-500/[0.04] p-6 sm:p-8">
      <PendingChip>{title}</PendingChip>
      <p className="mt-4 max-w-prose text-small text-ink-700">{children}</p>
      <p className="mt-3 font-mono text-[0.75rem] text-ink-500">{file}</p>
    </div>
  );
}
