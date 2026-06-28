import * as React from 'react';

export interface ComboboxOption { value: string; label: string; }
export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}
/** Searchable single-select. Type to filter; selected item is highlighted. */
export function Combobox(props: ComboboxProps): React.ReactElement;
