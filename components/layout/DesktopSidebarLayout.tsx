import * as React from "react";
import { Horizontal, Vertical } from "../../components/utils/gls";
import Layout from "./Layout";
import { DesktopSidebar } from "../sidebar/DesktopSidebar";

interface Props extends React.ComponentProps<typeof Layout> {}

export const DesktopSidebarLayout: React.FC<Props> = ({ children, ...rest }) => (
  <Layout {...rest}>
    <Horizontal height="100%">
      <DesktopSidebar />

      <Vertical
        width="100%"
        style={{
          padding: "10px 10px 40px 450px",
        }}
        spacing={40}
      >
        {children}
      </Vertical>
    </Horizontal>
  </Layout>
);
