import * as React from 'react';

export interface RadioProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
/** Single radio button with optional label. */
export function Radio(props: RadioProps): React.ReactElement;

export interface RadioGroupOption { value: string; label: string; disabled?: boolean; }
export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: RadioGroupOption[];
  name?: string;
  direction?: 'row' | 'column';
  style?: React.CSSProperties;
}
/** Controlled group of radios. */
export function RadioGroup(props: RadioGroupProps): React.ReactElement;
