import * as t from "io-ts";

export const PostMeta = t.intersection([
  t.strict({
    title: t.string,
    tags: t.array(t.string),
    coverImage: t.string,
    date: t.string,
  }),
  t.partial({}),
]);

export interface PostMeta extends t.TypeOf<typeof PostMeta> {}

export const producePostMeta = (overrides: PostMeta & {}): PostMeta =>
  PostMeta.encode({
    ...overrides,
  });

