import { Grid, Vertical } from "gls/lib";
import * as React from "react";
import { Post } from "../pages/api/posts";
import { format } from "date-fns";
import { style } from "typestyle";
import Link from "next/link";

interface Props {
  title: string;
  posts: Post[];
}

const cardStyle = style({
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 6,
  overflow: "hidden",
});

export const ArchiveCard: React.FC<Props> = ({ title, posts }) => {
  return (
    <Vertical className={cardStyle} width={320}>
      <h1 style={{ margin: "0 0 10px" }}>{title}</h1>
      <Vertical spacing={10}>
        {posts.map((post) => (
          <div
            key={post.slug}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              return false;
            }}
          >
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
              {post.meta.title}
            </Link>
            <span style={{ marginLeft: 5, color: "#ccc", fontSize: "0.7em" }}>
              {format(new Date(post.meta.date), "do MMMM")}
            </span>
          </div>
        ))}
      </Vertical>
    </Vertical>
  );
};
