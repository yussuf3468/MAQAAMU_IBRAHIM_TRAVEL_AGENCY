import { CONTENT_MODE, copy, media, resolved } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, graphs, organizationJsonLd, useSeo } from '@/lib/seo';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { PendingMark, PendingSection } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';
import { PageHeader } from '@/components/sections/PageHeader';
import { TrustBand } from '@/components/sections/TrustBand';
import { CtaBanner } from '@/components/sections/CtaBanner';

/* =========================================================================
   ABOUT
   -------------------------------------------------------------------------
   Five sections, in the order a stranger needs them: who, what, why, who
   we serve, what makes us different. Each is an interview slot in
   src/content/about.ts — the client's own words go straight in.

   The layout alternates a sticky eyebrow column against the body copy, so
   a short answer and a long one both look intentional. Nothing here breaks
   if the client gives one paragraph for one section and six for another.
   ========================================================================= */

export default function About() {
  const route = findRoute('/about', CONTENT_MODE);
  const sections = resolved.about;
  const values = resolved.values;

  useSeo({
    title: route?.title ?? 'About',
    description: route?.description ?? '',
    path: '/about',
    jsonLd: graphs(
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        variant="image"
        image={media.aboutHeader}
        eyebrow={copy.about.eyebrow}
        title={copy.about.heading}
        intro={copy.about.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {sections.length === 0 ? (
        <Section>
          <Container width="wide">
            <PendingSection title="About content" file="src/content/about.ts">
              The agency’s story has not been recorded yet. Nothing about its history, founding or
              team has been written for it — those five sections are interview questions waiting
              for answers.
            </PendingSection>
          </Container>
        </Section>
      ) : (
        <Section>
          <Container width="content">
            <div className="flex flex-col divide-y divide-line">
              {sections.map((section, index) => (
                <Reveal
                  key={section.key}
                  className={index === 0 ? 'pb-14 lg:pb-20' : 'py-14 lg:py-20'}
                >
                  <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                      <p className="eyebrow flex items-center gap-3 text-aegean-700">
                        <span aria-hidden="true" className="h-px w-6 bg-aegean-500/50" />
                        {section.eyebrow}
                      </p>
                      <PendingMark record={section} className="mt-4" />
                    </div>

                    <div>
                      <h2 className="font-display-tight text-display-sm text-balance text-ink-900">
                        {section.heading}
                      </h2>
                      <div className="prose-editorial mt-6">
                        {section.body.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* A single full-bleed image, placed where the reading gets long. */}
      <Reveal>
        <Parallax distance={70} className="h-[52svh] sm:h-[62svh]">
          <EditorialImage
            image={media.aboutPortrait}
            aspect="auto"
            sizes="100vw"
            className="scale-105"
          />
        </Parallax>
      </Reveal>

      {values.length > 0 && (
        <Section tone="sunk">
          <Container width="wide">
            <Reveal>
              <SectionHeading
                eyebrow={copy.about.valuesEyebrow}
                heading={copy.about.valuesHeading}
              />
            </Reveal>

            <RevealGroup className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {values.map((value, index) => (
                <RevealItem key={value.title} className="flex flex-col gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display-text text-small tabular-nums text-aegean-700/70"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display-tight text-[1.25rem] leading-snug text-ink-900">
                    {value.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-700">{value.body}</p>
                  <PendingMark record={value} className="self-start" />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <TrustBand />
      <CtaBanner />
    </>
  );
}
