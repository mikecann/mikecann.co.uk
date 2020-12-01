import { Grid, Vertical } from "gls/lib";
import { GetStaticProps } from "next";
import { DesktopSidebarLayout } from "../../components/layout/DesktopSidebarLayout";
import { groupPostsByTag, calculateTagsLastUse } from "../../utils/posts";
import { getAllPostsWithoutContent } from "../api/posts/index";
import Link from "next/link";

type Props = {
  tags: { tag: string; postsCount: number }[];
};

const Page = ({ tags }: Props) => {
  return (
    <DesktopSidebarLayout title="Year XXX">
      <Vertical style={{ marginBottom: 20 }}>
        <Grid width="100%" spacing={[5, 20]} style={{ alignItems: "center" }}>
          {tags.map(({ tag, postsCount }) => (
            <Vertical key={tag + postsCount} verticalAlign="center" style={{ fontSize: 0.5 + 0.1 * postsCount + `em` }}>
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </Vertical>
          ))}
        </Grid>
      </Vertical>
    </DesktopSidebarLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsByTag = groupPostsByTag(getAllPostsWithoutContent());
  const tagsByLastUsed = calculateTagsLastUse(postsByTag);
  const tags: Props["tags"] = tagsByLastUsed
    .sort((a, b) => b.lastUse.getTime() - a.lastUse.getTime())
    .map(({ tag, posts }) => ({ tag, postsCount: posts.length }));

  return {
    props: { tags },
  };
};

export default Page;
