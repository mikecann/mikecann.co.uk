import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug, Post } from "../api/posts";
import Layout from "../../components/Layout";
import { markdownToHtml } from "../../utils/markdownToHtml";
import { ensure } from "../../utils/ensure";
import { PostBody } from "../../components/PostBody";
import Image from "next/image";

type Props = {
  post: Post;
};

const StaticPropsDetail = ({ post }: Props) => {
  return (
    <Layout title={`post`}>
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt="cover image"
          width={800}
          height={400}
        />
      )}
      <PostBody content={post.content} />
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = ensure(params);
  const slug = ensure(query.slug);

  const post = getPostBySlug(slug + "");

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};
