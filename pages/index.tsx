import { Horizontal, Vertical } from "gls/lib";
import Link from "next/link";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { getAllPosts, Post } from "./api/posts";
import { Sidebar } from "../components/Sidebar";

type Props = {
  allPosts: Post[];
};

const IndexPage = ({ allPosts }: Props) => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Horizontal height="100%">
      <Sidebar />
      <Vertical
        width="100%"
        style={{
          padding: "10px 40px 40px 450px",
        }}
      >
        <h1>Welcome to MikeCann.co.uk 👋</h1>
        {allPosts.map(({ meta: { title }, slug }) => (
          <li key={slug}>
            <Link href="/posts/[slug]" as={`/posts/${slug}`}>
              <a>
                {slug} ::: {title}
              </a>
            </Link>
          </li>
        ))}
      </Vertical>
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
