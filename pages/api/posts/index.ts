import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export type Post = {
  slug?: string;
  title?: string;
  tags?: string;
  url?: string;
  id?: string;
  categories?: string[];
  coverImage?: string;
  coverMeta?: string;
  date?: string;
  content: string;
};

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.date) data.date = data.date + "";

  return { ...data, slug, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) =>
      Date.parse(post1.date ?? "") > Date.parse(post2.date ?? "") ? -1 : 1
    );

  return posts;
}
