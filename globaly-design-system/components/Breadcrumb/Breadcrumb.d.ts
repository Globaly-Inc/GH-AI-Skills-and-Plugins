import * as React from 'react';

export interface BreadcrumbItem { label: string; href?: string; }
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  style?: React.CSSProperties;
}
/** Breadcrumb trail with chevron separators; last item is the current page. */
export function Breadcrumb(props: BreadcrumbProps): React.ReactElement;
