import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";

interface Props extends React.ComponentProps<typeof Vertical> {}

export const Modal: React.FC<Props> = ({ style, children, ...rest }) => {
  return (
    <Horizontal
      data-comment="Modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Vertical
        style={{ backgroundColor: "white", padding: 20, borderRadius: 6, ...style }}
        {...rest}
      >
        {children}
      </Vertical>
    </Horizontal>
  );
};
