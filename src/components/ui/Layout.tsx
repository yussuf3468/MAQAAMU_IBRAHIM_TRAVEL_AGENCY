import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/* =========================================================================
   LAYOUT PRIMITIVES
   Container · Section · Eyebrow · SectionHeading · Rule
   -------------------------------------------------------------------------
   The site's vertical rhythm and horizontal measure live here so that no
   page has to remember a padding value.
   ========================================================================= */

type ContainerWidth = 'prose' | 'content' | 'wide' | 'full';

const widths: Record<ContainerWidth, string> = {
  prose: 'max-w-[44rem]',
  content: 'max-w-[78rem]',
  wide: 'max-w-[92rem]',
  full: 'max-w-none',
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  as?: ElementType;
  children: ReactNode;
}

export function Container({
  width = 'content',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-gutter', widths[width], className)} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------- */

type SectionTone = 'default' | 'sunk' | 'night' | 'none';

const tones: Record<SectionTone, string> = {
  default: 'bg-surface text-ink-900',
  sunk: 'bg-porcelain-100 text-ink-900',
  night: 'bg-ink-950 text-porcelain-100',
  none: '',
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  /** `sm` for sections that sit close to their neighbour. */
  size?: 'sm' | 'md';
  as?: ElementType;
  children: ReactNode;
}

export function Section({
  tone = 'default',
  size = 'md',
  as: Tag = 'section',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        'relative',
        tones[tone],
        size === 'md' ? 'py-section' : 'py-section-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------- */

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  onDark?: boolean;
  /** Draws the short brass rule that precedes the label. */
  rule?: boolean;
}

export function Eyebrow({ children, onDark = false, rule = true, className, ...rest }: EyebrowProps) {
  return (
    <p
      className={cn(
        'eyebrow flex items-center gap-3',
        onDark ? 'text-aegean-300' : 'text-aegean-700',
        className,
      )}
      {...rest}
    >
      {rule && (
        <span
          aria-hidden="true"
          className={cn('h-px w-8 shrink-0', onDark ? 'bg-aegean-300/60' : 'bg-aegean-500/50')}
        />
      )}
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------------- */

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  heading: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  align?: 'left' | 'center';
  /** Rendered on the far side of the heading on wide screens, e.g. a link. */
  aside?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'lg' | 'md' | 'sm';
  className?: string;
}

const headingSizes = {
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
} as const;

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  onDark = false,
  align = 'left',
  aside,
  as: Tag = 'h2',
  size = 'md',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        aside && 'md:flex-row md:items-end md:justify-between md:gap-10',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow && (
          <Eyebrow onDark={onDark} className={cn('mb-5', align === 'center' && 'justify-center')}>
            {eyebrow}
          </Eyebrow>
        )}
        <Tag
          className={cn(
            'font-display-tight',
            headingSizes[size],
            onDark ? 'text-porcelain-50' : 'text-ink-900',
          )}
        >
          {heading}
        </Tag>
        {intro && (
          <p
            className={cn(
              'mt-6 text-lead',
              onDark ? 'text-porcelain-200/80' : 'text-ink-700',
              align === 'center' && 'mx-auto',
            )}
          >
            {intro}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0 md:pb-2">{aside}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export function Rule({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <div
      role="presentation"
      className={cn('h-px w-full', onDark ? 'bg-white/12' : 'bg-line', className)}
    />
  );
}
