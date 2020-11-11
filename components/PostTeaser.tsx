import { Grid, Horizontal, Vertical } from "gls/lib";
import * as React from "react";
import { Post } from "../pages/api/posts";
import { format } from "date-fns";
import Image from "next/image";
import { getPostRootCoverImagePath } from "../utils/posts";
import { style } from "typestyle";
import { IoMdPricetags } from "react-icons/io";
import Link from "next/link";

interface Props {
  post: Post;
}

const imgStyle = style({
  objectFit: "cover",
});

const cardStyle = style({
  cursor: "pointer",
  transition: "all 0.2s ease",
  filter: "grayscale(0.5)",
  $nest: {
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 5px 15px 0px rgba(0, 0, 0, 0.2)",
      filter: "grayscale(0)",
    },
  },
});

export const PostTeaser: React.FC<Props> = ({ post }) => {
  const { meta, slug } = post;
  const { title, date, coverImage, tags } = meta;

  return (
    <Link href="/posts/[slug]" as={`/posts/${slug}`}>
      <Vertical
        className={cardStyle}
        width={300}
        style={{ border: "1px solid #ddd", borderRadius: 6, overflow: "hidden" }}
      >
        <Image
          className={imgStyle}
          src={getPostRootCoverImagePath(post)}
          width={600}
          height={300}
          quality={80}
        />
        <Vertical>
          <Vertical
            spacing={5}
            style={{ borderTop: "1px solid #ddd", padding: "5px 10px 10px 10px", margin: 0 }}
          >
            <div style={{ margin: 0, fontSize: "1.2em", fontWeight: "bold" }}>{title}</div>
            <div style={{ color: "#bbbbbb", fontSize: "0.8em" }}>
              {format(new Date(date), "do MMMM yyyy")}
            </div>
          </Vertical>
          <Grid
            spacing={[5, 5]}
            style={{
              color: "#ddd",
              fontSize: "0.6em",
              borderTop: "1px solid #ddd",
              padding: "0px 5px 5px 5px",
            }}
          >
            {/* <IoMdPricetags /> */}
            {tags.map((t) => (
              <div style={{ padding: 5, backgroundColor: "#eee", borderRadius: 6, color: "#333" }}>
                {t}
              </div>
            ))}
          </Grid>
        </Vertical>
      </Vertical>
    </Link>
  );
};
