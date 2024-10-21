import * as React from "react";
import Link from "next/link";
import { style } from "typestyle";
import { randomNiceColor } from "./utils/colors";
import { HorizontalProps } from "gls";
import { Horizontal } from "./utils/gls";

interface Props extends HorizontalProps {
  tags: string[];
  style?: React.CSSProperties;
}

const tagStyles = style({
  padding: 5,
  backgroundColor: "#eee",
  borderRadius: 6,
  color: "#333",
  $nest: {
    "&:hover": {
      backgroundColor: "#ddd",
    },
    a: {
      color: "#666",
      $nest: {
        "&:hover": {
          color: "#222",
        },
      },
    },
  },
});

export const PostTags: React.FC<Props> = ({ tags, style, ...rest }) => {
  if (tags.length == 0) return null;
  return (
    <Horizontal
      style={{
        color: "#ddd",
        fontSize: "0.6em",
        flexWrap: "wrap",
        marginBottom: "-0.5em",
        ...style,
      }}
      spacing={5}
      {...rest}
    >
      {tags.map((t, i) => (
        <div
          key={i}
          className={tagStyles}
          style={{ backgroundColor: randomNiceColor(t), marginBottom: "0.5em" }}
        >
          <div style={{ cursor: "pointer" }} onClick={() => (window.location.href = `/tags/${t}`)}>
            {String(t)}
          </div>
        </div>
      ))}
    </Horizontal>
  );
};
