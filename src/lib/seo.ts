import { useEffect } from 'react';
import { company } from '../content/company';
import { openGraphImage } from '../content/media';
import {
  address,
  liveContactChannels,
  liveSocialLinks,
} from '../content';
import { openingHours } from '../content/contact';
import type { FaqItem, Service } from '../content/types';
import { absoluteUrl } from './site-map';

/* =========================================================================
   SEO
   -------------------------------------------------------------------------
   Two responsibilities:

   1. Keep the document head correct as the user navigates the SPA.
   2. Emit structured data that contains ONLY confirmed information.

   Rule for every builder below: a field whose value is unknown is omitted
   from the JSON-LD entirely. An absent property is invisible to Google; a
   guessed one is a false statement about the client's business published
   in a machine-readable format. Never emit a placeholder here.
   ========================================================================= */

const MANAGED = 'data-seo';

function upsertMeta(selector: string, attrs: Record<string, string>): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
}

function removeMeta(selector: string): void {
  document.head.querySelector(selector)?.remove();
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.href = href;
}

export interface SeoInput {
  /** Page title without the company suffix. */
  title: string;
  description: string;
  /** Route path, e.g. '/services'. Used for the canonical URL. */
  path: string;
  /** Absolute or root-relative image for social cards. */
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
  /** One or more JSON-LD graphs to attach to this page. */
  jsonLd?: object[];
}

export function useSeo({
  title,
  description,
  path,
  image = openGraphImage,
  type = 'website',
  noIndex = false,
  jsonLd = [],
}: SeoInput): void {
  const jsonLdKey = JSON.stringify(jsonLd);

  useEffect(() => {
    const fullTitle =
      path === '/' ? `${company.displayName} — ${title}` : `${title} — ${company.displayName}`;
    const canonical = absoluteUrl(path);
    const imageUrl = image ? (image.startsWith('http') ? image : absoluteUrl(image)) : null;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertLink('canonical', canonical);

    if (noIndex) {
      upsertMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, follow' });
    } else {
      removeMeta('meta[name="robots"]');
    }

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: company.displayName,
    });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en' });

    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });

    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
      upsertMeta('meta[name="twitter:card"]', {
        name: 'twitter:card',
        content: 'summary_large_image',
      });
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    } else {
      // No brand image yet — a card pointing at a missing file looks worse
      // than no card at all.
      removeMeta('meta[property="og:image"]');
      removeMeta('meta[name="twitter:image"]');
      upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    }
  }, [title, description, path, image, type, noIndex]);

  useEffect(() => {
    const graphs: object[] = JSON.parse(jsonLdKey);
    const nodes = graphs.map((graph) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '');
      script.textContent = JSON.stringify(graph);
      document.head.appendChild(script);
      return script;
    });
    return () => nodes.forEach((node) => node.remove());
  }, [jsonLdKey]);
}

/* =========================================================================
   STRUCTURED DATA BUILDERS
   ========================================================================= */

/** Strips undefined / null / empty values so nothing unverified is emitted. */
function compact<T extends Record<string, unknown>>(input: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out;
}

export function organizationJsonLd(): object {
  const phone = liveContactChannels.find((c) => c.kind === 'phone');
  const email = liveContactChannels.find((c) => c.kind === 'email');

  return compact({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${absoluteUrl('/')}#organization`,
    name: company.legalName,
    url: absoluteUrl('/'),
    // Every field below is emitted only once the client has confirmed it.
    description: company.summary.status === 'confirmed' ? company.summary.value : null,
    foundingDate:
      company.foundedYear.status === 'confirmed' && company.foundedYear.value
        ? String(company.foundedYear.value)
        : null,
    telephone: phone?.value || null,
    email: email?.value || null,
    address: postalAddressJsonLd(),
    openingHoursSpecification: openingHoursJsonLd(),
    sameAs: liveSocialLinks.map((link) => link.href).filter((href): href is string => Boolean(href)),
    logo: null,
  });
}

function postalAddressJsonLd(): object | null {
  if (address.status !== 'confirmed') return null;
  const node = compact({
    '@type': 'PostalAddress',
    streetAddress: address.streetAddress,
    addressLocality: address.locality,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: address.country,
  });
  // '@type' alone is not an address.
  return Object.keys(node).length > 1 ? node : null;
}

function openingHoursJsonLd(): object[] | null {
  const usable = openingHours.filter(
    (entry) => entry.status === 'confirmed' && entry.opens && entry.closes,
  );
  if (usable.length === 0) return null;
  return usable.map((entry) =>
    compact({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    }),
  );
}

export function websiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    url: absoluteUrl('/'),
    name: company.displayName,
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
  };
}

export function serviceJsonLd(service: Service): object | null {
  // A placeholder service must never be described to a search engine.
  if (service.status !== 'confirmed') return null;
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.title,
    provider: { '@id': `${absoluteUrl('/')}#organization` },
  });
}

export function faqJsonLd(items: readonly FaqItem[]): object | null {
  const confirmed = items.filter((item) => item.status === 'confirmed');
  if (confirmed.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: confirmed.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Convenience: drops the nulls so callers can spread straight into `jsonLd`. */
export function graphs(...nodes: (object | null)[]): object[] {
  return nodes.filter((node): node is object => node !== null);
}
