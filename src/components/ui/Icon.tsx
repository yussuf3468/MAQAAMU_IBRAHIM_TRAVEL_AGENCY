import {
  Building2,
  Compass,
  Globe2,
  Plane,
  Route,
  ShieldCheck,
  StickyNote,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ServiceIcon } from '@/content';

/* =========================================================================
   ICONS
   -------------------------------------------------------------------------
   A deliberately small, fixed set. Line icons at 1.25 stroke — quiet enough
   to sit beside a serif heading without competing with it. Icons are always
   decorative here: every one is paired with a real text label, so they are
   marked aria-hidden and never carry meaning on their own.

   Content files reference an icon by name, so nothing in the data layer
   imports a React component.
   ========================================================================= */

const registry: Record<ServiceIcon, LucideIcon> = {
  route: Route,
  plane: Plane,
  passport: StickyNote,
  compass: Compass,
  shield: ShieldCheck,
  building: Building2,
  users: Users,
  globe: Globe2,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.25,
}: {
  name: ServiceIcon;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = registry[name] ?? Compass;
  return <Glyph aria-hidden="true" strokeWidth={strokeWidth} className={cn('size-5', className)} />;
}
