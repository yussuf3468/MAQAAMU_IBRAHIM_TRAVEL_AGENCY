import type { ContentRecord, ContentStatus } from './types';

/* =========================================================================
   CONTENT MODE
   -------------------------------------------------------------------------
   'draft' — the pre-launch state. Placeholder records render, each marked
             with a visible chip so the client and the team can review the
             layout and see exactly which slots still need real information.

   'live'  — THE DEFAULT, and the production state. Every record whose
             status is 'awaiting-client' is stripped before it reaches a
             component. Sections with nothing left to show remove
             themselves, and the routes that depend on them disappear from
             the navigation.

   Live is the default because the agency's real information is in place:
   six services, three Umrah departures with published prices, two
   destinations, the flight routes, the contact details and the address.
   The site is publishable as it stands, and the handful of answers still
   outstanding simply do not render until they arrive.

   Set VITE_CONTENT_MODE=draft to review the outstanding slots — that mode
   paints a marker on every placeholder and blocks search indexing.
   ========================================================================= */

export type ContentMode = 'draft' | 'live';

const rawMode = import.meta.env.VITE_CONTENT_MODE;

export const CONTENT_MODE: ContentMode = rawMode === 'draft' ? 'draft' : 'live';

export const isDraftMode = CONTENT_MODE === 'draft';

/** True when placeholder markers should be painted on screen. */
export const showPlaceholderMarkers = isDraftMode;

/**
 * Filters a collection down to what may legitimately be shown to the public.
 * In draft mode nothing is removed; in live mode only confirmed records
 * survive.
 */
export function publishable<T extends ContentRecord>(items: readonly T[]): T[] {
  if (isDraftMode) return [...items];
  return items.filter((item) => item.status === 'confirmed');
}

/** Same rule, for a single optional record. */
export function publishableOne<T extends ContentRecord>(item: T | null | undefined): T | null {
  if (!item) return null;
  if (isDraftMode) return item;
  return item.status === 'confirmed' ? item : null;
}

/** Guards a scalar value that carries its own status. */
export function publishableValue<T>(
  field: { value: T; status: ContentStatus },
  fallback: T,
): T {
  if (isDraftMode) return field.value;
  return field.status === 'confirmed' ? field.value : fallback;
}

/** True when at least one record in the collection can be shown. */
export function hasPublishable<T extends ContentRecord>(items: readonly T[]): boolean {
  return publishable(items).length > 0;
}

export function isPending(record: Pick<ContentRecord, 'status'>): boolean {
  return record.status === 'awaiting-client';
}
