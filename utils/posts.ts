import { Post } from "../pages/api/posts";

export const sortPostsDescending = (posts: Post[]): Post[] =>
  posts.sort((post1, post2) =>
    Date.parse(post1.meta.date ?? "") > Date.parse(post2.meta.date ?? "") ? -1 : 1
  );

export const getHeaderImageRelativePathForPost = ({
  meta: { coverImage, featuredImage },
}: Post) => {
  //if (coverImage) return coverImage;
  //if (featuredImage) return featuredImage;
  return `/images/fallback-post-header.jpg`;
};
