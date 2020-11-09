import * as React from "react";
import { Grid, Vertical } from "gls/lib";

interface Props {}

export const Sidebar: React.FC<Props> = ({}) => {
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
      }}
      spacing={10}
    >
      <img
        style={{ borderRadius: "50%", animation: "float 6s ease-in-out infinite" }}
        src="/images/me.jpg"
      />
      <div style={{ fontSize: "1.3em" }}>Mike Cann</div>
      <div>A professional software developer that just cant stop tinkering with things</div>
      <Grid></Grid>
    </Vertical>
  );
};
