import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ImageRef } from '@/content';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { Container } from '@/components/ui/Layout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { LineReveal } from '@/components/motion/Reveal';

/* =========================================================================
   PAGE HEADER
   -------------------------------------------------------------------------
   The masthead for every route other than the homepage. Two treatments:

     'image' — a wide cinematic band. Used where a page is visual.
     'plain' — type on the sand ground. Used for /contact, /booking and
               /faq, where a decorative photograph would only delay the
               thing the visitor came to do.

   Both reserve the same vertical space and share the same type scale, so
   moving between routes never feels like moving between websites.

   Breadcrumbs are rendered as a real <nav aria-label="Breadcrumb"> with an
   ordered list, which is what assistive technology and search engines both
   expect.
   ========================================================================= */

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: ImageRef;
  variant?: 'image' | 'plain';
  crumbs?: Crumb[];
  /** Rendered under the intro, e.g. a call to action or metadata row. */
  children?: ReactNode;
  /**
   * Rendered beside the heading on large screens. The plain masthead
   * otherwise leaves the entire right half of a wide monitor empty, which
   * reads as an unfinished page rather than as restraint — so pages with
   * something genuinely useful to put there (the contact details) do.
   */
  aside?: ReactNode;
}

function Breadcrumbs({ crumbs, onDark }: { crumbs: Crumb[]; onDark: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] tracking-[0.04em]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {crumb.to && !isLast ? (
                <Link
                  to={crumb.to}
                  // py-1.5 takes the target past the 24px WCAG 2.5.8 minimum.
                  // Breadcrumb type is small by design; the tap area is not.
                  className={cn(
                    'inline-block py-1.5 transition-colors duration-200',
                    onDark
                      ? 'text-porcelain-200/76 hover:text-porcelain-50'
                      : 'text-ink-500 hover:text-ink-900',
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    'inline-block py-1.5',
                    onDark ? 'text-porcelain-100/90' : 'text-ink-700',
                  )}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn('size-3', onDark ? 'text-porcelain-200/35' : 'text-ink-300')}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  variant = 'plain',
  crumbs,
  children,
  aside,
}: PageHeaderProps) {
  const onDark = variant === 'image';
  const lines = [title];

  const body = (
    <Container width="wide" className="relative z-20">
      <div
        className={cn(
          aside ? 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16' : 'max-w-3xl',
        )}
      >
        <div className={cn(aside ? 'min-w-0' : undefined)}>
        {crumbs && crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} onDark={onDark} />}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className={cn(
              'eyebrow mb-5 flex items-center gap-3',
              onDark ? 'text-aegean-300' : 'text-aegean-700',
            )}
          >
            <span
              aria-hidden="true"
              className={cn('h-px w-8', onDark ? 'bg-aegean-300/60' : 'bg-aegean-500/50')}
            />
            {eyebrow}
          </motion.p>
        )}

        <LineReveal
          as="h1"
          immediate
          delay={0.05}
          lines={lines}
          className={cn(
            'font-display-tight text-display-lg',
            onDark ? 'text-porcelain-50' : 'text-ink-900',
          )}
        />

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE_OUT_EXPO }}
            className={cn('mt-6 max-w-xl text-lead', onDark ? 'text-porcelain-100/88' : 'text-ink-700')}
          >
            {intro}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE_OUT_EXPO }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
        </div>

        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </Container>
  );

  if (variant === 'image' && image) {
    return (
      <section className="relative isolate flex min-h-[62svh] flex-col justify-end overflow-hidden bg-ink-950 pt-[4.5rem] pb-14 sm:min-h-[68svh] sm:pb-16 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <EditorialImage image={image} aspect="auto" priority overlay="full" sizes="100vw" />
        </div>
        {body}
      </section>
    );
  }

  return (
    <section className="relative border-b border-line bg-surface pt-[calc(4.5rem+clamp(3rem,6vw,5.5rem))] pb-section-sm">
      {body}
    </section>
  );
}
