import { generateRss } from "../utils/rss";
import fs from "fs";
import { sortPosts } from "../utils/posts";
import { getAllPublishablePosts } from "./posts";

async function bootstrap() {
  const posts = sortPosts(getAllPublishablePosts(), "desc");
  const rss = generateRss(posts);
  fs.writeFileSync("./public/rss.xml", rss);
}

bootstrap();
