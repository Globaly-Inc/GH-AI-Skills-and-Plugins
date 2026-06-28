import * as React from 'react';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Fill color. @default "#7F1D1D" */
  color?: string;
  style?: React.CSSProperties;
}
/** Linear progress track with maroon fill, optional label and percentage. */
export function ProgressBar(props: ProgressBarProps): React.ReactElement;
