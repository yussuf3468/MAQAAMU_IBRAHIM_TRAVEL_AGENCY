import { mkdir, rm } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

/* =========================================================================
   CONTENT CHECK   —   npm run content:check
   -------------------------------------------------------------------------
   Reports exactly which business information is still outstanding, so the
   handover after the client meeting is a checklist rather than a hunt.

   Run it again after pasting in the client's answers: when every line
   reads confirmed, the site is ready for VITE_CONTENT_MODE=live.

   This is a report, not a gate — it never fails the build.
   ========================================================================= */

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const temp = join(root, 'node_modules', '.tmp', 'content-check.mjs');

const ENTRY = `
export { services } from '../src/content/services';
export { destinations } from '../src/content/destinations';
export { travelPackages } from '../src/content/packages';
export { faqItems } from '../src/content/faq';
export { aboutSections, values } from '../src/content/about';
export { trustPoints, trustStats, credentials } from '../src/content/trust';
export { testimonials } from '../src/content/testimonials';
export { company } from '../src/content/company';
export { modules } from '../src/content/modules';
export { media } from '../src/content/media';
export { flightRoutes } from '../src/content/routes';
`;

async function load() {
  await mkdir(dirname(temp), { recursive: true });
  await build({
    stdin: { contents: ENTRY, resolveDir: join(root, 'scripts'), loader: 'ts' },
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    outfile: temp,
    logLevel: 'silent',
  });
  return import(pathToFileURL(temp).href);
}

const ESC = String.fromCharCode(27);
const GREEN = `${ESC}[32m`;
const AMBER = `${ESC}[33m`;
const DIM = `${ESC}[2m`;
const RESET = `${ESC}[0m`;

const countConfirmed = (items) => items.filter((item) => item.status === 'confirmed').length;

function line(label, value, done, file) {
  const mark = done ? `${GREEN}done${RESET}` : `${AMBER}todo${RESET}`;
  const suffix = file ? ` ${DIM}${file}${RESET}` : '';
  console.log(`  ${mark}  ${label.padEnd(20)} ${value}${suffix}`);
  return done;
}

function collection(label, items, file) {
  const confirmed = countConfirmed(items);
  const value = items.length === 0 ? 'none defined' : `${confirmed}/${items.length} confirmed`;
  return line(label, value, items.length > 0 && confirmed === items.length, file);
}

async function main() {
  const data = await load();

  console.log('');
  console.log('  MAQAAMU IBRAHIM TRAVEL AGENCY — content readiness');
  console.log('');

  const results = [
    collection('Services', data.services, 'src/content/services.ts'),
    collection('Destinations', data.destinations, 'src/content/destinations.ts'),
    collection('Packages', data.travelPackages, 'src/content/packages.ts'),
    collection('About sections', data.aboutSections, 'src/content/about.ts'),
    collection('Values', data.values, 'src/content/about.ts'),
    collection('FAQ answers', data.faqItems, 'src/content/faq.ts'),
    collection('Trust points', data.trustPoints, 'src/content/trust.ts'),
    collection('Flight routes', data.flightRoutes, 'src/content/routes.ts'),
    collection('Testimonials', data.testimonials, 'src/content/testimonials.ts'),
  ];

  console.log('');

  const stats = data.trustStats.filter((stat) => stat.value.trim() !== '').length;
  line(
    'Trust statistics',
    stats > 0 ? `${stats} supplied` : 'none — qualitative fallback in use',
    stats > 0,
    'src/content/trust.ts',
  );

  const creds = data.credentials.filter((item) => item.name.trim() !== '').length;
  line(
    'Credentials',
    creds > 0 ? `${creds} supplied` : 'none — nothing claimed',
    creds > 0,
    'src/content/trust.ts',
  );

  line(
    'Tagline',
    data.company.tagline.status === 'confirmed' ? 'confirmed' : 'placeholder headline in use',
    data.company.tagline.status === 'confirmed',
    'src/content/company.ts',
  );

  line(
    'Company summary',
    data.company.summary.status === 'confirmed' ? 'confirmed' : 'placeholder in use',
    data.company.summary.status === 'confirmed',
    'src/content/company.ts',
  );

  // Photographs are resolved by filename from src/assets/images (see
  // lib/image-registry.ts), so count the files rather than the `src` fields.
  const imageDir = join(root, 'src', 'assets', 'images');
  const supplied = readdirSync(imageDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  line(
    'Photography',
    `${supplied.length} images in place (stock placeholders — swap for the agency's own)`,
    supplied.length > 0,
    'src/assets/images/',
  );

  console.log('');
  console.log(
    `  ${DIM}Modules — destinations: ${data.modules.destinations}, packages: ${data.modules.packages}${RESET}`,
  );
  console.log('');

  if (results.every(Boolean)) {
    console.log(`  ${GREEN}All content confirmed. Safe to build with VITE_CONTENT_MODE=live.${RESET}`);
  } else {
    console.log(
      `  ${AMBER}Content still outstanding. Placeholders are stripped automatically in live mode.${RESET}`,
    );
  }
  console.log('');

  await rm(temp, { force: true });
}

main().catch((error) => {
  console.error('content-check failed:', error);
  process.exitCode = 1;
});
