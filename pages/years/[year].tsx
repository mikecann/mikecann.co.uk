import { Grid, Vertical } from "gls/lib";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, Post } from "../api/posts";
import { PostTeaser } from "../../components/PostTeaser";
import { ensure } from "../../utils/ensure";
import { HomeLayout } from "../../components/HomeLayout";
import { getAllYears, getPostsByYear } from "../../utils/posts";
import { ArchiveYears } from "../../components/ArchiveYears";

type Props = {
  year: string;
  posts: Post[];
  years: string[];
};

const Page = ({ year, posts, years }: Props) => {
  return (
    <HomeLayout title="Year XXX">
      <Vertical width="100%">
        <h1>{year}</h1>
        <Grid width="100%" spacing={20} style={{ alignItems: "start" }}>
          {posts.map((post) => (
            <PostTeaser key={post.slug} post={post} />
          ))}
        </Grid>
      </Vertical>
      <Vertical style={{ marginBottom: 20 }}>
        <h1>Archive</h1>
        <ArchiveYears years={years} />
      </Vertical>
    </HomeLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const years = getAllYears(getAllPosts());
  return {
    paths: years.map((year) => ({
      params: {
        year,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = ensure(params);
  const year = ensure(query.year) + "";

  const allPosts = getAllPosts();
  const posts = getPostsByYear(year, allPosts);
  const years = getAllYears(allPosts);

  return {
    props: { posts, year, years },
  };
};

export default Page;
