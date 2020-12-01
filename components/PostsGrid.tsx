import * as React from "react";
import { Grid, Vertical } from "gls/lib";
import { PostTeaser } from "./PostTeaser";
import { PostsByYear } from "../utils/posts";

interface Props {
  postsByYear: PostsByYear;
}

export const PostsGrid: React.FC<Props> = ({ postsByYear }) => {
  return (
    <>
      {Object.keys(postsByYear)
        .reverse()
        .map((year) => (
          <Vertical key={year} width="100%">
            <h1>{year}</h1>
            <Grid width="100%" spacing={20} style={{ alignItems: "start" }}>
              {postsByYear[parseInt(year)].map((post) => (
                <PostTeaser key={`${year}-${post.slug}`} post={post} />
              ))}
            </Grid>
          </Vertical>
        ))}
    </>
  );
};
