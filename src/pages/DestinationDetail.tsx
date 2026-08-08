import { Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { copy, getDestinationBySlug, isDraftMode, resolved } from '@/content';
import { breadcrumbJsonLd, graphs, useSeo } from '@/lib/seo';
import { clampDescription } from '@/lib/site-map';
import { Container, Section } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { PendingMark } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   DESTINATION DETAIL
   -------------------------------------------------------------------------
   No structured data is emitted for a destination. Schema.org's travel
   types describe tourist attractions and trips with dates and prices —
   claiming any of that on the agency's behalf would put unverified
   information into a search result. Breadcrumbs only.
   ========================================================================= */

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const destination = slug ? getDestinationBySlug(slug) : undefined;
  const isVisible = destination && (isDraftMode || destination.status === 'confirmed');

  const related = resolved.destinations.filter((item) => item.slug !== slug).slice(0, 3);

  useSeo({
    title: destination?.name ?? 'Destination',
    description: destination ? clampDescription(destination.summary) : '',
    path: `/destinations/${slug ?? ''}`,
    noIndex: !isVisible,
    jsonLd: destination
      ? graphs(
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/destinations' },
            { name: destination.name, path: `/destinations/${destination.slug}` },
          ]),
        )
      : [],
  });

  if (!isVisible || !destination) {
    return <Navigate to="/destinations" replace />;
  }

  return (
    <>
      <PageHeader
        variant="image"
        image={destination.image}
        eyebrow={destination.region}
        title={destination.name}
        intro={destination.summary}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Destinations', to: '/destinations' },
          { label: destination.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button
            to="/booking"
            variant="primary"
            onDark
            trailing={<ArrowUpRight className="size-4" strokeWidth={1.75} />}
          >
            {copy.hero.primaryCta}
          </Button>
          <PendingMark record={destination} onDark />
        </div>
      </PageHeader>

      <Section>
        <Container width="content">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <Reveal>
              <div className="prose-editorial">
                {destination.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <div className="flex flex-col gap-12">
              {destination.highlights.length > 0 && (
                <Reveal>
                  <h2 className="font-display-tight text-display-sm text-ink-900">
                    {copy.destinations.detailHighlights}
                  </h2>
                  <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                    {destination.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 py-4">
                        <Check
                          className="mt-1 size-4 shrink-0 text-aegean-700"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal className="flex flex-col gap-8">
                {destination.travelStyles.length > 0 && (
                  <div>
                    <h2 className="eyebrow text-ink-500">{copy.destinations.detailStyles}</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {destination.travelStyles.map((style, index) => (
                        <li
                          key={`${style}-${index}`}
                          className="rounded-[2px] border border-line bg-surface-raised px-3.5 py-2 text-[0.875rem] text-ink-700"
                        >
                          {style}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rendered only when the client states a season — never guessed. */}
                {destination.bestTime && (
                  <div>
                    <h2 className="eyebrow text-ink-500">{copy.destinations.detailBestTime}</h2>
                    <p className="mt-3 font-display-tight text-[1.25rem] text-ink-900">
                      {destination.bestTime}
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="night" className="grain">
          <Container width="wide" className="relative z-10">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display-tight text-display-sm text-porcelain-50">
                Other destinations
              </h2>
              <Button
                to="/destinations"
                variant="ghost"
                onDark
                trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
              >
                {copy.general.backToDestinations}
              </Button>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <RevealItem key={item.slug}>
                  <DestinationCard destination={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
