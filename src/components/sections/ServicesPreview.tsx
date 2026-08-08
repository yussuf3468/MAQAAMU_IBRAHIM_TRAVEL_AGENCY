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
   Shows the services flagged `featured` in the content layer, falling back
   to the first three. Three is the ceiling on purpose: the homepage sells
   the idea, /services carries the full list.

   If no service has been confirmed, the whole section removes itself in
   production rather than rendering an empty grid.
   ========================================================================= */

export function ServicesPreview() {
  const all = resolved.services;
  const featured = all.filter((service) => service.featured);
  const shown = (featured.length > 0 ? featured : all).slice(0, 3);

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
          stagger={0.09}
          className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
        >
          {shown.map((service, index) => (
            <RevealItem key={service.slug}>
              <ServiceCard service={service} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
