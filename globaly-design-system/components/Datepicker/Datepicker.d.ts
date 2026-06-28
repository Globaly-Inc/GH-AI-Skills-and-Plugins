import * as React from 'react';

export interface DatepickerProps {
  /** Selected date (Date or ISO string). */
  value?: Date | string;
  onChange?: (date: Date) => void;
  style?: React.CSSProperties;
}
/** Month calendar. Selected day is maroon; today is ringed. */
export function Datepicker(props: DatepickerProps): React.ReactElement;
