import { Box, Grid, Horizontal, HorizontalSpacer, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { MessageContent } from "./MessageContent";

interface Props {
  message: Doc<"messages">;
}

export const MessageRow: React.FC<Props> = ({ message }) => {
  if (message.speaker == "assistant")
    return (
      <Stretch horizontalAlign="left">
        <Horizontal
          style={{
            padding: "10px",
            background: "#b1f7c2",
            borderRadius: "6px",
            overflow: "hidden",
            maxWidth: "min(400px, 100%)",
          }}
        >
          <MessageContent message={message} />
        </Horizontal>
        <HorizontalSpacer />
      </Stretch>
    );

  return (
    <Stretch horizontalAlign="right">
      <Horizontal
        style={{
          padding: "10px",
          background: "#acbef8",
          borderRadius: "6px",
          overflow: "hidden",
          maxWidth: "min(400px, 100%)",
        }}
      >
        <MessageContent message={message} />
      </Horizontal>
    </Stretch>
  );
};
