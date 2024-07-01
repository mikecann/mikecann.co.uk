import { Grid, Horizontal } from "gls/lib";
import * as React from "react";
import Link from "next/link";
import { style } from "typestyle";

interface Props extends React.ComponentProps<typeof Horizontal> {
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
        ...style,
      }}
      spacing={5}
      {...rest}
    >
      {tags.map((t, i) => (
        <div key={i} className={tagStyles}>
          <div style={{ cursor: "pointer" }} onClick={() => (window.location.href = `/tags/${t}`)}>
            {String(t)}
          </div>
        </div>
      ))}
    </Horizontal>
  );
};
