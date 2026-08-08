import { ArrowUpRight } from 'lucide-react';
import { CONTENT_MODE, copy, groupFaqByCategory, resolved } from '@/content';
import { findRoute } from '@/lib/site-map';
import { breadcrumbJsonLd, faqJsonLd, graphs, useSeo } from '@/lib/seo';
import { Container, Section } from '@/components/ui/Layout';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { PendingMark, PendingSection } from '@/components/ui/Pending';
import { Reveal } from '@/components/motion/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';

/* =========================================================================
   FAQ
   -------------------------------------------------------------------------
   Grouped by category, one answer open at a time.

   FAQPage structured data is emitted ONLY for confirmed question/answer
   pairs — see faqJsonLd in lib/seo.ts. A placeholder answer that reached
   the JSON-LD could surface verbatim in a Google result, which is why the
   filter lives in the builder rather than being left to each caller.
   ========================================================================= */

export default function Faq() {
  const route = findRoute('/faq', CONTENT_MODE);
  const items = resolved.faq;
  const groups = groupFaqByCategory(items);

  useSeo({
    title: route?.title ?? 'Frequently asked questions',
    description: route?.description ?? '',
    path: '/faq',
    jsonLd: graphs(
      faqJsonLd(items),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
    ),
  });

  return (
    <>
      <PageHeader
        eyebrow={copy.faq.eyebrow}
        title={copy.faq.heading}
        intro={copy.faq.intro}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
      />

      <Section>
        <Container width="content">
          {groups.length === 0 ? (
            <PendingSection title="FAQ" file="src/content/faq.ts">
              No question has been answered yet. The questions are drafted; the answers must come
              from the agency, because each one describes how they specifically work.
            </PendingSection>
          ) : (
            <div className="flex flex-col gap-16">
              {groups.map((group) => (
                <Reveal key={group.category}>
                  <div className="grid gap-6 lg:grid-cols-[12rem_1fr] lg:gap-14">
                    <h2 className="eyebrow flex items-start gap-3 pt-1 text-aegean-700 lg:sticky lg:top-28 lg:self-start">
                      <span aria-hidden="true" className="mt-2 h-px w-6 bg-aegean-500/50" />
                      {group.category}
                    </h2>

                    <Accordion
                      items={group.items.map((item, index) => ({
                        id: `${group.category}-${index}`,
                        question: item.question,
                        answer: item.answer,
                        badge: <PendingMark record={item} />,
                      }))}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-20 flex flex-col items-start gap-5 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display-tight text-display-sm text-ink-900">
                {copy.faq.stillAsking}
              </h2>
              <p className="mt-2 text-[0.9375rem] text-ink-700">{copy.faq.stillAskingBody}</p>
            </div>
            <Button
              to="/contact"
              variant="secondary"
              size="md"
              trailing={<ArrowUpRight className="size-4" strokeWidth={1.5} />}
            >
              Contact the agency
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
