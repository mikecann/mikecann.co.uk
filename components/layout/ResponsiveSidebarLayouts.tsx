import * as React from "react";
import { DesktopSidebarLayout } from "./DesktopSidebarLayout";
import { Media, MediaContextProvider } from "../../utils/media";
import { MobileSidebarLayout } from "./MobileSidebarLayout";
import { TabletSidebarLayout } from "./TabletSidebarLayout";

interface Props {
  children?: React.ReactNode;
}

export const ResponsiveSidebarLayouts: React.FC<Props> = ({ children }) => {
  return (
    <MediaContextProvider>
      {/* <Media at="xs">
        <MobileSidebarLayout>{children}</MobileSidebarLayout>
      </Media>
      <Media at="sm">
        <TabletSidebarLayout>{children}</TabletSidebarLayout>
      </Media>
      <Media greaterThanOrEqual="md">
        <DesktopSidebarLayout>{children}</DesktopSidebarLayout>
      </Media> */}
      <DesktopSidebarLayout>{children}</DesktopSidebarLayout>
    </MediaContextProvider>
  );
};
