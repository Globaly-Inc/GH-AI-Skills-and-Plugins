import * as React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Used for initials fallback and alt text. */
  name?: string;
  /** Image URL; falls back to initials when absent. */
  src?: string;
  size?: AvatarSize | number;
  status?: 'online' | 'away' | 'offline' | 'busy';
  /** Initials background color. @default "#012E8A" */
  color?: string;
  style?: React.CSSProperties;
}
/** Circular avatar with image or initials and optional status dot. */
export function Avatar(props: AvatarProps): React.ReactElement;

export interface AvatarGroupProps {
  /** Avatar children. */
  max?: number;
  size?: AvatarSize;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Overlapping stack of avatars with a +N overflow chip. */
export function AvatarGroup(props: AvatarGroupProps): React.ReactElement;
