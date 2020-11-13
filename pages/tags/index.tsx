import { Grid, Vertical } from "gls/lib";
import { GetStaticProps } from "next";
import { getAllPosts } from "../api/posts";
import { HomeLayout } from "../../components/HomeLayout";
import {
  PostsByYear,
  groupPostsByYear,
  sortPosts,
  sortYears,
  groupPostsByTag,
  PostsByTag,
} from "../../utils/posts";
import { ArchiveCard } from "../../components/ArchiveCard";
import { getAllPostsWithoutContent } from "../api/posts/index";

type Props = {
  postsByTag: PostsByTag;
};

const Page = ({ postsByTag }: Props) => {
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
          {Object.keys(postsByTag).map((tag) => (
            <ArchiveCard title={tag} posts={sortPosts(postsByTag[tag])} />
          ))}
          {/* </div> */}
        </Grid>
      </Vertical>
    </HomeLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postsByTag = groupPostsByTag(getAllPostsWithoutContent());
  return {
    props: { postsByTag },
  };
};

export default Page;
