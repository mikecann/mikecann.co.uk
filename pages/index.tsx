import { Grid, Horizontal, Vertical } from "gls/lib";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts, Post } from "./api/posts";
import { DesktopSidebar } from "../components/sidebar/DesktopSidebar";
import { PostTeaser } from "../components/PostTeaser";
import { groupPostsByYear, PostsByYear, sortPosts } from "../utils/posts";
import { DesktopSidebarLayout } from "../components/layout/DesktopSidebarLayout";
import { ArchiveYears } from "../components/ArchiveYears";
import { getAllPostsWithoutContent } from "./api/posts/index";
import React from "react";
import { Media, MediaContextProvider } from "../utils/media";
import { MobileSidebarLayout } from "../components/layout/MobileSidebarLayout";
import { PostsGrid } from "../components/PostsGrid";
import { TabletSidebarLayout } from "../components/layout/TabletSidebarLayout";

type Props = {
  postsByYear: PostsByYear;
  theOtherYears: string[];
};

const IndexPage = ({ postsByYear, theOtherYears }: Props) => {
  return (
    <MediaContextProvider>
      <Media at="xs">
        <MobileSidebarLayout title="Mobile">
          <PostsGrid postsByYear={postsByYear} />
          <Vertical style={{ marginBottom: 20 }}>
            <h1>Archive</h1>
            <ArchiveYears years={theOtherYears} />
          </Vertical>
        </MobileSidebarLayout>
      </Media>
      <Media at="sm">
        <TabletSidebarLayout title="Medium">
          <PostsGrid postsByYear={postsByYear} />
          <Vertical style={{ marginBottom: 20 }}>
            <h1>Archive</h1>
            <ArchiveYears years={theOtherYears} />
          </Vertical>
        </TabletSidebarLayout>
      </Media>
      <Media greaterThanOrEqual="md">
        <DesktopSidebarLayout title="Desktop">
          <PostsGrid postsByYear={postsByYear} />
          <Vertical style={{ marginBottom: 20 }}>
            <h1>Archive</h1>
            <ArchiveYears years={theOtherYears} />
          </Vertical>
        </DesktopSidebarLayout>
      </Media>
    </MediaContextProvider>
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
