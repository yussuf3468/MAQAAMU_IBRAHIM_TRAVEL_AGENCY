import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';
import { copy, resolved } from '@/content';
import { Button } from '@/components/ui/Button';

/* =========================================================================
   OFFICE MAP
   -------------------------------------------------------------------------
   The address in writing AND on a map, because people use both: one to
   read out to a taxi driver, one to walk in with.

   PRIVACY AND PERFORMANCE — WHY IT DOES NOT LOAD IMMEDIATELY
   A Google Maps iframe is roughly 1.5 MB of third-party JavaScript and it
   sets cookies for every visitor, whether or not they ever look at it. So
   the map renders as a still, branded panel and only loads the real
   embed when someone asks for it. Nothing is requested from Google until
   that click.

   That also means the contact page — the page most likely to be opened in
   a hurry, on mobile data, standing outside — stays fast.

   The written address above it is never behind that click.
   ========================================================================= */

export function OfficeMap({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const address = resolved.address;

  if (!address || address.status !== 'confirmed') return null;

  const lines = [
    address.streetAddress,
    address.locality,
    address.region,
    address.postalCode,
    address.country,
  ].filter((line): line is string => Boolean(line));

  if (lines.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {/* The address, always readable, never behind an interaction. */}
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
            <span className="mt-1 block text-[0.9375rem] text-ink-600">{address.directions}</span>
          )}
        </span>
      </address>

      {address.mapEmbedUrl && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-line bg-porcelain-200 sm:aspect-[16/10]">
          {loaded ? (
            <iframe
              title="Map showing the location of the MAQAAMU IBRAHIM TRAVEL AGENCY office"
              src={address.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className={cn(
                'group absolute inset-0 flex flex-col items-center justify-center gap-4',
                'bg-ink-950 text-porcelain-50 transition-colors duration-300',
              )}
            >
              {/* A quiet abstract of a street grid — no third-party request,
                  and no pretence that it is the real map. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #66cfce 1px, transparent 1px), linear-gradient(to bottom, #66cfce 1px, transparent 1px), linear-gradient(115deg, transparent 46%, #66cfce 46%, #66cfce 47.5%, transparent 47.5%)',
                  backgroundSize: '46px 46px, 46px 46px, 100% 100%',
                }}
              />
              <span className="relative z-10 grid size-12 place-items-center rounded-full border border-white/25 bg-white/5 transition-colors duration-300 group-hover:border-white/50">
                <MapPin className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="relative z-10 flex flex-col items-center gap-1">
                <span className="text-[0.9375rem] font-medium">Show the map</span>
                <span className="text-small text-porcelain-200/76">
                  Loads Google Maps
                </span>
              </span>
            </button>
          )}
        </div>
      )}

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
