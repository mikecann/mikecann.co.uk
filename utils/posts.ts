import { Post } from "../pages/api/posts";

export const sortPostsDescending = (posts: Post[]): Post[] =>
  posts.sort((post1, post2) =>
    Date.parse(post1.meta.date ?? "") > Date.parse(post2.meta.date ?? "") ? -1 : 1
  );
