import * as React from 'react';

export interface AccordionItem { title: string; content: React.ReactNode; }
export interface AccordionProps {
  items: AccordionItem[];
  /** Allow more than one panel open at once. @default false */
  allowMultiple?: boolean;
  /** Indices open on mount. */
  defaultOpen?: number[];
  style?: React.CSSProperties;
}
/** Bordered accordion with rotating chevron; single or multi-expand. */
export function Accordion(props: AccordionProps): React.ReactElement;
