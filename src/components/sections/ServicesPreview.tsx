import { ArrowUpRight } from 'lucide-react';
import { copy, resolved } from '@/content';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { PendingSection } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   SERVICES PREVIEW (homepage)
   -------------------------------------------------------------------------
   EVERY service, directly under the hero. Not three, not the featured ones
   — all of them.

   This section exists because of a specific failure: an earlier version
   showed three featured services (Umrah, Hajj, air ticketing) a third of
   the way down the page, and the agency's own reaction was that the site
   "does not highlight what's needed" and read as though they only did Hajj
   and Umrah. A customer wanting cargo, a visa or a hotel could not see
   themselves anywhere.

   So the whole range is now the first thing after the hero, as a compact
   typographic grid rather than photo cards — nine photographs would be a
   slow, heavy first screen, while nine tiles can be taken in at a glance.

   Adding a tenth service to content/services.ts adds a tenth tile here
   with no change to this file.
   ========================================================================= */

export function ServicesPreview() {
  const shown = resolved.services;

  if (shown.length === 0) {
    return (
      <Section>
        <Container width="wide">
          <PendingSection title="Services" file="src/content/services.ts">
            The agency’s services have not been confirmed yet, so nothing is listed. Add them to
            the services file and this section fills itself in — including the homepage grid, the
            /services page, every service page and the enquiry form’s dropdown.
          </PendingSection>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={copy.services.eyebrow}
            heading={copy.services.heading}
            intro={copy.services.intro}
            size="lg"
            aside={
              <Button
                to="/services"
                variant="ghost"
                trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
              >
                {copy.services.cta}
              </Button>
            }
          />
        </Reveal>

        <RevealGroup
          stagger={0.04}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4"
        >
          {shown.map((service) => (
            <RevealItem key={service.slug} className="flex">
              <ServiceCard service={service} variant="compact" className="w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
