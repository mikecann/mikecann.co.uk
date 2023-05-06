import { generateRss } from "../utils/rss";
import fs from "fs";
import { sortPosts } from "../utils/posts";
import { getAllPosts } from "./posts";

async function bootstrap() {
  const posts = sortPosts(getAllPosts(), "desc");
  const rss = generateRss(posts);
  fs.writeFileSync("./public/rss.xml", rss);
}

bootstrap();
