import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug, Post } from "../api/posts";
import Layout from "../../components/Layout";
import { markdownToHtml } from "../../utils/markdownToHtml";
import { ensure } from "../../utils/ensure";
import Image from "next/image";
import { Horizontal, Vertical } from "gls/lib";
import { style } from "typestyle";

type Props = {
  post: Post;
  html: string;
};

const contentStyles = style({
  color: "#5d686f",
  //fontWeight: 400,
  fontSize: "1.3rem",
  fontFamily:
    "Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
  marginTop: 40,
  marginBottom: 40,
  $nest: {
    img: {
      maxWidth: "100%",
      boxShadow: "0px 0px 10px #bbb !important",
    },
  },
});

const StaticPropsDetail = ({
  post: {
    meta: { coverImage },
  },
  html,
}: Props) => {
  return (
    <Layout title={`post`}>
      <Vertical>
        {coverImage && <Image src={coverImage} alt="cover image" width={800} height={400} />}
      </Vertical>
      <Horizontal width="100%" horizontalAlign="center">
        <div
          className={contentStyles}
          style={{ width: 500 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Horizontal>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = ensure(params);
  const slug = ensure(query.slug) + "";
  const post = getPostBySlug(slug);

  return {
    props: {
      post,
      html: await markdownToHtml(post.content || ""),
    },
  };
};
