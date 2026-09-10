import * as React from 'react';

export interface PaginationProps {
  page?: number;
  total?: number;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}
/** Page navigation with prev/next and truncated page list. Active page is navy. */
export function Pagination(props: PaginationProps): React.ReactElement;
