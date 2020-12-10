import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug, Post } from "../api/posts";
import { markdownToHtml } from "../../utils/markdownToHtml";
import { ensure } from "../../utils/ensure";
import Image from "next/image";
import { Horizontal, Vertical } from "gls/lib";
import { style } from "typestyle";
import { format } from "date-fns";
import { getPostRootCoverImagePath, getRelativePathForPost } from "../../utils/posts";
import { useScrollYPosition } from "react-use-scroll-position";
import { TopNavbar } from "../../components/navbar/TopNavbar";
import { SearchModal } from "../../components/searchModal/SearchModal";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Layout from "../../components/layout/Layout";
import { useWindowSize } from "../../utils/useWindowSize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  post: Post;
  html: string;
};

const PostPage = ({ post, html }: Props) => {
  const { meta, coverImageSize, slug } = post;
  const { coverImage, title, date } = meta;

  const renderers = {
    image: (image: any) => {
      return (
        <div style={{ textAlign: "center" }}>
          <img src={getRelativePathForPost(post.slug, image.src)} alt={image.alt} />
        </div>
      );
    },
    code: ({ language, value }: any) => {
      return (
        <div style={{ fontSize: "0.8em" }}>
          <SyntaxHighlighter style={darcula} language={language} children={value} />
        </div>
      );
    },
  };

  return (
    <Layout title={`post`}>
      <TopNavbar />

      <Vertical width="100%">
        <div style={{ width: "100%", height: "75vh", position: "relative" }}>
          <Image
            layout="fill"
            className="post-header"
            src={getPostRootCoverImagePath(post)}
            quality={100}
            priority
            alt="post header image"
          />
        </div>
        <Horizontal width="100%" horizontalAlign="center">
          <Vertical
            style={{
              marginTop: 40,
              marginBottom: 40,
              maxWidth: 700,
              padding: 20,
              width: "100%",
            }}
          >
            <h1 style={{ fontSize: "3em", margin: 0, color: "#555" }}>{title}</h1>
            <div style={{ marginTop: 10, marginBottom: 20, color: "#bbbbbb" }}>
              {format(new Date(date), "do MMMM yyyy")}
            </div>
            <ReactMarkdown
              className="markdown-content"
              children={html}
              renderers={renderers}
              allowDangerousHtml
              plugins={[gfm]}
            />
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
      html: post.content,
    },
  };
};
