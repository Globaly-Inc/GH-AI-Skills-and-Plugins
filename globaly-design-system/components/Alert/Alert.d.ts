import * as React from 'react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  /** When provided, renders a dismiss × button. */
  onClose?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Inline message banner. Four semantic variants with leading icon. */
export function Alert(props: AlertProps): React.ReactElement;
