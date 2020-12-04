import * as React from "react";
import { DesktopSidebarLayout } from "./DesktopSidebarLayout";
import { Media, MediaContextProvider } from "../../utils/media";
import { MobileSidebarLayout } from "./MobileSidebarLayout";
import { TabletSidebarLayout } from "./TabletSidebarLayout";

interface Props {}

export const ResponsiveSidebarLayouts: React.FC<Props> = ({ children }) => {
  return (
    <MediaContextProvider>
      <Media at="xs">
        <MobileSidebarLayout title="Mobile">{children}</MobileSidebarLayout>
      </Media>
      <Media at="sm">
        <TabletSidebarLayout title="Medium">{children}</TabletSidebarLayout>
      </Media>
      <Media greaterThanOrEqual="md">
        <DesktopSidebarLayout title="Desktop">{children}</DesktopSidebarLayout>
      </Media>
    </MediaContextProvider>
  );
};
