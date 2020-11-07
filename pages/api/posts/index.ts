import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { map, pipe } from "ramda";



export type PostContent = string;

export type PostSlug = string;

export interface Post {
  absPostPath: string;
  slug: PostSlug;
  meta: PostMeta;
  content: PostContent;
}

export const postsDirectory = join(process.cwd(), "_posts");

export const getPostSlugs = (): PostSlug[] => fs.readdirSync(postsDirectory);

export const getPostBySlug = (slug: PostSlug): Post => {
  const absPostPath = join(postsDirectory, slug, `post.md`);
  const fileContents = fs.readFileSync(absPostPath, "utf8");

  const { data, content } = matter(fileContents);

  // if (data.date) data.date = data.date + "";

  // if (data.coverImage && !data.coverImage.startsWith("http")) {
  //   const size = imageSize(join(postsDirectory, slug, data.coverImage));
  //   console.log("getPostBySlug -> size", size);
  // }

  return { absPostPath, slug, meta: data, content };
};

export const getAllPosts = pipe(getPostSlugs, map(getPostBySlug));
