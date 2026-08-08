import { company } from '../content/company';
import { copy } from '../content/copy';
import { modules } from '../content/modules';
import { services } from '../content/services';
import { destinations } from '../content/destinations';
import { travelPackages } from '../content/packages';
import type { ContentRecord } from '../content/types';

/* =========================================================================
   SITE MAP
   -------------------------------------------------------------------------
   The single description of every URL this site serves: what it is called,
   what its <title> and meta description are, and whether it belongs in
   sitemap.xml.

   This module is imported by BOTH the React app and the build script, so
   the navigation, the routes, the sitemap and the prerendered <head> tags
   can never drift apart. That is also why it must stay free of
   `import.meta.env` and of any React import — it has to run in plain Node.
   ========================================================================= */

export type SiteMode = 'draft' | 'live';

/** Re-exported so scripts/postbuild.mjs can build head tags from one source. */
export const siteName = company.displayName;

export interface SiteRoute {
  path: string;
  /** Page title, without the company-name suffix. */
  title: string;
  description: string;
  /** Label used in the header and footer. Absent = not in navigation. */
  navLabel?: string;
  inSitemap: boolean;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

function visible<T extends ContentRecord>(items: readonly T[], mode: SiteMode): T[] {
  return mode === 'draft' ? [...items] : items.filter((i) => i.status === 'confirmed');
}

/** Trims a description to a length search engines will actually display. */
export function clampDescription(input: string, max = 155): string {
  const text = input.replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

const baseDescription =
  'MAQAAMU IBRAHIM TRAVEL AGENCY arranges travel for individuals, families and groups. Talk to a consultant about your journey.';

export function buildSiteMap(mode: SiteMode = 'draft'): SiteRoute[] {
  const routes: SiteRoute[] = [
    {
      path: '/',
      title: 'Home',
      description: baseDescription,
      navLabel: 'Home',
      inSitemap: true,
      priority: 1.0,
      changefreq: 'monthly',
    },
    {
      path: '/about',
      title: 'About',
      description: clampDescription(copy.about.intro),
      navLabel: 'About',
      inSitemap: true,
      priority: 0.7,
      changefreq: 'yearly',
    },
    {
      path: '/services',
      title: 'Services',
      description: clampDescription(copy.services.intro),
      navLabel: 'Services',
      inSitemap: true,
      priority: 0.9,
      changefreq: 'monthly',
    },
  ];

  for (const service of visible(services, mode)) {
    routes.push({
      path: `/services/${service.slug}`,
      title: service.title,
      description: clampDescription(service.summary),
      inSitemap: true,
      priority: 0.7,
      changefreq: 'monthly',
    });
  }

  if (modules.destinations) {
    routes.push({
      path: '/destinations',
      title: 'Destinations',
      description: clampDescription(copy.destinations.intro),
      navLabel: 'Destinations',
      inSitemap: true,
      priority: 0.8,
      changefreq: 'monthly',
    });

    for (const destination of visible(destinations, mode)) {
      routes.push({
        path: `/destinations/${destination.slug}`,
        title: destination.name,
        description: clampDescription(destination.summary),
        inSitemap: true,
        priority: 0.6,
        changefreq: 'monthly',
      });
    }
  }

  if (modules.packages) {
    routes.push({
      path: '/packages',
      title: 'Travel packages',
      description: clampDescription(copy.packages.intro),
      navLabel: 'Packages',
      inSitemap: true,
      priority: 0.7,
      changefreq: 'weekly',
    });

    for (const item of visible(travelPackages, mode)) {
      routes.push({
        path: `/packages/${item.slug}`,
        title: item.name,
        description: clampDescription(item.summary),
        inSitemap: true,
        priority: 0.5,
        changefreq: 'weekly',
      });
    }
  }

  if (modules.faq) {
    routes.push({
      path: '/faq',
      title: 'Frequently asked questions',
      description: clampDescription(copy.faq.intro),
      navLabel: 'FAQ',
      inSitemap: true,
      priority: 0.6,
      changefreq: 'monthly',
    });
  }

  routes.push({
    path: '/contact',
    title: 'Contact',
    description: clampDescription(copy.contact.intro),
    navLabel: 'Contact',
    inSitemap: true,
    priority: 0.9,
    changefreq: 'yearly',
  });

  if (modules.booking) {
    routes.push({
      path: '/booking',
      title: 'Plan your journey',
      description: clampDescription(copy.booking.intro),
      inSitemap: true,
      priority: 0.9,
      changefreq: 'yearly',
    });
  }

  return routes;
}

/** Header / footer navigation, in order. */
export function primaryNav(mode: SiteMode = 'draft'): { to: string; label: string }[] {
  return buildSiteMap(mode)
    .filter((route) => Boolean(route.navLabel) && route.path !== '/')
    .map((route) => ({ to: route.path, label: route.navLabel as string }));
}

export function absoluteUrl(path: string): string {
  const base = company.siteUrl.replace(/\/+$/, '');
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function findRoute(path: string, mode: SiteMode = 'draft'): SiteRoute | undefined {
  return buildSiteMap(mode).find((route) => route.path === path);
}
