import * as React from 'react';

export interface TabItem { value: string; label: string; badge?: number | string; disabled?: boolean; }
export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
/** Underline tabs. Active tab uses navy text + 2px navy indicator. */
export function Tabs(props: TabsProps): React.ReactElement;
