import * as React from 'react';

export interface SegmentOption { value: string; label: string; }
export interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
/** Pill segmented control. Active segment is a raised white card with navy text. */
export function SegmentedControl(props: SegmentedControlProps): React.ReactElement;
