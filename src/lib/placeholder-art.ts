import type { ImageTone } from '../content/types';

/* =========================================================================
   PLACEHOLDER ART
   -------------------------------------------------------------------------
   Every image slot on this site is empty until the client supplies their
   photography. Rather than fill those slots with unrelated stock photos —
   which would misrepresent the agency — each one renders a composed
   abstract built from layered CSS gradients.

   Why this approach:
     • It is honest. Nobody mistakes it for a photograph of the business.
     • It costs zero bytes and zero network requests.
     • It is deterministic: a slot always renders the same composition, so
       the site does not shimmer between builds.
     • The palettes are drawn from the brand tokens, so a page of empty
       slots still looks like one designed system.

   It disappears the moment a real `src` is set in src/content/media.ts.
   ========================================================================= */

interface TonePalette {
  base: string;
  layers: [string, string, string];
  /** Whether white text sits comfortably on this tone. */
  dark: boolean;
}

/* Six tones, drawn from the journey this agency actually sells: the Haram
   at night, lamplight on marble, the green of Madinah, and the deep blue
   of a night flight.

   Warmth lives HERE and only here. The interface stays navy and porcelain;
   the imagery carries the gold. That division is what keeps the site from
   looking like every other pilgrimage flyer while still feeling like the
   right place for this journey.

   Each tone is a light source, a mid-tone mass and a grounding shadow —
   the structure of a photograph, not a decorative gradient. All six are
   dark enough for white type to sit on them at full contrast. */
const palettes: Record<ImageTone, TonePalette> = {
  /** First light over the Haram: warm gold breaking on deep navy. */
  dawn: {
    base: '#0d1728',
    layers: ['#f0c27a', '#4a6da8', '#070d1a'],
    dark: true,
  },
  /** Evening: lamplight and minaret gold against an indigo sky. */
  dusk: {
    base: '#0a1024',
    layers: ['#e8b25f', '#3d3f7d', '#07091a'],
    dark: true,
  },
  /** Madinah — the deep green of the dome, lit from below. */
  ocean: {
    base: '#04211f',
    layers: ['#4fc3ad', '#0b6b52', '#031a19'],
    dark: true,
  },
  /** Marble and colonnade at night: cool stone, the quietest of the six. */
  alpine: {
    base: '#0f1721',
    layers: ['#cdd8e4', '#4a6480', '#0a1018'],
    dark: true,
  },
  /** A night flight. Near-black navy with a single warm glow. */
  night: {
    base: '#04070e',
    layers: ['#d9a75a', '#15243c', '#04070e'],
    dark: true,
  },
  /** Gold on green — the two colours the agency's own brochures own. */
  aurora: {
    base: '#05141a',
    layers: ['#e6c98a', '#0e6b62', '#04101a'],
    dark: true,
  },
};

/** Small deterministic hash so a slot's composition never changes. */
function seedFrom(slot: string): number {
  let hash = 2166136261;
  for (let i = 0; i < slot.length; i += 1) {
    hash ^= slot.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function spread(seed: number, index: number, min: number, max: number): number {
  const value = (seed >> (index * 4)) % 1000;
  return Math.round(min + (value / 1000) * (max - min));
}

export interface PlaceholderArt {
  backgroundColor: string;
  backgroundImage: string;
  isDark: boolean;
}

export function placeholderArt(slot: string, tone: ImageTone): PlaceholderArt {
  const palette = palettes[tone];
  const seed = seedFrom(slot);

  const x1 = spread(seed, 0, 12, 60);
  const y1 = spread(seed, 1, 8, 46);
  const x2 = spread(seed, 2, 44, 92);
  const y2 = spread(seed, 3, 30, 78);
  const x3 = spread(seed, 4, 20, 80);
  const angle = spread(seed, 5, 150, 210);

  return {
    backgroundColor: palette.base,
    isDark: palette.dark,
    backgroundImage: [
      // A soft light source — the "sun" of the composition.
      `radial-gradient(88% 74% at ${x1}% ${y1}%, ${palette.layers[0]}bf 0%, ${palette.layers[0]}00 62%)`,
      // A mid-tone mass, offset from the light.
      `radial-gradient(76% 66% at ${x2}% ${y2}%, ${palette.layers[1]}a6 0%, ${palette.layers[1]}00 66%)`,
      // A grounding shadow along the lower edge.
      `radial-gradient(120% 82% at ${x3}% 108%, ${palette.layers[2]}f2 0%, ${palette.layers[2]}00 70%)`,
      // The overall wash that ties it together.
      `linear-gradient(${angle}deg, ${palette.base} 0%, ${palette.layers[2]} 52%, ${palette.base} 100%)`,
    ].join(', '),
  };
}

/**
 * Flat colour used as the LQIP-style backdrop while a real photograph
 * decodes, so an image never pops in against white.
 */
export function toneBaseColor(tone: ImageTone): string {
  return palettes[tone].base;
}
