import * as React from 'react';

export interface ModalProps {
  open?: boolean;
  title?: string;
  /** Footer node, typically action buttons. */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** Dialog width in px. @default 480 */
  width?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Centered modal dialog with overlay, 16px radius, lg shadow. */
export function Modal(props: ModalProps): React.ReactElement | null;
