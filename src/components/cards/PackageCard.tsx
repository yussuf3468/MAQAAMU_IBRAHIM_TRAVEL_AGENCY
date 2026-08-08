import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { copy } from '@/content';
import type { TravelPackage } from '@/content';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { PendingMark } from '@/components/ui/Pending';

/* =========================================================================
   PACKAGE CARD
   -------------------------------------------------------------------------
   Designed to look complete WITHOUT a price. `priceNote` is null until the
   client gives a figure they are willing to publish, and where it is null
   the card shows "Price on enquiry" — which is true, and which removes any
   design pressure to invent a number to fill the space.

   Same rule for `duration`: absent means the row is not rendered, not that
   a plausible-looking duration gets substituted.
   ========================================================================= */

interface PackageCardProps {
  item: TravelPackage;
  className?: string;
}

export function PackageCard({ item, className }: PackageCardProps) {
  const inclusions = item.inclusions.slice(0, 4);

  return (
    <Link
      to={`/packages/${item.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden border border-line bg-surface-raised',
        'transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-lift',
        'motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <EditorialImage
        image={item.image}
        aspect="16/10"
        hoverZoom
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display-tight text-[1.375rem] leading-tight text-ink-900 transition-colors duration-300 group-hover:text-aegean-800">
            {item.name}
          </h3>
          <PendingMark record={item} />
        </div>

        {item.duration && (
          <p className="mt-2 flex items-center gap-2 text-small text-ink-600">
            <Clock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            {item.duration}
          </p>
        )}

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{item.summary}</p>

        {inclusions.length > 0 && (
          <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
            {inclusions.map((inclusion) => (
              <li key={inclusion} className="flex items-start gap-2.5 text-[0.875rem] text-ink-700">
                <Check
                  className="mt-[0.3rem] size-3.5 shrink-0 text-aegean-700"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {inclusion}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <span className="flex flex-col">
            <span className="eyebrow text-ink-500">
              {item.priceNote ? 'From' : copy.packages.priceOnEnquiry}
            </span>
            {item.priceNote && (
              <span className="mt-1 font-display-tight text-[1.25rem] text-ink-900">
                {item.priceNote}
              </span>
            )}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              'grid size-11 shrink-0 place-items-center rounded-full border border-line',
              'transition-[border-color,background-color,color] duration-300',
              'group-hover:border-ink-900 group-hover:bg-ink-950 group-hover:text-porcelain-50',
            )}
          >
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
