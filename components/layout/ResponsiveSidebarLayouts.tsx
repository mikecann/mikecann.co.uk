import * as React from "react";
import { DesktopSidebarLayout } from "./DesktopSidebarLayout";
import { Media, MediaContextProvider } from "../../utils/media";
import { MobileSidebarLayout } from "./MobileSidebarLayout";
import { TabletSidebarLayout } from "./TabletSidebarLayout";
import { style } from "typestyle";

interface Props {
  children?: React.ReactNode;
}

const desktopClassName = style({
  display: "none",
  $nest: {
    "@media (min-width: 1000px)": {
      display: `unset`,
    },
  },
});

const tabletClassName = style({
  display: "none",
  $nest: {
    "@media (min-width: 770px) and (max-width: 999px)": {
      display: `unset`,
    },
  },
});

const mobileClassName = style({
  display: "none",
  $nest: {
    "@media (max-width: 769px)": {
      display: `unset`,
    },
  },
});

export const ResponsiveSidebarLayouts: React.FC<Props> = ({ children }) => {
  return (
    <MediaContextProvider>
      <div className={mobileClassName}>
        <MobileSidebarLayout>{children}</MobileSidebarLayout>
      </div>
      <div className={tabletClassName}>
        <TabletSidebarLayout>{children}</TabletSidebarLayout>
      </div>
      <div className={desktopClassName}>
        <DesktopSidebarLayout>{children}</DesktopSidebarLayout>
      </div>
    </MediaContextProvider>
  );
};
