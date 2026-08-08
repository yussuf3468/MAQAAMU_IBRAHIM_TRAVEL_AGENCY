import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

/* =========================================================================
   POSTBUILD
   -------------------------------------------------------------------------
   Runs after `vite build` and does three things:

   1. PRERENDERS THE HEAD of every static route into its own HTML file.
      This is a single-page app, so without this step every URL would ship
      the same <title> and description. Google executes JavaScript and
      would eventually see the right ones — but Facebook, WhatsApp,
      LinkedIn and X do not. They read the raw HTML, which is exactly what
      a travel agency's links get pasted into. Each route now serves its
      own title, description, canonical URL and Open Graph tags without
      needing SSR or a framework.

   2. GENERATES sitemap.xml from the same route source the app itself uses
      (src/lib/site-map.ts), so the sitemap cannot drift from the site. A
      module switched off in the content layer disappears from both at once.

   3. GENERATES robots.txt pointing at that sitemap, and a 404.html for
      hosts that use one.

   The route source is TypeScript, so it is bundled with esbuild first —
   which is why site-map.ts is kept free of import.meta.env and of React.
   ========================================================================= */

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dist = join(root, 'dist');
const tempFile = join(root, 'node_modules', '.tmp', 'site-map.build.mjs');

// Mirrors src/content/status.ts: live is the default, draft is opt-in.
const CONTENT_MODE = process.env.VITE_CONTENT_MODE === 'draft' ? 'draft' : 'live';

/** Bundles the shared route source so Node can import it. */
async function loadSiteMap() {
  await mkdir(dirname(tempFile), { recursive: true });
  await build({
    entryPoints: [join(root, 'src', 'lib', 'site-map.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    outfile: tempFile,
    logLevel: 'silent',
  });
  return import(pathToFileURL(tempFile).href);
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Builds the per-route <head> block that replaces the default one. */
function headFor(route, { siteName, absoluteUrl }) {
  const fullTitle =
    route.path === '/' ? `${siteName} — ${route.title}` : `${route.title} — ${siteName}`;
  const canonical = absoluteUrl(route.path);
  const title = escapeHtml(fullTitle);
  const description = escapeHtml(route.description);

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
  ].join('\n    ');
}

function applyHead(shell, headBlock) {
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, '__HEAD_SLOT__')
    .replace(/\n\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace('__HEAD_SLOT__', headBlock);
}

function sitemapXml(routes, absoluteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = routes
    .filter((route) => route.inSitemap)
    .map((route) =>
      [
        '  <url>',
        `    <loc>${absoluteUrl(route.path)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function robotsTxt(absoluteUrl, mode) {
  // A draft build must never be indexed. This is the last line of defence
  // if a preview URL is shared before the content is confirmed.
  if (mode === 'draft') {
    return `# Draft build — content is not yet confirmed by the client.
# Indexing is disabled until VITE_CONTENT_MODE=live is set for the build.
User-agent: *
Disallow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
  }

  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
}

async function main() {
  const siteMap = await loadSiteMap();
  const { buildSiteMap, absoluteUrl, siteName } = siteMap;

  const routes = buildSiteMap(CONTENT_MODE);
  const shell = await readFile(join(dist, 'index.html'), 'utf8');

  let written = 0;

  for (const route of routes) {
    const html = applyHead(shell, headFor(route, { siteName, absoluteUrl }));

    if (route.path === '/') {
      await writeFile(join(dist, 'index.html'), html, 'utf8');
    } else {
      const dir = join(dist, route.path.replace(/^\//, ''));
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'index.html'), html, 'utf8');
    }
    written += 1;
  }

  // 404 page for hosts that serve one (Netlify, GitHub Pages).
  await writeFile(
    join(dist, '404.html'),
    applyHead(
      shell,
      headFor(
        {
          path: '/404',
          title: 'Page not found',
          description: 'The page you were looking for is not here.',
        },
        { siteName, absoluteUrl },
      ),
    ).replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>'),
    'utf8',
  );

  await writeFile(join(dist, 'sitemap.xml'), sitemapXml(routes, absoluteUrl), 'utf8');
  await writeFile(join(dist, 'robots.txt'), robotsTxt(absoluteUrl, CONTENT_MODE), 'utf8');

  await rm(tempFile, { force: true });

  const indexed = routes.filter((route) => route.inSitemap).length;
  console.log(
    `postbuild: ${written} route${written === 1 ? '' : 's'} prerendered, ` +
      `${indexed} in sitemap, content mode "${CONTENT_MODE}".`,
  );
  if (CONTENT_MODE === 'draft') {
    console.log(
      'postbuild: robots.txt disallows indexing because this is a DRAFT build.\n' +
        '           Unset VITE_CONTENT_MODE to produce a production build.',
    );
  }
}

main().catch((error) => {
  console.error('postbuild failed:', error);
  process.exitCode = 1;
});
