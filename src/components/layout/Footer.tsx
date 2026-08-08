import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  CONTENT_MODE,
  company,
  copy,
  isDraftMode,
  liveContactChannels,
  liveSocialLinks,
  resolved,
} from '@/content';
import { primaryNav } from '@/lib/site-map';
import { Container, Rule } from '@/components/ui/Layout';
import { Wordmark } from './Wordmark';
import { PendingChip } from '@/components/ui/Pending';

/* =========================================================================
   FOOTER
   -------------------------------------------------------------------------
   Contact details live here as well as on /contact, because the footer is
   where people look when they have finished reading and want to act.

   Every block below renders only if it has something real to show. An
   empty "Follow us" heading with no links under it, or an address block
   with a blank line, reads as an unfinished site — so those blocks remove
   themselves entirely instead.
   ========================================================================= */

export function Footer() {
  const nav = primaryNav(CONTENT_MODE);
  const address = resolved.address;
  const hasAddress =
    address?.status === 'confirmed' &&
    Boolean(address.streetAddress || address.locality || address.country);

  const addressLines = hasAddress
    ? [address?.streetAddress, address?.locality, address?.region, address?.postalCode, address?.country]
        .filter((line): line is string => Boolean(line))
    : [];

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-950 text-porcelain-200 grain">
      <Container width="wide" className="relative z-10 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 [&>*]:min-w-0">
          {/* Identity ---------------------------------------------------- */}
          <div className="flex flex-col gap-6">
            <Wordmark onDark size="lg" asLink={false} />
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-porcelain-200/80">
              {copy.cta.body}
            </p>
            <Link
              to="/booking"
              className="inline-flex w-fit items-center gap-2 py-1 text-[0.875rem] font-medium text-aegean-300 transition-colors duration-200 hover:text-aegean-200"
            >
              <span className="link-underline">{copy.hero.primaryCta}</span>
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          {/* Navigation -------------------------------------------------- */}
          <nav aria-label="Footer" className="flex flex-col gap-4">
            <h2 className="eyebrow text-aegean-300/80">Explore</h2>
            <ul className="flex flex-col gap-3">
              {[{ to: '/', label: 'Home' }, ...nav].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-block max-w-full py-1 text-[0.9375rem] text-porcelain-200/88 wrap-break-word transition-colors duration-200 hover:text-porcelain-50"
                  >
                    <span className="link-underline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact ----------------------------------------------------- */}
          <div className="flex flex-col gap-4">
            <h2 className="eyebrow text-aegean-300/80">{copy.contact.channelsHeading}</h2>

            {liveContactChannels.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {liveContactChannels.map((channel) => (
                  <li key={`${channel.kind}-${channel.value}`}>
                    <a
                      href={channel.href ?? undefined}
                      {...(channel.kind === 'whatsapp'
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="inline-block max-w-full py-1 text-[0.9375rem] text-porcelain-200/88 wrap-break-word transition-colors duration-200 hover:text-porcelain-50"
                    >
                      <span className="link-underline">{channel.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-2">
                <PendingChip onDark>Contact details</PendingChip>
                {isDraftMode && (
                  <p className="text-[0.8125rem] leading-relaxed text-porcelain-200/72">
                    Add the agency’s phone, WhatsApp and email in
                    <span className="font-mono"> src/content/contact.ts</span>.
                  </p>
                )}
              </div>
            )}

            {addressLines.length > 0 && (
              <address className="mt-2 text-[0.9375rem] leading-relaxed text-porcelain-200/76 not-italic">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
          </div>

          {/* Social ------------------------------------------------------ */}
          <div className="flex flex-col gap-4">
            <h2 className="eyebrow text-aegean-300/80">{copy.contact.followHeading}</h2>
            {liveSocialLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {liveSocialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block max-w-full py-1 text-[0.9375rem] text-porcelain-200/88 wrap-break-word transition-colors duration-200 hover:text-porcelain-50"
                    >
                      <span className="link-underline">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <PendingChip onDark>Social profiles</PendingChip>
            )}
          </div>
        </div>

        <Rule onDark className="mt-14 mb-8" />

        <div className="flex flex-col gap-4 text-[0.8125rem] text-porcelain-200/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Designed and built by Lenzro.</span>
            {isDraftMode && (
              <PendingChip onDark>Draft content mode</PendingChip>
            )}
          </p>
        </div>
      </Container>

      {/* Reserves room for the fixed mobile action bar. */}
      <div className={cn('h-20 lg:hidden')} aria-hidden="true" />
    </footer>
  );
}
