import * as React from 'react';

export interface PopoverProps {
  /** Clickable trigger element. */
  trigger: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Panel width in px. @default 240 */
  width?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Click-to-open floating panel with arbitrary content. Closes on outside click. */
export function Popover(props: PopoverProps): React.ReactElement;
