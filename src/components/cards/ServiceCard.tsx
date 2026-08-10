import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { Service } from '@/content';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { Icon } from '@/components/ui/Icon';
import { PendingMark } from '@/components/ui/Pending';

/* =========================================================================
   SERVICE CARD
   -------------------------------------------------------------------------
   Two presentations of the same record:

     'editorial' — image-led, used on the homepage where three services get
                   room to breathe
     'index'     — a numbered row, used on /services where the whole list
                   has to stay scannable

   The whole card is one link. There is no nested "Read more" anchor inside
   it, because two overlapping targets is a well-known screen-reader and
   touch problem — the arrow is decorative and the link's accessible name
   is the service title.
   ========================================================================= */

interface ServiceCardProps {
  service: Service;
  variant?: 'editorial' | 'index' | 'compact';
  index?: number;
  className?: string;
}

export function ServiceCard({
  service,
  variant = 'editorial',
  index,
  className,
}: ServiceCardProps) {
  const to = `/services/${service.slug}`;

  /* 'compact' exists for the homepage grid, where all nine services are
     shown at once. Nine image-led cards would be a wall of photographs and
     a slow first screen; nine typographic tiles let a visitor take in the
     entire range of the business in about three seconds, which is the
     whole job of that section. */
  if (variant === 'compact') {
    return (
      <Link
        to={to}
        className={cn(
          'group flex h-full flex-col gap-3 border border-line bg-surface-raised p-6',
          'transition-[border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raise',
          'motion-reduce:hover:translate-y-0',
          className,
        )}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-aegean-500/25 bg-aegean-500/[0.06] text-aegean-700">
            <Icon name={service.icon} className="size-[1.125rem]" />
          </span>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className={cn(
              'size-4 text-ink-300 transition-[transform,color] duration-300',
              'ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-ink-900',
              'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
              'motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0',
            )}
          />
        </span>

        <span className="mt-1 font-display-tight text-[1.25rem] leading-tight text-ink-900 transition-colors duration-300 group-hover:text-aegean-700">
          {service.title}
        </span>

        <span className="text-[0.875rem] leading-relaxed text-ink-700">{service.summary}</span>
      </Link>
    );
  }

  if (variant === 'index') {
    return (
      <Link
        to={to}
        className={cn(
          'group grid grid-cols-1 items-start gap-6 py-8 sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:py-10',
          'transition-colors duration-300',
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="font-display-text text-small tabular-nums text-aegean-700/70"
        >
          {String((index ?? 0) + 1).padStart(2, '0')}
        </span>

        <span className="flex flex-col gap-3">
          <span className="flex flex-wrap items-center gap-3">
            <Icon name={service.icon} className="size-[1.125rem] text-aegean-700" />
            <span className="font-display-tight text-display-sm text-ink-900 transition-colors duration-300 group-hover:text-aegean-800">
              {service.title}
            </span>
            <PendingMark record={service} />
          </span>
          <span className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-700">
            {service.summary}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={cn(
            'hidden size-11 shrink-0 place-items-center rounded-full border border-line sm:grid',
            'transition-[border-color,background-color,transform] duration-300',
            'ease-[cubic-bezier(0.16,1,0.3,1)]',
            'group-hover:-translate-y-0.5 group-hover:border-ink-900 group-hover:bg-ink-950 group-hover:text-porcelain-50',
            'motion-reduce:group-hover:translate-y-0',
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </span>
      </Link>
    );
  }

  return (
    <Link to={to} className={cn('group flex flex-col', className)}>
      <EditorialImage
        image={service.image}
        aspect="4/3"
        mobileAspect="3/2"
        hoverZoom
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        className="mb-6"
      />

      <div className="flex items-center gap-3">
        <Icon name={service.icon} className="size-[1.125rem] text-aegean-700" />
        <span className="eyebrow text-ink-500">
          {String((index ?? 0) + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-4 font-display-tight text-[1.5rem] leading-tight text-ink-900 transition-colors duration-300 group-hover:text-aegean-800">
        {service.title}
      </h3>

      <PendingMark record={service} className="mt-3 self-start" />

      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{service.summary}</p>

      <span
        aria-hidden="true"
        className="mt-5 inline-flex items-center gap-2 text-small font-medium text-ink-900"
      >
        <span className="link-underline">Read more</span>
        <ArrowUpRight
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          strokeWidth={1.5}
        />
      </span>
    </Link>
  );
}
