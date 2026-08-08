import { Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, Minus } from 'lucide-react';
import { copy, getPackageBySlug, isDraftMode } from '@/content';
import { breadcrumbJsonLd, graphs, useSeo } from '@/lib/seo';
import { clampDescription } from '@/lib/site-map';
import { Container, Section } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { PendingMark } from '@/components/ui/Pending';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   PACKAGE DETAIL
   -------------------------------------------------------------------------
   No Product or Offer structured data is emitted. Those types require a
   price and an availability claim, and publishing either without the
   client's confirmation would put a false commercial statement into search
   results. If the agency later confirms fixed, published prices, that is
   the moment to add Offer markup — not before.
   ========================================================================= */

export default function PackageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getPackageBySlug(slug) : undefined;
  const isVisible = item && (isDraftMode || item.status === 'confirmed');

  useSeo({
    title: item?.name ?? 'Travel package',
    description: item ? clampDescription(item.summary) : '',
    path: `/packages/${slug ?? ''}`,
    noIndex: !isVisible,
    jsonLd: item
      ? graphs(
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Travel packages', path: '/packages' },
            { name: item.name, path: `/packages/${item.slug}` },
          ]),
        )
      : [],
  });

  if (!isVisible || !item) {
    return <Navigate to="/packages" replace />;
  }

  return (
    <>
      <PageHeader
        variant="image"
        image={item.image}
        eyebrow={copy.packages.eyebrow}
        title={item.name}
        intro={item.summary}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Travel packages', to: '/packages' },
          { label: item.name },
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
          <PendingMark record={item} onDark />
        </div>
      </PageHeader>

      <Section>
        <Container width="content">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal className="flex flex-col gap-8">
              <div className="flex flex-wrap items-baseline gap-x-10 gap-y-5 border-b border-line pb-8">
                <div className="flex flex-col gap-1.5">
                  <span className="eyebrow text-ink-500">Price</span>
                  <span className="font-display-tight text-[1.5rem] text-ink-900">
                    {item.priceNote ?? copy.packages.priceOnEnquiry}
                  </span>
                </div>

                {item.duration && (
                  <div className="flex flex-col gap-1.5">
                    <span className="eyebrow text-ink-500">Duration</span>
                    <span className="flex items-center gap-2 font-display-tight text-[1.5rem] text-ink-900">
                      <Clock className="size-4 text-ink-300" strokeWidth={1.5} aria-hidden="true" />
                      {item.duration}
                    </span>
                  </div>
                )}
              </div>

              {item.inclusions.length > 0 && (
                <div>
                  <h2 className="font-display-tight text-display-sm text-ink-900">
                    {copy.packages.detailInclusions}
                  </h2>
                  <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                    {item.inclusions.map((inclusion) => (
                      <li key={inclusion} className="flex items-start gap-3 py-4">
                        <Check
                          className="mt-1 size-4 shrink-0 text-aegean-700"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                          {inclusion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>

            <Reveal className="flex flex-col gap-8">
              {item.exclusions.length > 0 && (
                <div>
                  <h2 className="font-display-tight text-display-sm text-ink-900">
                    {copy.packages.detailExclusions}
                  </h2>
                  <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                    {item.exclusions.map((exclusion) => (
                      <li key={exclusion} className="flex items-start gap-3 py-4">
                        <Minus
                          className="mt-1 size-4 shrink-0 text-ink-300"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                          {exclusion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border border-line bg-surface-raised p-7">
                <h2 className="font-display-tight text-[1.25rem] text-ink-900">
                  Want this adapted?
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  Tell us your dates and who is travelling, and we will come back with something
                  built around you.
                </p>
                <Button to="/booking" className="mt-6" size="md">
                  {copy.hero.primaryCta}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
