import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
  /** Size token. @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  /** Leading icon node (inherits text color). */
  icon?: React.ReactNode;
  /** Trailing icon node (inherits text color). */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Globalyapp primary action button. Six variants, five sizes.
 * Icons inherit the button text color via `color: inherit`.
 */
export function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconRight'> {
  /** The icon node to render (square button). */
  icon: React.ReactNode;
}

/** Square icon-only button. Same variants and sizes as Button. */
export function IconButton(props: IconButtonProps): React.ReactElement;
