import * as React from "react";
import { Horizontal, Vertical } from "gls/lib";
import Layout from "./Layout";
import { Sidebar } from "./sidebar/Sidebar";

interface Props extends React.ComponentProps<typeof Layout> {}

export const HomeLayout: React.FC<Props> = ({ children, ...rest }) => (
  <Layout {...rest}>
    <Horizontal height="100%">
      <Sidebar />

      <Vertical
        width="100%"
        style={{
          padding: "10px 40px 40px 450px",
        }}
        spacing={40}
      >
        {children}
      </Vertical>
    </Horizontal>
  </Layout>
);
