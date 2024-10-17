import * as React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import Markdown from "react-markdown";
import { style } from "typestyle";
import { Annotation } from "../../convex/schema";

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

const replaceAnnotationsWithLinks = (text: string, annotations: Annotation[] | undefined) => {
  if (!annotations) return text;

  let result = text;
  for (const annotation of annotations) {
    const linkEmoji = "🔗";
    const linkHref =
      annotation.kind === "page_citation" ? `/${annotation.pageId}` : `/posts/${annotation.postId}`;

    result = result.replace(annotation.text, `[${linkEmoji}](${linkHref} "Open in new tab")`);
  }
  return result;
};

export const MessageContent: React.FC<Props> = ({ message }) => {
  const processedText = React.useMemo(
    () => replaceAnnotationsWithLinks(message.text, message.annotations),
    [message.text, message.annotations]
  );

  return (
    <div className={contentStyle}>
      <Markdown
        components={{
          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {processedText}
      </Markdown>
    </div>
  );
};
