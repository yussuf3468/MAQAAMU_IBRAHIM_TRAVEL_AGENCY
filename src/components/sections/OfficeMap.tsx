import { ArrowUpRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';
import { copy, resolved } from '@/content';
import { Button } from '@/components/ui/Button';

/* =========================================================================
   OFFICE ADDRESS AND MAP
   -------------------------------------------------------------------------
   Two exported pieces, because they belong in different places on the page:

     <OfficeAddress />  the address in writing, plus the directions line and
                        the "open in Google Maps" button. Sits in a column
                        beside the opening hours.

     <OfficeMapEmbed /> the interactive map, rendered full width beneath —
                        a map squeezed into half a column is unusable on a
                        phone, and this is the element people pinch, drag
                        and zoom.

   The map is a live Google embed rather than a click-to-load placeholder:
   someone on this page is trying to find the office, and making them press
   a button first is friction for no benefit. `loading="lazy"` keeps it off
   the critical path so the page still loads fast.

   The address is always readable as text — never only on the map — because
   it has to be copyable, and read aloud to a taxi driver.
   ========================================================================= */

function addressLines() {
  const address = resolved.address;
  if (!address || address.status !== 'confirmed') return null;

  const lines = [
    address.streetAddress,
    [address.region, address.locality].filter(Boolean).join(', ') || null,
    address.postalCode,
    address.country,
  ].filter((line): line is string => Boolean(line));

  return lines.length > 0 ? { address, lines } : null;
}

export function OfficeAddress({ className }: { className?: string }) {
  const data = addressLines();
  if (!data) return null;
  const { address, lines } = data;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <address className="flex items-start gap-3 text-lead leading-relaxed text-ink-700 not-italic">
        <MapPin
          className="mt-1.5 size-5 shrink-0 text-aegean-600"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span>
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          {address.directions && (
            <span className="mt-2 block text-[0.9375rem] text-ink-600">{address.directions}</span>
          )}
        </span>
      </address>

      {address.mapUrl && (
        <Button
          href={address.mapUrl}
          variant="secondary"
          size="md"
          className="w-full sm:w-fit"
          leading={<MapPin className="size-4" strokeWidth={1.5} />}
          trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
        >
          {copy.contact.mapCta}
        </Button>
      )}
    </div>
  );
}

export function OfficeMapEmbed({ className }: { className?: string }) {
  const address = resolved.address;
  if (!address || address.status !== 'confirmed' || !address.mapEmbedUrl) return null;

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[3px] border border-line bg-porcelain-200',
        // Taller on phones so the streets around the office are legible,
        // wider on desktop where there is room for context.
        'h-[22rem] sm:h-[26rem] lg:h-[30rem]',
        className,
      )}
    >
      <iframe
        title="Map showing the location of the MAQAAMU IBRAHIM TRAVEL AGENCY office on Jam Street, Hodo Souk, Eastleigh, Nairobi"
        src={address.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
