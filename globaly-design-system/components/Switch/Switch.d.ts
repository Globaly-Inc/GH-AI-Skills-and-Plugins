import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
/** Toggle switch. Navy track when on, sliding white knob. */
export function Switch(props: SwitchProps): React.ReactElement;
