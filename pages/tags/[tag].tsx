import { Grid, Vertical } from "gls/lib";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, Post, PostWithContent } from "../api/posts";
import { PostTeaser } from "../../components/PostTeaser";
import { ensure } from "../../utils/ensure";
import { DesktopSidebarLayout } from "../../components/layout/DesktopSidebarLayout";
import {
  getAllYears,
  getPostsByYear,
  groupPostsByTag,
  PostsByTag,
  getAllTags,
  sortPosts,
} from "../../utils/posts";
import { ResponsiveSidebarLayouts } from "../../components/layout/ResponsiveSidebarLayouts";
import { encodeTag } from "../../utils/tags";
import Head from "next/head";

type Props = {
  tag: string;
  posts: PostWithContent[];
};

const Page = ({ tag, posts }: Props) => {
  return (
    <ResponsiveSidebarLayouts>
      <Head>
        <title key="title">{tag} - mikecann.co.uk</title>
      </Head>

      <Vertical width="100%">
        <h1>{tag}</h1>
        <Grid width="100%" spacing={20} style={{ alignItems: "start" }}>
          {posts.map((post) => (
            <PostTeaser key={post.slug} post={post} />
          ))}
        </Grid>
      </Vertical>
    </ResponsiveSidebarLayouts>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags(getAllPosts());
  return {
    paths: tags.map((tag) => ({
      params: {
        tag: encodeTag(tag),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = ensure(params);
  const tag = decodeURIComponent(ensure(query.tag) + "");
  const posts = sortPosts(groupPostsByTag(getAllPosts())[tag], "desc");
  return {
    props: { tag, posts },
  };
};

export default Page;
