import { Grid, Horizontal, Vertical } from "gls/lib";
import Link from "next/link";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { getAllPosts, Post } from "./api/posts";
import { Sidebar } from "../components/sidebar/Sidebar";
import { PostTeaser } from "../components/PostTeaser";

type Props = {
  allPosts: Post[];
};

const IndexPage = ({ allPosts }: Props) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Horizontal height="100%">
      <Sidebar />
      <Grid
        width="100%"
        style={{
          padding: "10px 40px 40px 450px",
        }}
        spacing={20}
      >
        {/* TODO: GROUP BY YEARS */}
        {/* <h1>Welcome to MikeCann.co.uk 👋</h1> */}
        {allPosts.slice(0, 500).map((post) => (
          <PostTeaser post={post} />
          // <li key={slug}>
          //   <Link href="/posts/[slug]" as={`/posts/${slug}`}>
          //     <a>
          //       {slug} ::: {title}
          //     </a>
          //   </Link>
          // </li>
        ))}
      </Grid>
    </Horizontal>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = getAllPosts();
  return {
    props: { allPosts },
  };
};

export default IndexPage;
