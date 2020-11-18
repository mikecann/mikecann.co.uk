import { Grid, Vertical } from "gls/lib";
import { GetStaticProps } from "next";
import { HomeLayout } from "../../components/HomeLayout";
import { PostsByYear, groupPostsByYear, sortPosts, sortYears } from "../../utils/posts";
import { ArchiveCard } from "../../components/ArchiveCard";
import { getAllPostsWithoutContent } from "../api/posts/index";

type Props = {
  postsByYear: PostsByYear;
};

const Page = ({ postsByYear }: Props) => {
  return (
    <HomeLayout title="Year XXX">
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
    </HomeLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { postsByYear: groupPostsByYear(getAllPostsWithoutContent()) },
  };
};

export default Page;
