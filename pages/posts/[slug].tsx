import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug, Post } from "../api/posts";
import { ensure } from "../../utils/ensure";
import Image from "next/image";
import { Horizontal, Vertical } from "gls/lib";
import { format } from "date-fns";
import { getPostRootCoverImagePath, getRelativePathForPost } from "../../utils/posts";
import { TopNavbar } from "../../components/navbar/TopNavbar";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Layout from "../../components/layout/Layout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DiscussionEmbed } from "disqus-react";
import { MailchimpSignupForm } from "../../components/mailchimp/MailchimpSignupForm";
import { MailchimpSignupPopup } from "../../components/mailchimp/MailchimpSignupPopup";

type Props = {
  post: Post;
  html: string;
};

const PostPage = ({ post, html }: Props) => {
  const { meta, slug } = post;
  const { title, date } = meta;

  console.log(`rendering post`, meta);

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
            <h3 style={{ textAlign: "center", color: "#aaa" }}>SIGNUP</h3>
            <MailchimpSignupForm />
            <MailchimpSignupPopup />
            <h3 style={{ textAlign: "center", color: "#aaa" }}>COMMENT</h3>
            <DiscussionEmbed
              shortname="devwbfg"
              config={{
                identifier: meta.oldUrl ?? slug,
                title: title,
              }}
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
