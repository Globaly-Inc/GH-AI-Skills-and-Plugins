import * as React from 'react';

export interface TableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Custom cell renderer: (value, row) => node. */
  render?: (value: any, row: Row) => React.ReactNode;
}
export interface TableProps<Row = any> {
  columns: TableColumn<Row>[];
  data: Row[];
  /** Field used as React key. @default "id" */
  rowKey?: string;
  onRowClick?: (row: Row) => void;
  empty?: React.ReactNode;
  style?: React.CSSProperties;
}
/** Data table with sticky-style header, hover rows, custom cell renderers. */
export function Table(props: TableProps): React.ReactElement;
