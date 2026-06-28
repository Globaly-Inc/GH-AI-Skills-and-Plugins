import * as React from 'react';

export interface AuthCodeProps {
  /** Number of digit boxes. @default 6 */
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  disabled?: boolean;
  error?: boolean;
  style?: React.CSSProperties;
}
/** Segmented one-time-code input with auto-advance and backspace nav. */
export function AuthCode(props: AuthCodeProps): React.ReactElement;
