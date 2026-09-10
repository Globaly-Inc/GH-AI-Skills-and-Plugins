import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding in px. @default 20 */
  padding?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** White surface, 1px slate border, 12px radius. */
export function Card(props: CardProps): React.ReactElement;

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  /** Accent color for the icon chip. @default "#012E8A" */
  accent?: string;
  style?: React.CSSProperties;
}
/** Metric card: label, big value, change delta, accent icon. */
export function StatCard(props: StatCardProps): React.ReactElement;

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Section title + subtitle with a right-aligned actions slot. */
export function SectionHeader(props: SectionHeaderProps): React.ReactElement;
