import * as React from "react";
import { Vertical } from "gls/lib";

interface Props extends React.ComponentProps<typeof Vertical> {}

export const Background: React.FC<Props> = ({ style, ...rest }) => {
  return (
    <Vertical
      horizontalAlign="center"
      verticalAlign="center"
      style={{
        width: 400,
        height: "100%",
        position: "fixed",
        backgroundImage: "url(/images/sidebar-bg.jpg)",
        color: "#ebebeb",
        textAlign: "center",
        padding: 20,
        ...style,
      }}
      {...rest}
    ></Vertical>
  );
};
