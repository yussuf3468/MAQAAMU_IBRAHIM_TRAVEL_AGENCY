import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/lib/hooks';
import { EASE_OUT_EXPO } from '@/lib/motion';

/* =========================================================================
   ACCORDION
   -------------------------------------------------------------------------
   Accessibility notes, because this is the component that usually gets it
   wrong:
     • the trigger is a real <button>, so it works with Space, Enter and
       every assistive technology
     • aria-expanded reflects state; aria-controls points at the panel
     • the panel is removed from the tree when closed, so its links are not
       reachable by Tab while invisible
     • the plus/minus glyph is aria-hidden — the button's own text is the
       accessible name

   `allowMultiple` is false by default: one answer open at a time keeps the
   page short and the scroll position predictable.
   ========================================================================= */

export interface AccordionItemData {
  id: string;
  question: ReactNode;
  answer: ReactNode;
  /** Rendered next to the question, e.g. a placeholder chip. */
  badge?: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  /** Index opened on first render. Use -1 for all closed. */
  defaultOpen?: number;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = -1,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(() => {
    const initial = items[defaultOpen];
    return initial ? [initial.id] : [];
  });
  const reduced = useReducedMotion();

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (allowMultiple) {
        return isOpen ? current.filter((item) => item !== id) : [...current, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  'group flex w-full items-start justify-between gap-6 py-6 text-left',
                  'transition-colors duration-200 hover:text-aegean-800 sm:py-7',
                )}
              >
                <span className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="font-display-text text-[1.0625rem] leading-snug font-medium text-balance sm:text-[1.1875rem]">
                    {item.question}
                  </span>
                  {item.badge}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line',
                    'transition-[transform,border-color,background-color] duration-300',
                    'ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-aegean-500/50',
                    isOpen && 'rotate-45 border-aegean-500/60 bg-aegean-500/10',
                    'motion-reduce:transition-none',
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.42, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <div className="max-w-prose pr-10 pb-7 text-[0.9375rem] leading-relaxed text-ink-700">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
