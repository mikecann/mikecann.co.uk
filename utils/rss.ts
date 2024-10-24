import RSS from "rss";
import { PostWithContent } from "../scripts/posts";

const postContentToDescription = (content: string) => {
  const moreIndex = content.indexOf("<!-- more -->");
  if (moreIndex) return content.substring(0, moreIndex) + "...";
  if (content.length > 497) return content.substr(0, 497) + "...";
  return content;
};

export const generateRss = (posts: PostWithContent[]): string => {
  const feed = new RSS({
    title: `Blog - Mike Cann`,
    site_url: `https://mikecann.blog`,
    feed_url: `https://mikecann.blog/rss.xml`,
  });

  for (let {
    slug,
    content,
    meta: { title, date },
  } of posts) {
    feed.item({
      title,
      guid: `https://mikecann.blog/posts/${slug}`,
      url: `https://mikecann.blog/posts/${slug}`,
      date: new Date(date).toUTCString(),
      description: postContentToDescription(content),
      author: `Mike Cann`,
    });
  }

  return feed.xml({ indent: true });
};
