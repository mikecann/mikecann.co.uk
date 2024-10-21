import * as gls from "gls";
import * as React from "react";

export const Vertical: React.FC<gls.VerticalProps> = ({ ...rest }) => {
  return (
    <gls.Vertical onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} {...rest} />
  );
};

export const Horizontal: React.FC<gls.HorizontalProps> = ({ ...rest }) => {
  return (
    <gls.Horizontal onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} {...rest} />
  );
};

export const Grid: React.FC<gls.GridProps> = ({ ...rest }) => {
  return <gls.Grid onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} {...rest} />;
};

export const Stretch: React.FC<gls.Stretch> = ({ ...rest }) => {
  return (
    <gls.Stretch onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} {...rest} />
  );
};
