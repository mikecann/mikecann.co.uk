import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { map, pipe } from "ramda";

export interface PostMeta {
  title?: string;
  tags?: string;
  url?: string;
  id?: string;
  categories?: string[];
  coverImage?: string;
  coverMeta?: string;
  date?: string;
}

export type PostContent = string;

export type PostSlug = string;

export interface Post {
  slug: PostSlug;
  meta: PostMeta;
  content: PostContent;
}

export const postsDirectory = join(process.cwd(), "_posts");

export const getPostSlugs = (): PostSlug[] => fs.readdirSync(postsDirectory);

export const sortPostsDescending = (posts: Post[]): Post[] =>
  posts.sort((post1, post2) =>
    Date.parse(post1.meta.date ?? "") > Date.parse(post2.meta.date ?? "") ? -1 : 1
  );

export const getPostBySlug = (slug: PostSlug): Post => {
  const fullPath = join(postsDirectory, slug, `post.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.date) data.date = data.date + "";

  return { slug, meta: data, content };
};

export const getAllPosts = pipe(getPostSlugs, map(getPostBySlug), sortPostsDescending);

