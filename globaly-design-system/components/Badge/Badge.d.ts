import * as React from 'react';

export type BadgeVariant = 'red' | 'green' | 'blue' | 'yellow' | 'slate' | 'purple' | 'orange';

export interface BadgeProps {
  variant?: BadgeVariant;
  /** Show a leading status dot. */
  dot?: boolean;
  size?: 'xs' | 'sm';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Pill badge. Seven tonal variants. */
export function Badge(props: BadgeProps): React.ReactElement;

export interface StatusBadgeProps {
  /** Status text — mapped to a variant (Active, Pending, In Review, Rejected, Draft…). */
  status: string;
  dot?: boolean;
  style?: React.CSSProperties;
}
/** Badge whose color is derived from a status string. */
export function StatusBadge(props: StatusBadgeProps): React.ReactElement;

export interface TagProps {
  variant?: BadgeVariant;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Rounded-rectangle tag (less round than Badge). */
export function Tag(props: TagProps): React.ReactElement;

export interface ChipProps {
  /** When provided, renders a removable × button. */
  onRemove?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** Bordered chip, optionally removable. */
export function Chip(props: ChipProps): React.ReactElement;
