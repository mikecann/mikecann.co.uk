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
import { useQueryWithStatus } from "./helpers";

interface Props {}

const windowStyle = style({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ddd",
  borderRadius: 6,
  overflow: "hidden",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(8px)",
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

  const threadQuery = useQueryWithStatus(
    api.threads.findThreadForUser,
    currentThreadId && me ? { threadId: currentThreadId, userId: me._id } : "skip"
  );

  useEffect(() => {
    if (!me) return;

    if (currentThreadId) {
      if (threadQuery.data) return;
      if (threadQuery.status == "pending") return;
      setCurrentThreadId(null);
      return;
    }

    createThread({ userId: me._id })
      .then((id) => {
        localStorage[currentThreadIdStorageKey] = id;
        setCurrentThreadId(id);
      })
      .catch(console.error);
  }, [currentThreadId, me, threadQuery.data?._id, threadQuery.status]);

  if (!me) return null;
  if (!threadQuery.data) return null;

  return (
    <div className={windowStyle}>
      <div
        style={{
          height: "40px",
          background: "#ddd",
          flexShrink: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        <div>Mikebot</div>
        <button
          onClick={() => {
            if (!confirm("Are you sure you want to clear this thread?")) return;
            localStorage.removeItem(currentThreadIdStorageKey);
            setCurrentThreadId(null);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            padding: "5px",
          }}
          aria-label="Delete thread"
        >
          🗑️
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          borderBottom: "1px solid #eee",
        }}
      >
        <MessagesList threadId={threadQuery.data._id} userId={me._id} />
      </div>
      <MessageEntryBox userId={me._id} threadId={threadQuery.data._id} />
    </div>
  );
};
