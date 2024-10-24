import { GetStaticProps } from "next";
import { PostsByYear, groupPostsByYear, sortPosts, sortYears } from "../../utils/posts";
import { ArchiveCard } from "../../components/ArchiveCard";
import { ResponsiveSidebarLayouts } from "../../components/layout/ResponsiveSidebarLayouts";
import Head from "next/head";
import { getAllPostsWithoutContent } from "../../scripts/posts";
import { Grid, Vertical } from "../../components/utils/gls";

type Props = {
  postsByYear: PostsByYear;
};

const Page = ({ postsByYear }: Props) => {
  return (
    <ResponsiveSidebarLayouts>
      <Head>
        <title key="title">archive - mikecann.blog</title>
      </Head>
      <Vertical style={{ marginBottom: 20 }}>
        <Grid width="100%" spacing={20} style={{ alignItems: "start" }}>
          {/* <div
          style={{
            columnWidth: 320,
            columnGap: 15,
            minHeight: 1000,
            //margin: "50px auto"
          }}
        > */}
          {sortYears(Object.keys(postsByYear), "desc").map((year) => (
            <ArchiveCard key={year} title={year} posts={sortPosts(postsByYear[parseInt(year)])} />
          ))}
          {/* </div> */}
        </Grid>
      </Vertical>
    </ResponsiveSidebarLayouts>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { postsByYear: groupPostsByYear(sortPosts(getAllPostsWithoutContent(), "desc")) },
  };
};

export default Page;
