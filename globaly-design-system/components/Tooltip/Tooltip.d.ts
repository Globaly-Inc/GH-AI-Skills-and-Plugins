import * as React from 'react';

export interface TooltipProps {
  /** Tooltip text. */
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
  /** The trigger element. */
  children?: React.ReactNode;
}
/** Dark tooltip shown on hover/focus of its child. */
export function Tooltip(props: TooltipProps): React.ReactElement;
