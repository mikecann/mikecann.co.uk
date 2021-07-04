import { Grid } from "gls/lib";
import * as React from "react";
import Link from "next/link";
import { style } from "typestyle";

interface Props {
  tags: string[];
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

export const PostTags: React.FC<Props> = ({ tags }) => {
  if (tags.length == 0) return null;
  return (
    <Grid
      spacing={[5, 5]}
      style={{
        color: "#ddd",
        fontSize: "0.6em",
      }}
    >
      {tags.map((t) => (
        <div key={t} className={tagStyles}>
          <Link href="/tags/[r]" as={`/tags/${t}`}>
            {t}
          </Link>
        </div>
      ))}
    </Grid>
  );
};
