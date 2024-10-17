"use client";
import * as React from "react";
import { MikebotWindow } from "./MikebotWindow";
import { MikebotConvexProvider } from "./MikebotConvexProvider";
import { MikebotMeProvider } from "./MikebotMeProvider";

interface Props {}

const Mikebot: React.FC<Props> = ({}) => {
  return (
    // Note, we really should only do this once the user opens the window to prevent creating a user on every page load
    <MikebotConvexProvider>
      <MikebotMeProvider>
        <MikebotWindow />
      </MikebotMeProvider>
    </MikebotConvexProvider>
  );
};

export default Mikebot;
