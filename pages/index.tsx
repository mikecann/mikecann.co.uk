import { Grid, Horizontal, Vertical } from "gls/lib";
import Link from "next/link";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { getAllPosts, Post } from "./api/posts";
import { Sidebar } from "../components/sidebar/Sidebar";
import { PostTeaser } from "../components/PostTeaser";
import { groupPostsByYear, PostsByYear, sortPosts } from "../utils/posts";
import { HomeLayout } from "../components/HomeLayout";
import { ArchiveYears } from "../components/ArchiveYears";
import { getAllPostsWithoutContent } from "./api/posts/index";

type Props = {
  postsByYear: PostsByYear;
  theOtherYears: string[];
};

const IndexPage = ({ postsByYear, theOtherYears }: Props) => {
  return (
    <HomeLayout title="Home">
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

      <Vertical style={{ marginBottom: 20 }}>
        <h1>Archive</h1>
        <ArchiveYears years={theOtherYears} />
      </Vertical>
    </HomeLayout>
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
