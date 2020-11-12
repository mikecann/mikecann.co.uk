import { Grid, Vertical } from "gls/lib";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllPosts, Post } from "../api/posts";
import { PostTeaser } from "../../components/PostTeaser";
import { ensure } from "../../utils/ensure";
import { HomeLayout } from "../../components/HomeLayout";
import { getAllYears, getPostsByYear } from "../../utils/posts";
import { ArchiveYears } from "../../components/ArchiveYears";

type Props = {
  years: string[];
};

const Page = ({ years }: Props) => {
  return (
    <HomeLayout title="Year XXX">
      <Vertical style={{ marginBottom: 20 }}>
        <h1>Archive</h1>
        <ArchiveYears years={years} />
      </Vertical>
    </HomeLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: { years: getAllYears(getAllPosts()) },
  };
};

export default Page;
