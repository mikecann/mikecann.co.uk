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

type Props = {
  post: Post;
  html: string;
};

// const contentStyles = style({
//   color: "#5d686f",
//   //fontWeight: 400,
//   fontSize: "1.1em",
//   marginTop: 40,
//   marginBottom: 40,
//   maxWidth: 700,
//   padding: 10,
//   width: "100%",
//   $nest: {
//     img: {
//       maxWidth: "100%",
//       marginTop: 20,
//       marginBottom: 20,
//       boxShadow: "0px 0px 10px #bbb !important",
//     },
//     h1: {
//       //fontSize: "1em",
//     },
//   },
// });

const PostPage = ({ post, html }: Props) => {
  const { meta, coverImageSize, slug } = post;
  const { coverImage, title, date } = meta;

  const renderers = {
    image: (image: any) => {
      return (
        <div style={{ textAlign: "center" }}>
          <img src={getRelativePathForPost(post.slug, image.src)} alt={image.alt} />
        </div>
        // <Image
        //   src={getRelativePathForPost(post.slug, image.src)}
        //   alt={image.alt}
        //   layout="fill"
        //   // height="200"
        //   // width="355"
        // />
      );
    },
  };

  return (
    <Layout title={`post`}>
      <TopNavbar />

      <Vertical width="100%">
        <Image
          //layout="fill"
          width={coverImageSize.width}
          height={coverImageSize.height}
          src={getPostRootCoverImagePath(post)}
          quality={100}
          priority
          style={{ objectFit: "cover", width: "100%", height: 200 }}
          alt="post header image"
        />
        <Horizontal width="100%" horizontalAlign="center">
          <Vertical
            style={{
              //fontWeight: 400,
              marginTop: 40,
              marginBottom: 40,
              maxWidth: 700,
              padding: 10,
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
            {/* <div style={{ position: "relative" }} dangerouslySetInnerHTML={{ __html: html }} /> */}
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
      html: post.content, //await markdownToHtml(post.content || ""),
    },
  };
};
