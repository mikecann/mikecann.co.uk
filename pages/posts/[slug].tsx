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
import { media, style } from "typestyle";
import rehypeRaw from "rehype-raw";

type Props = {
  post: Post;
  html: string;
};

const postContainerClass = style(
  {},
  media({ minWidth: 0, maxWidth: 500 }, { padding: 10 }),
  media({ minWidth: 501 }, { padding: 40 })
);

const PostPage = ({ post, html }: Props) => {
  const { meta, slug } = post;
  const { title, date } = meta;

  return (
    <Layout>
      <Head>
        <title key="title">{String(title)} - mikecann.co.uk</title>
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

      <Vertical width="100%" style={{ position: "relative", backgroundColor: "rgb(250 250 250)" }}>
        <div
          style={{
            width: "100%",
            height: "75vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <Image
            layout="fill"
            className="post-header"
            src={getPostRootCoverImagePath(post)}
            quality={100}
            priority
            alt={`post header image for ${title}`}
          />
          <div
            style={{
              width: `100%`,
              height: 40,
              background:
                "linear-gradient(0deg, rgba(250, 250, 250, 1) 0%, rgba(250,250,250,0) 100%)",
              bottom: 0,
              left: 0,
              position: "absolute",
            }}
          ></div>
        </div>
        <Horizontal width="100%" horizontalAlign="center">
          <Vertical
            className={postContainerClass}
            style={{
              marginTop: `60vh`,
              marginBottom: 40,
              maxWidth: 700,
              width: "100%",
              border: `1px solid #ddd`,
              boxShadow: `rgb(221 221 221 / 15%) 0px 3px 0px 5px`,
              backgroundColor: `white`,
              borderRadius: 6,
              zIndex: 1,
            }}
          >
            <h1 style={{ fontSize: "3em", margin: 0, color: "#555", textAlign: "center" }}>
              {title}
            </h1>
            <Vertical spacing={5} style={{ marginBottom: 10, marginTop: 10, textAlign: "center" }}>
              <div style={{ color: "#bbbbbb" }}>{format(new Date(date), "do MMMM yyyy")}</div>
              <PostTags horizontalAlign="center" tags={post.meta.tags} />
            </Vertical>
            <Horizontal width="100%" horizontalAlign="center">
              <div
                style={{ height: 10, marginTop: 20, borderTop: `1px solid #ddd`, width: `10%` }}
              />
            </Horizontal>
            <ReactMarkdown
              className="markdown-content"
              children={html}
              rehypePlugins={[rehypeRaw]}
              components={{
                // img: (image: any) => {
                //   console.log(`PROPS`, image);
                //   return (
                //     <img src={image.src} alt={image.alt} />
                //     // <div style={{ textAlign: "center" }}>
                //     //   <a href={getRelativePathForPost(post.slug, image.src)}>
                //     //     <img src={getRelativePathForPost(post.slug, image.src)} alt={image.alt} />
                //     //   </a>
                //     // </div>
                //   );
                // },
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      customStyle={{ fontSize: "0.8em", borderRadius: 6 }}
                      children={String(children).replace(/\n$/, "")}
                      style={darcula}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
                // inlineCode: ({ language, value }: any) => {
                //   return (
                //     <code
                //       style={{
                //         padding: "0.2em 0.4em",
                //         margin: "0",
                //         fontSize: "85%",
                //         backgroundColor: "rgb(161, 161, 161)",
                //         borderRadius: 6,
                //         color: "white",
                //       }}
                //     >
                //       {value}
                //     </code>
                //   );
                // },
              }}
              remarkPlugins={[gfm]}
              transformImageUri={(src) => getRelativePathForPost(post.slug, src)}
              transformLinkUri={(href) => getRelativePathForPost(post.slug, href)}
            />

            <div
              style={{
                border: `1px dashed #ddd`,
                marginTop: 40,
                marginBottom: 10,
                padding: `10px 30px`,
                borderRadius: 6,
              }}
            >
              <h3 style={{ textAlign: "center", color: "#aaa" }}>SUBSCRIBE TO POSTS</h3>
              <MailchimpSignupForm />
            </div>

            <MailchimpSignupPopup />

            <div
              style={{
                border: `1px dashed #ddd`,
                marginTop: 40,
                marginBottom: 40,
                borderRadius: 6,
                padding: `10px 30px`,
              }}
            >
              <h3 style={{ textAlign: "center", color: "#aaa" }}>COMMENT</h3>
              <DiscussionEmbed
                shortname="devwbfg"
                config={{
                  identifier: meta.oldUrl ?? slug,
                  url: `https://mikecann.co.uk/posts/${meta.oldUrl ?? slug}`,
                  title: title,
                }}
              />
            </div>
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
