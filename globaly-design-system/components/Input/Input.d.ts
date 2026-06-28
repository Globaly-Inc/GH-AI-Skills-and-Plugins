import * as React from 'react';

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
export type FieldState = 'default' | 'active' | 'error' | 'success';

export interface InputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  state?: FieldState;
  size?: InputSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}
/** Text input. 4 sizes, default/active/error/success states, optional adornments. */
export function Input(props: InputProps): React.ReactElement;

export interface TextareaProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
  state?: FieldState;
  disabled?: boolean;
  style?: React.CSSProperties;
}
/** Multi-line text input, vertically resizable. */
export function Textarea(props: TextareaProps): React.ReactElement;

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  required?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Label + control + hint/error/success message wrapper. */
export function Field(props: FieldProps): React.ReactElement;

export interface SearchInputProps extends Omit<InputProps, 'leadingIcon' | 'type'> {}
/** Input preset with a leading search glyph. */
export function SearchInput(props: SearchInputProps): React.ReactElement;

export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options?: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
/** Native select styled to match the input system, custom chevron. */
export function Select(props: SelectProps): React.ReactElement;
