import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { join } from "path";
import fs from "fs";
import { DesktopSidebarLayout } from "../components/layout/DesktopSidebarLayout";
import { Vertical } from "gls/lib";

type Props = {
  content: string;
};

const About = ({ content }: Props) => (
  <DesktopSidebarLayout title="Posts">
    <Vertical>
      <h1>About</h1>
      <ReactMarkdown className="page-content" children={content} allowDangerousHtml />
    </Vertical>
  </DesktopSidebarLayout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const absPath = join(process.cwd(), "public/pages/about/index.md");
  const { content } = matter(fs.readFileSync(absPath, "utf8"));
  return {
    props: { content },
  };
};

export default About;
