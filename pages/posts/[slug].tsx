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
import Head from "next/head";
import { PostTags } from "../../components/PostTags";

type Props = {
  post: Post;
  html: string;
};

const PostPage = ({ post, html }: Props) => {
  const { meta, slug } = post;
  const { title, date } = meta;

  const renderers = {
    image: (image: any) => {
      return (
        <div style={{ textAlign: "center" }}>
          <a href={getRelativePathForPost(post.slug, image.src)}>
            <img src={getRelativePathForPost(post.slug, image.src)} alt={image.alt} />
          </a>
        </div>
      );
    },
    code: ({ language, value }: any) => {
      return (
        <div style={{ fontSize: "0.8em" }}>
          <SyntaxHighlighter
            customStyle={{ borderRadius: 6 }}
            style={darcula}
            language={language}
            children={value}
          />
        </div>
      );
    },
    inlineCode: ({ language, value }: any) => {
      return (
        <code
          style={{
            padding: "0.2em 0.4em",
            margin: "0",
            fontSize: "85%",
            backgroundColor: "rgb(161, 161, 161)",
            borderRadius: 6,
            color: "white",
          }}
        >
          {value}
        </code>
      );
    },
  };

  return (
    <Layout>
      <Head>
        <title key="title">{title} - mikecann.co.uk</title>
        <meta property="og:title" content={`${title} - mikecann.co.uk`} key="og-title" />
        <meta property="og:site_name" content="MikeCann.co.uk" key="og-site_name" />
        <meta property="og:url" content={`https://mikecann.co.uk/posts/${slug}`} key="og-url" />
        <meta
          property="og:image"
          content={`https://mikecann.co.uk` + getPostRootCoverImagePath(post)}
          key="og-image"
        />
      </Head>

      <TopNavbar />

      <Vertical width="100%">
        <div style={{ width: "100%", height: "75vh", position: "relative" }}>
          <Image
            layout="fill"
            className="post-header"
            src={getPostRootCoverImagePath(post)}
            quality={100}
            priority
            alt={`post header image for ${title}`}
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
            <h1 style={{ fontSize: "3em", margin: 0, color: "#555", textAlign: "center" }}>
              {title}
            </h1>
            <Vertical spacing={5} style={{ marginBottom: 10, marginTop: 10, textAlign: "center" }}>
              <div style={{ color: "#bbbbbb" }}>{format(new Date(date), "do MMMM yyyy")}</div>
              <PostTags horizontalAlign="center" tags={post.meta.tags} />
            </Vertical>
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
