import { Box, Grid, Horizontal, HorizontalSpacer, Stretch, Vertical } from "gls/lib";
import * as React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { MessageContent } from "./MessageContent";
import { bouncy } from "ldrs";

interface Props {
  message: Doc<"messages">;
}

bouncy.register();

export const MessageRow: React.FC<Props> = ({ message }) => {
  if (message.speaker == "assistant")
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#b1f7c2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
              aspectRatio: "1 / 1",
            }}
          >
            🤖
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "-8px",
                top: "7px",
                width: "0",
                height: "0",
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "8px solid #b1f7c2",
              }}
            />
            <Horizontal
              style={{
                padding: "10px",
                background: "#b1f7c2",
                borderRadius: "6px",
                overflow: "hidden",
                maxWidth: "min(370px, calc(100% - 40px))",
                minWidth: "40px",
                minHeight: "30px",
                position: "relative",
              }}
            >
              <MessageContent message={message} />
              {message.status.kind == "finished" ||
              message.status.kind == "message_completion_errored" ? null : (
                <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                  <l-bouncy size={20} color="#46b862" />
                </div>
              )}
            </Horizontal>
          </div>
        </div>
        <HorizontalSpacer />
      </div>
    );

  return (
    <Stretch horizontalAlign="right">
      <div style={{ position: "relative" }}>
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
      </div>
    </Stretch>
  );
};
