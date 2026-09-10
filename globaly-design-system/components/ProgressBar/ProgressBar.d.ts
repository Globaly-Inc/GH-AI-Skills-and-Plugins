import * as React from 'react';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Fill color. @default "#012E8A" */
  color?: string;
  style?: React.CSSProperties;
}
/** Linear progress track with navy fill, optional label and percentage. */
export function ProgressBar(props: ProgressBarProps): React.ReactElement;
