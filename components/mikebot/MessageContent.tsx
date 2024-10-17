import * as React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import Markdown from "react-markdown";
import { style } from "typestyle";

interface Props {
  message: Doc<"messages">;
}

const contentStyle = style({
  $nest: {
    "& p": {
      margin: "0",
    },
    "& ol": {
      marginLeft: "0em",
      paddingLeft: "1.5em",
    },
    "& li": {
      marginBottom: "1em",
    },
  },
});

export const MessageContent: React.FC<Props> = ({ message }) => {
  return (
    <div className={contentStyle}>
      <Markdown>{message.text}</Markdown>
    </div>
  );
};
