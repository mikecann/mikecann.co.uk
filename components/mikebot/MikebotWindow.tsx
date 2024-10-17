"use client";
import { Box, Grid, Horizontal, Stretch, StretchSpacer, Vertical } from "gls/lib";
import * as React from "react";
import { style } from "typestyle";
import { MessageRow } from "./MessageRow";
import { MessageEntryBox } from "./MessageEntryBox";
import { useMe } from "./MikebotMeProvider";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect } from "react";
import { MessagesList } from "./MessagesList";

interface Props {}

const windowStyle = style({
  border: "1px solid #ddd",
  borderRadius: 6,
  overflow: "hidden",
  background: "rgba(255,255,255,0.8)",
  position: "fixed",
  right: "10px",
  bottom: "10px",
  width: "320px",
  height: "400px",
});

const currentThreadIdStorageKey = "mikebot_current_thread_id";

export const MikebotWindow: React.FC<Props> = () => {
  const [currentThreadId, setCurrentThreadId] = React.useState<Id<"threads"> | null>(
    () => localStorage[currentThreadIdStorageKey]
  );
  const me = useMe();

  const createThread = useMutation(api.threads.createThreadForUser);

  const thread = useQuery(
    api.threads.findThreadForUser,
    currentThreadId && me ? { threadId: currentThreadId, userId: me._id } : "skip"
  );

  useEffect(() => {
    if (!me) return;
    if (currentThreadId) return;
    createThread({ userId: me._id })
      .then((id) => {
        localStorage[currentThreadIdStorageKey] = id;
        setCurrentThreadId(id);
      })
      .catch(console.error);
  }, [currentThreadId, me]);

  if (!me) return null;
  if (!thread) return null;

  return (
    <Vertical className={windowStyle}>
      <Horizontal verticalAlign="center" style={{ height: "40px", background: "#ddd" }}>
        Mikebot
      </Horizontal>
      <Stretch verticalAlign="bottom" padding="8px">
        <MessagesList threadId={thread._id} userId={me._id} />
      </Stretch>
      <MessageEntryBox userId={me._id} threadId={thread._id} />
    </Vertical>
  );
};
