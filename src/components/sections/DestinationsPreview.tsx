import { ArrowUpRight } from 'lucide-react';
import { copy, isModuleEnabled, resolved } from '@/content';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { PendingSection } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   DESTINATIONS PREVIEW (homepage)
   -------------------------------------------------------------------------
   Gated twice: the module has to be on AND there has to be something
   confirmed to show. If the agency does not sell destination-led travel,
   switching `destinations` off in content/modules.ts removes this section,
   both routes and the nav entry in one edit.

   The layout is an editorial mosaic — one tall lead card and two stacked —
   rather than three equal tiles, because equal tiles are what every travel
   template does.
   ========================================================================= */

export function DestinationsPreview() {
  if (!isModuleEnabled('destinations')) return null;

  const all = resolved.destinations;
  const featured = all.filter((destination) => destination.featured);
  const shown = (featured.length > 0 ? featured : all).slice(0, 3);

  if (shown.length === 0) {
    return (
      <Section tone="night">
        <Container width="wide">
          <PendingSection title="Destinations" file="src/content/destinations.ts">
            No destination has been confirmed. If the agency does not sell destination-led travel,
            set destinations to false in src/content/modules.ts and this section, both routes and
            the navigation link all disappear together.
          </PendingSection>
        </Container>
      </Section>
    );
  }

  const [lead, ...rest] = shown;

  return (
    <Section tone="night" className="grain">
      <Container width="wide" className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={copy.destinations.eyebrow}
            heading={copy.destinations.heading}
            intro={copy.destinations.intro}
            size="lg"
            onDark
            aside={
              <Button
                to="/destinations"
                variant="ghost"
                onDark
                trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
              >
                {copy.destinations.cta}
              </Button>
            }
          />
        </Reveal>

        <RevealGroup stagger={0.1} className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {lead && (
            <RevealItem>
              <DestinationCard destination={lead} tall />
            </RevealItem>
          )}

          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              {rest.map((destination) => (
                <RevealItem key={destination.slug}>
                  <DestinationCard destination={destination} />
                </RevealItem>
              ))}
            </div>
          )}
        </RevealGroup>
      </Container>
    </Section>
  );
}
