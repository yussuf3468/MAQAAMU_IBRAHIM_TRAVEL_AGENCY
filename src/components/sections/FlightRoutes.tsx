import { Plane } from 'lucide-react';
import { cn } from '@/lib/cn';
import { copy, publishable } from '@/content';
import { departureCity, flightRoutes, localRoutes } from '@/content/routes';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   FLIGHT ROUTES
   -------------------------------------------------------------------------
   The sixteen international destinations the agency tickets from Nairobi.

   Presented as a typographic list rather than as cards with photographs.
   Two reasons: we have no photograph of any of these places, and a list
   this long is genuinely easier to scan as type. It also stays honest —
   these are places the agency sells tickets to, not trips it runs, and a
   glossy card would imply the second.

   Both languages from the brochure are kept. The Somali name is rendered
   in a lighter weight beneath the English one, so it reads as a second
   line rather than as clutter.
   ========================================================================= */

export function FlightRoutes({ tone = 'sunk' }: { tone?: 'default' | 'sunk' | 'night' }) {
  const routes = publishable(flightRoutes);
  const local = publishable(localRoutes);
  if (routes.length === 0 && local.length === 0) return null;

  const onDark = tone === 'night';

  return (
    <Section tone={tone}>
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={copy.routes.eyebrow}
            heading={copy.routes.heading}
            intro={copy.routes.intro}
            onDark={onDark}
            aside={
              <Button to="/booking" variant="secondary" size="md" onDark={onDark}>
                Ask about a route
              </Button>
            }
          />
        </Reveal>

        <RevealGroup
          stagger={0.03}
          as="ul"
          className="mt-12 grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {routes.map((route) => (
            <RevealItem
              key={route.name}
              as="li"
              className="flex items-baseline gap-3 border-b border-line py-4"
            >
              <Plane
                aria-hidden="true"
                strokeWidth={1.25}
                className="size-3.5 shrink-0 -rotate-45 text-aegean-500"
              />
              <span className="flex min-w-0 flex-col">
                <span
                  className={onDark ? 'text-[1rem] text-porcelain-50' : 'text-[1rem] text-ink-900'}
                >
                  {route.name}
                </span>
                {/* The brochure prints every destination in Somali too, and
                    a good number of their customers read that column first. */}
                <span
                  lang="so"
                  className={onDark ? 'text-small text-porcelain-200/74' : 'text-small text-ink-500'}
                >
                  {route.nameSomali}
                </span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Domestic routes, from the office banner. Rendered as chips rather
            than a second long list — there are fewer of them, they are one
            word each, and a chip row reads as "and these too" instead of
            competing with the international column above. */}
        {local.length > 0 && (
          <Reveal className="mt-14">
            <h3
              className={cn(
                'eyebrow flex items-center gap-3',
                onDark ? 'text-aegean-300' : 'text-aegean-700',
              )}
            >
              <span
                aria-hidden="true"
                className={cn('h-px w-8', onDark ? 'bg-aegean-300/60' : 'bg-aegean-500/50')}
              />
              Local flights from {departureCity}
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {local.map((route) => (
                <li
                  key={route.name}
                  className={cn(
                    'rounded-[2px] border px-3.5 py-2 text-[0.875rem]',
                    onDark
                      ? 'border-white/15 bg-white/[0.04] text-porcelain-100'
                      : 'border-line bg-surface-raised text-ink-700',
                  )}
                >
                  {route.name}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal>
          <p className={`mt-8 text-small ${onDark ? 'text-porcelain-200/76' : 'text-ink-600'}`}>
            All routes depart from {departureCity}. If your destination is not listed, ask us — we
            ticket more than we can fit on a wall.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
