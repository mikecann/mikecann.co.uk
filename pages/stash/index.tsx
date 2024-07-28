import { Grid, Vertical } from "gls/lib";
import { GetStaticProps } from "next";
import { groupPostsByTag, calculateTagsLastUse } from "../../utils/posts";
import Link from "next/link";
import { ResponsiveSidebarLayouts } from "../../components/layout/ResponsiveSidebarLayouts";
import Head from "next/head";
import { getAllPostsWithoutContent } from "../../scripts/posts";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo } from "react";
import { Items } from "./_components/Items";

type Props = {
  tags: { tag: string; postsCount: number }[];
};

const Page = ({ tags }: Props) => {
  const client = useMemo(
    () =>
      new ConvexReactClient(
        process.env.NODE_ENV == "development"
          ? "https://clear-rabbit-84.convex.cloud"
          : "https://festive-sparrow-314.convex.cloud"
      ),
    []
  );
  return (
    <ConvexProvider client={client}>
      <ResponsiveSidebarLayouts>
        <Head>
          <title key="title">stash - mikecann.co.uk</title>
        </Head>
        <Vertical style={{ marginBottom: 20 }}>
          <h1 style={{ marginBottom: "0px" }}>My Stash</h1>
          <p>
            Articles that I have been reading lately.. This is part of my <a>StashIt</a> project.
          </p>
          <Items />
        </Vertical>
      </ResponsiveSidebarLayouts>
    </ConvexProvider>
  );
};

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const postsByTag = groupPostsByTag(getAllPostsWithoutContent());
//   const tagsByLastUsed = calculateTagsLastUse(postsByTag);

//   const tags: Props["tags"] = tagsByLastUsed
//     .sort((a, b) => b.lastUse.getTime() - a.lastUse.getTime())
//     .map(({ tag, posts }) => ({ tag, postsCount: posts.length }));

//   return {
//     props: { tags },
//   };
// };

export default Page;
