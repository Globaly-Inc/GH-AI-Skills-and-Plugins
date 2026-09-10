import * as React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
/** Checkbox with optional label. Checked/indeterminate states, navy fill. */
export function Checkbox(props: CheckboxProps): React.ReactElement;
