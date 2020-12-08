import { GetStaticProps } from "next";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { join } from "path";
import fs from "fs";
import { Vertical } from "gls/lib";
import { ResponsiveSidebarLayouts } from "../components/layout/ResponsiveSidebarLayouts";

type Props = {
  content: string;
};

const About = ({ content }: Props) => (
  <ResponsiveSidebarLayouts>
    <Vertical>
      <h1>About</h1>
      <ReactMarkdown className="markdown-content" children={content} allowDangerousHtml />
    </Vertical>
  </ResponsiveSidebarLayouts>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const absPath = join(process.cwd(), "public/pages/about/index.md");
  const { content } = matter(fs.readFileSync(absPath, "utf8"));
  return {
    props: { content },
  };
};

export default About;
