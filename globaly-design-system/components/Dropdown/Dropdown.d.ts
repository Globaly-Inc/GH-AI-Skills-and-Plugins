import * as React from 'react';

export interface DropdownItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  /** Render a separator line instead of an item. */
  divider?: boolean;
}
export interface DropdownProps {
  /** The clickable trigger element. */
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  style?: React.CSSProperties;
}
/** Click-to-open menu anchored to a trigger. Closes on outside click. */
export function Dropdown(props: DropdownProps): React.ReactElement;
