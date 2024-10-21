import * as gls from "gls";
import * as React from "react";

/*
  This is a workaround to get around the fact that gls typescript types seem to conflict with
  the current react typescript types.
*/

const GlsVertical = gls.Vertical as any;
const GlsHorizontal = gls.Horizontal as any;
const GlsGrid = gls.Grid as any;
const GlsStretch = gls.Stretch as any;

export const Vertical = React.forwardRef<HTMLDivElement, gls.VerticalProps>((props, ref) => (
  <GlsVertical ref={ref} {...props} />
));

export const Horizontal = React.forwardRef<HTMLDivElement, gls.HorizontalProps>((props, ref) => (
  <GlsHorizontal ref={ref} {...props} />
));

export const Grid = React.forwardRef<HTMLDivElement, gls.GridProps>((props, ref) => (
  <GlsGrid ref={ref} {...props} />
));

export const Stretch = React.forwardRef<HTMLDivElement, gls.Stretch>((props, ref) => (
  <GlsStretch ref={ref} {...props} />
));
