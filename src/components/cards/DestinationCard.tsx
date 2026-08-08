import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Destination } from '@/content';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { PendingMark } from '@/components/ui/Pending';

/* =========================================================================
   DESTINATION CARD
   -------------------------------------------------------------------------
   Photography carries this one, so the type sits over the image behind a
   scrim rather than beside it. The scrim is not decorative: it is what
   guarantees the white text stays legible whatever photograph the client
   eventually supplies. Never remove it to "let the picture breathe".

   `tall` is used for the lead card in the destinations grid.
   ========================================================================= */

interface DestinationCardProps {
  destination: Destination;
  tall?: boolean;
  className?: string;
}

export function DestinationCard({ destination, tall = false, className }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className={cn('group relative block overflow-hidden', className)}
    >
      <EditorialImage
        image={destination.image}
        aspect={tall ? '3/4' : '4/5'}
        mobileAspect="4/5"
        overlay="bottom"
        hoverZoom
        sizes={
          tall
            ? '(min-width: 1024px) 48vw, 92vw'
            : '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw'
        }
      >
        <div className="relative z-20 mt-auto flex w-full flex-col gap-2 p-6 sm:p-7">
          <span className="eyebrow text-aegean-200">{destination.region}</span>

          <h3
            className={cn(
              'font-display-tight text-porcelain-50',
              tall ? 'text-display-sm sm:text-display-md' : 'text-[1.5rem] leading-tight',
            )}
          >
            {destination.name}
          </h3>

          <p className="max-w-md text-[0.875rem] leading-relaxed text-porcelain-200/88">
            {destination.summary}
          </p>

          <span className="mt-1 flex flex-wrap items-center gap-3">
            <PendingMark record={destination} onDark />
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-porcelain-50"
            >
              <span className="link-underline">Explore</span>
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                strokeWidth={1.75}
              />
            </span>
          </span>
        </div>
      </EditorialImage>
    </Link>
  );
}
