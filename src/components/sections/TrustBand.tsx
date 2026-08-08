import { copy, resolved } from '@/content';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Icon } from '@/components/ui/Icon';
import { PendingMark, PendingSection } from '@/components/ui/Pending';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

/* =========================================================================
   TRUST BAND
   -------------------------------------------------------------------------
   Trust without invented numbers.

   The band prefers statistics when the client has supplied them and falls
   back to qualitative statements when they have not — and it is designed
   so that the qualitative version does not look like a downgrade. That is
   deliberate: if the fallback looked worse, there would be a quiet
   incentive to make a number up.

   Anything shown here has come from src/content/trust.ts, where the rules
   about numbers and credentials are spelled out.
   ========================================================================= */

function StatRow() {
  const stats = resolved.trustStats;
  if (stats.length === 0) return null;

  return (
    <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-12 lg:grid-cols-3">
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="flex flex-col gap-2">
          <span className="font-display-tight text-display-md tabular-nums text-ink-900">
            {stat.value}
          </span>
          <span className="text-small text-ink-600">{stat.label}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function CredentialRow() {
  const items = resolved.credentials;
  if (items.length === 0) return null;

  return (
    <Reveal className="mt-14 border-t border-line pt-10">
      <p className="eyebrow mb-5 text-ink-500">Registered with</p>
      <ul className="flex flex-wrap gap-x-10 gap-y-4">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col">
            <span className="text-[0.9375rem] font-medium text-ink-800">{item.name}</span>
            {item.issuer && <span className="text-small text-ink-600">{item.issuer}</span>}
            {item.reference && (
              <span className="text-[0.8125rem] text-ink-500">Ref. {item.reference}</span>
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function TrustBand() {
  const points = resolved.trustPoints;
  const hasStats = resolved.trustStats.length > 0;

  if (points.length === 0 && !hasStats) {
    return (
      <Section tone="sunk">
        <Container width="wide">
          <PendingSection title="Trust section" file="src/content/trust.ts">
            Nothing is shown here until the agency confirms how it works, or supplies figures it
            is happy to publish. No years, traveller counts or credentials have been estimated.
          </PendingSection>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="sunk">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={copy.trust.eyebrow}
            heading={copy.trust.heading}
            intro={copy.trust.intro}
          />
        </Reveal>

        {points.length > 0 && (
          <RevealGroup className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {points.map((point) => (
              <RevealItem key={point.title} className="flex flex-col gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-aegean-500/25 bg-aegean-500/[0.06] text-aegean-700">
                  <Icon name={point.icon} className="size-[1.125rem]" />
                </span>
                <h3 className="font-display-tight text-[1.25rem] leading-snug text-ink-900">
                  {point.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-700">{point.body}</p>
                <PendingMark record={point} className="self-start" />
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {hasStats && <div className="mt-16">{<StatRow />}</div>}
        <CredentialRow />
      </Container>
    </Section>
  );
}
