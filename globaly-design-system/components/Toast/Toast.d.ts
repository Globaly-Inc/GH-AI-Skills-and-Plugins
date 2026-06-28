import * as React from 'react';

export interface ToastProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
/** Light elevated toast with semantic icon, title, message, optional action. */
export function Toast(props: ToastProps): React.ReactElement;

export interface SnackbarProps {
  message: string;
  /** Action click handler. */
  onAction?: () => void;
  actionLabel?: string;
  action?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}
/** Dark snackbar with a single inline action (e.g. Undo). */
export function Snackbar(props: SnackbarProps): React.ReactElement;
