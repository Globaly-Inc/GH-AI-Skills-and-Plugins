import * as React from 'react';

export interface DrawerProps {
  open?: boolean;
  title?: string;
  footer?: React.ReactNode;
  onClose?: () => void;
  side?: 'left' | 'right';
  /** Panel width in px. @default 380 */
  width?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Slide-over panel anchored to a side, with overlay, header, body, footer. */
export function Drawer(props: DrawerProps): React.ReactElement | null;
