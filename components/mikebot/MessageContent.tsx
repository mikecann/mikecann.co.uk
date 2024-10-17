import * as React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import Markdown from "react-markdown";

interface Props {
  message: Doc<"messages">;
}

export const MessageContent: React.FC<Props> = ({ message }) => {
  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        padding: "8px",
      }}
    >
      <Markdown>{message.text}</Markdown>
    </div>
  );
};
