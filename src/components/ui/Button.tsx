import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

/* =========================================================================
   BUTTON
   -------------------------------------------------------------------------
   One component, three shapes:
     `to`   → react-router <Link>
     `href` → <a> (external links get rel/target handled here)
     else   → <button>

   VARIANTS
     primary   solid, high contrast. One per view. This is the ask.
     secondary outlined, fills on hover. The alternative action.
     ghost     text with a rule that draws in. Tertiary, inline.
     inverse   for use on photography and night sections.

   SIZES all clear the 44px minimum touch target; `lg` is 56px because the
   hero and mobile CTAs need to be effortless to hit with a thumb.

   Corners are 2px throughout. Editorial, not bubbly — see the design
   direction note in styles/index.css.
   ========================================================================= */

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Set when the button sits on a dark surface. */
  onDark?: boolean;
  fullWidth?: boolean;
  /** Rendered after the label, e.g. an arrow. */
  trailing?: ReactNode;
  leading?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    to?: never;
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    to: string;
    href?: never;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    to?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const base = [
  'group relative inline-flex items-center justify-center gap-2.5',
  'font-sans font-medium tracking-[-0.01em] text-center',
  'rounded-[2px] border transition-[background-color,border-color,color,transform] duration-200',
  'ease-[cubic-bezier(0.16,1,0.3,1)]',
  'disabled:pointer-events-none disabled:opacity-45',
  'active:translate-y-px',
].join(' ');

const sizes: Record<Size, string> = {
  sm: 'h-11 px-5 text-[0.8125rem]',
  md: 'h-12 px-7 text-[0.875rem]',
  lg: 'h-14 px-8 text-[0.9375rem]',
};

function variantClasses(variant: Variant, onDark: boolean): string {
  switch (variant) {
    case 'primary':
      return onDark
        ? 'border-porcelain-50 bg-porcelain-50 text-ink-950 hover:bg-white hover:border-white'
        : 'border-ink-950 bg-ink-950 text-porcelain-50 hover:bg-ink-800 hover:border-ink-800';
    case 'secondary':
      return onDark
        // A 35% border disappears against a dark photograph. 55% reads as a
        // deliberate outline without competing with the primary button.
        ? 'border-white/55 bg-white/[0.06] text-porcelain-50 hover:border-white/80 hover:bg-white/15'
        : 'border-line-strong bg-transparent text-ink-900 hover:border-ink-900 hover:bg-ink-950/[0.04]';
    case 'inverse':
      return 'border-transparent bg-aegean-500 text-white hover:bg-aegean-700';
    case 'ghost':
    default:
      return onDark
        ? 'border-transparent bg-transparent px-0 text-porcelain-50 hover:text-white'
        : 'border-transparent bg-transparent px-0 text-ink-900 hover:text-aegean-700';
  }
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    onDark = false,
    fullWidth = false,
    trailing,
    leading,
    children,
    className,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(
    base,
    sizes[size],
    variantClasses(variant, onDark),
    variant === 'ghost' && 'h-auto py-1',
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {leading}
      <span className={cn(variant === 'ghost' && 'link-underline')}>{children}</span>
      {trailing && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        >
          {trailing}
        </span>
      )}
    </>
  );

  if ('to' in props && props.to) {
    const { to, ...anchorRest } = rest as unknown as {
      to: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, target, rel, ...anchorRest } =
      rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>;
    // External links open in a new tab and always carry noopener, so a
    // third-party page can never reach back into this one via window.opener.
    const isExternal = Boolean(href && /^https?:\/\//i.test(href));
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type, ...buttonRest } = rest as unknown as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? 'button'}
      className={classes}
      {...buttonRest}
    >
      {content}
    </button>
  );
});
