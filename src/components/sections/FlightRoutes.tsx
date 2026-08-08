import { Plane } from 'lucide-react';
import { copy, publishable } from '@/content';
import { departureCity, flightRoutes } from '@/content/routes';
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
  if (routes.length === 0) return null;

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

        <Reveal>
          <p className={`mt-8 text-small ${onDark ? 'text-porcelain-200/76' : 'text-ink-600'}`}>
            All routes shown depart from {departureCity}. Domestic flights are booked too.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
