import { Vertical } from "gls/lib";
import { GetStaticProps } from "next";
import { groupPostsByYear, PostsByYear, sortPosts } from "../utils/posts";
import { ArchiveYears } from "../components/ArchiveYears";
import React from "react";
import { PostsGrid } from "../components/PostsGrid";
import { ResponsiveSidebarLayouts } from "../components/layout/ResponsiveSidebarLayouts";
import { getAllPostsWithoutContent } from "../scripts/posts";

type Props = {
  postsByYear: PostsByYear;
  theOtherYears: string[];
};

const IndexPage = ({ postsByYear, theOtherYears }: Props) => {
  return (
    <ResponsiveSidebarLayouts>
      <PostsGrid postsByYear={postsByYear} />
      <Vertical style={{ marginBottom: 20 }}>
        <h1>Archive</h1>
        <ArchiveYears years={theOtherYears} />
      </Vertical>
    </ResponsiveSidebarLayouts>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = sortPosts(getAllPostsWithoutContent(), "desc");
  const postsByYear = groupPostsByYear(allPosts);

  const firstThreeYears = Object.keys(postsByYear)
    .reverse()
    .slice(0, 3)
    .reduce((accum, curr) => ({ ...accum, [curr]: postsByYear[parseInt(curr)] }), {});

  const theOtherYears = Object.keys(postsByYear)
    .filter((year) => !Object.keys(firstThreeYears).includes(year))
    .reverse();

  return {
    props: { postsByYear: firstThreeYears, theOtherYears },
  };
};

export default IndexPage;
