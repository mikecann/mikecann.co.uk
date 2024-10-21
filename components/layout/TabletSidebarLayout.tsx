import * as React from "react";
import { Horizontal, Vertical } from "../../components/utils/gls";
import Layout from "./Layout";
import { MobileSidebar } from "../sidebar/MobileSidebar";
import { TabletSidebar } from "../sidebar/TabletSidebar";

interface Props extends React.ComponentProps<typeof Layout> {}

export const TabletSidebarLayout: React.FC<Props> = ({ children, ...rest }) => (
  <Layout {...rest}>
    <Horizontal height="100%">
      <TabletSidebar />

      <Vertical
        width="100%"
        style={{
          padding: "10px 0px 40px 240px",
        }}
        spacing={40}
      >
        {children}
      </Vertical>
    </Horizontal>
  </Layout>
);
