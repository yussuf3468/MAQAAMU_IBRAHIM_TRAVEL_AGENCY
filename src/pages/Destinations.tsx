import { CONTENT_MODE, copy, media, resolved } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, graphs, organizationJsonLd, useSeo } from '@/lib/seo';
import { Container, Section } from '@/components/ui/Layout';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { PendingSection } from '@/components/ui/Pending';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   DESTINATIONS INDEX
   -------------------------------------------------------------------------
   Photography-led. The grid alternates tall and standard cards so the page
   reads as a spread rather than a catalogue — and so it still looks
   composed with four destinations or with fourteen.
   ========================================================================= */

export default function Destinations() {
  const route = findRoute('/destinations', CONTENT_MODE);
  const destinations = resolved.destinations;

  useSeo({
    title: route?.title ?? 'Destinations',
    description: route?.description ?? '',
    path: '/destinations',
    jsonLd: graphs(
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/destinations' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        variant="image"
        image={media.destinationsHeader}
        eyebrow={copy.destinations.eyebrow}
        title={copy.destinations.heading}
        intro={copy.destinations.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Destinations' }]}
      />

      <Section>
        <Container width="wide">
          {destinations.length === 0 ? (
            <>
              <p className="max-w-prose text-lead text-ink-700">{copy.destinations.empty}</p>
              <div className="mt-10">
                <PendingSection title="Destinations" file="src/content/destinations.ts">
                  No destination has been confirmed. If the agency does not sell destination-led
                  travel at all, set destinations to false in src/content/modules.ts — the page,
                  the homepage section and the navigation entry all disappear together.
                </PendingSection>
              </div>
            </>
          ) : (
            <RevealGroup
              stagger={0.08}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
              {destinations.map((destination, index) => (
                <RevealItem
                  key={destination.slug}
                  // Every fourth card takes two columns, breaking the grid's
                  // rhythm so the page does not read as a catalogue.
                  className={index % 4 === 0 ? 'sm:col-span-2 lg:col-span-2' : undefined}
                >
                  <DestinationCard destination={destination} tall={index % 4 === 0} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
