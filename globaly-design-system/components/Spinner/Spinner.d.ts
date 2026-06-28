import * as React from 'react';

export interface SpinnerProps {
  /** Pixel diameter. @default 24 */
  size?: number;
  /** Arc color. @default "#7F1D1D" */
  color?: string;
  thickness?: number;
  style?: React.CSSProperties;
}
/** Indeterminate loading spinner. */
export function Spinner(props: SpinnerProps): React.ReactElement;
