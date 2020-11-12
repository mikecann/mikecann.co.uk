import { Post } from "../pages/api/posts";

export const sortPostsDescending = (posts: Post[]): Post[] =>
  posts.sort((post1, post2) =>
    Date.parse(post1.meta.date ?? "") > Date.parse(post2.meta.date ?? "") ? -1 : 1
  );

export const getPostRootCoverImagePath = ({ meta: { coverImage }, slug }: Post) =>
  coverImage.startsWith("./") ? `/posts/${slug}/${coverImage.replace("./", "")}` : coverImage;

export const getPostYear = (post: Post): number => new Date(post.meta.date).getFullYear();

export type PostsByYear = {
  [year: number]: Post[];
};

export const groupPostsByYear = (posts: Post[]): PostsByYear => {
  let postsByYear: PostsByYear = {};

  for (let post of posts) {
    const year = getPostYear(post);
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  }

  return postsByYear;
};

export const getPostsByYear = (year: string, posts: Post[]) =>
  groupPostsByYear(posts)[parseInt(year)];

export const getAllYears = (posts: Post[]) => Object.keys(groupPostsByYear(posts));
