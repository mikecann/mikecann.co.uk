import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPosts, Post } from "../api/posts";

type Props = {
  allPosts: Post[];
};

const WithStaticProps = ({ allPosts }: Props) => (
  <Layout title="Posts">
    <h1>Posts..</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>
          <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
            <a>
              {post.slug}: {post.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};

export default WithStaticProps;
