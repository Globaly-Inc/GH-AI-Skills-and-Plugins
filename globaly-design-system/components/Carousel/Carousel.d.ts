import * as React from 'react';

export interface CarouselProps {
  /** Slide nodes (each fills the frame). */
  slides: React.ReactNode[];
  /** Frame height in px. @default 220 */
  height?: number;
  autoplay?: boolean;
  /** Autoplay interval in ms. @default 4000 */
  interval?: number;
  style?: React.CSSProperties;
}
/** Sliding carousel with prev/next controls and dot indicators. */
export function Carousel(props: CarouselProps): React.ReactElement;
