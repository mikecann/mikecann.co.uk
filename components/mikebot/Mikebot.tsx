"use client";
import * as React from "react";
import { MikebotWidgetView } from "./MikebotWidgetView";
import { MikebotConvexProvider } from "./MikebotConvexProvider";
import { MikebotMeProvider } from "./MikebotMeProvider";
import { iife } from "../../essentials/misc/misc";
import { MikebotMinimizedView } from "./MikebotMinimizedView";
import { onOpenMikebot } from "./signals";

interface Props {}

type View = "minimized" | "widget";

const Mikebot: React.FC<Props> = ({}) => {
  const [view, setView] = React.useState<View>("minimized");

  React.useEffect(() => onOpenMikebot.add(() => setView("widget")), []);

  if (view == "minimized") return <MikebotMinimizedView onOpen={() => setView("widget")} />;

  if (view == "widget")
    return (
      <MikebotConvexProvider>
        <MikebotMeProvider>
          <MikebotWidgetView onMinimize={() => setView("minimized")} />;
        </MikebotMeProvider>
      </MikebotConvexProvider>
    );

  return null;
};

export default Mikebot;
