import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug, Post } from "../api/posts";
import Layout from "../../components/Layout";
import { markdownToHtml } from "../../utils/markdownToHtml";
import { ensure } from "../../utils/ensure";
import Image from "next/image";
import { Horizontal, Vertical } from "gls/lib";
import { style } from "typestyle";
import { format } from "date-fns";
import { getPostRootCoverImagePath } from "../../utils/posts";

type Props = {
  post: Post;
  html: string;
};

const contentStyles = style({
  color: "#5d686f",
  //fontWeight: 400,
  fontSize: "1.1em",
  marginTop: 40,
  marginBottom: 40,
  maxWidth: 700,
  padding: 10,
  width: "100%",
  $nest: {
    img: {
      maxWidth: "100%",
      marginTop: 20,
      marginBottom: 20,
      boxShadow: "0px 0px 10px #bbb !important",
    },
    h1: {
      //fontSize: "1em",
    },
  },
});

const PostPage = ({ post, html }: Props) => {
  const { meta, coverImageSize, slug } = post;
  const { coverImage, title, date } = meta;

  return (
    <Layout title={`post`}>
      <Vertical width="100%">
        <Image
          //layout="fill"
          width={coverImageSize.width}
          height={coverImageSize.height}
          src={getPostRootCoverImagePath(post)}
          quality={100}
          priority
          style={{ objectFit: "cover" }}
          alt="post header image"
        />
        <Horizontal width="100%" horizontalAlign="center">
          <Vertical className={contentStyles}>
            <h1 style={{ fontSize: "3em", margin: 0 }}>{title}</h1>
            <div style={{ marginTop: 10, marginBottom: 20, color: "#bbbbbb" }}>
              {format(new Date(date), "do MMMM yyyy")}
            </div>
            <div style={{ position: "relative" }} dangerouslySetInnerHTML={{ __html: html }} />
          </Vertical>
        </Horizontal>
      </Vertical>
    </Layout>
  );
};

export default PostPage;

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
