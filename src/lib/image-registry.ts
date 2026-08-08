/* =========================================================================
   IMAGE REGISTRY
   -------------------------------------------------------------------------
   DROP A FILE IN, AND IT APPEARS. NO CODE CHANGE REQUIRED.

   Save a photograph into src/assets/images/ named after the slot it fills:

       src/assets/images/home.hero.jpg          → the homepage hero
       src/assets/images/service.umrah.jpg      → the Umrah service page
       src/assets/images/destination.makkah.jpg → the Makkah page

   Vite picks it up at build time, hashes it, and the matching slot switches
   from the composed abstract to the real photograph automatically.

   The full list of slot names is in src/assets/images/README.md, and the
   slots themselves are declared in src/content/media.ts.

   WHY src/assets/ AND NOT public/
   Files in public/ are copied verbatim and cannot be enumerated, so a
   missing photograph would mean a 404 in the console for every visitor.
   Globbing src/assets/ is resolved at build time: a slot with no file
   simply never asks for one, and the files that do exist get content
   hashes and long-lived cache headers for free.

   An explicit `src` in media.ts always wins over this lookup, so a photo
   can still be pointed at a CDN or at /public when there is a reason to.
   ========================================================================= */

const files = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const registry = new Map<string, string>();

for (const [path, url] of Object.entries(files)) {
  const filename = path.split('/').pop();
  if (!filename) continue;
  // 'home.hero.jpg' → 'home.hero'. Only the final extension is stripped,
  // because slot names contain dots themselves.
  const slot = filename.replace(/\.[^.]+$/, '');
  registry.set(slot, url);
}

/** Returns the photograph for a slot, or null if none has been supplied. */
export function resolveImage(slot: string): string | null {
  return registry.get(slot) ?? null;
}

/** Every slot that currently has a photograph. Used by the content report. */
export function suppliedSlots(): string[] {
  return [...registry.keys()].sort();
}
