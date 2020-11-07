import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { producePostMeta } from "../pages/api/posts/PostMeta";

const postsDirectory = join(process.cwd(), "_posts3");

const moveMDToOwnDirs = () => {
  for (let filename of fs.readdirSync(postsDirectory)) {
    const filePath = join(postsDirectory, filename);
    const stats = fs.lstatSync(filePath);
    if (stats.isDirectory()) continue;

    const slug = filename.replace(/\.md$/, "");

    const dirPath = join(postsDirectory, slug);
    fs.mkdirSync(dirPath);

    fs.copyFileSync(filePath, join(dirPath, "post.md"));

    fs.unlinkSync(filePath);
  }
};

const renameMDsInOwnDir = () => {
  const renameMDToPostInDir = (dirPath: string) => {
    for (let filename of fs.readdirSync(dirPath)) {
      if (!filename.endsWith("md")) continue;
      fs.renameSync(join(dirPath, filename), join(dirPath, "post.md"));
    }
  };

  for (let filename of fs.readdirSync(postsDirectory)) {
    const filePath = join(postsDirectory, filename);
    const stats = fs.lstatSync(filePath);
    if (!stats.isDirectory()) continue;

    renameMDToPostInDir(filePath);
  }
};

const normalizeMetadata = () => {
  for (let filename of fs.readdirSync(postsDirectory)) {
    const absPostPath = join(postsDirectory, filename, `post.md`);
    const fileContents = fs.readFileSync(absPostPath, "utf8");

    const { data, content } = matter(fileContents);

    const date =
      data.date instanceof Date
        ? (data.date as Date).toISOString()
        : new Date(data.date).toISOString();

    const postMeta = producePostMeta({
      coverImage: data.coverImage || data.featuredImage || `/images/fallback-post-header.jpg`,
      date,
      tags: data.tags ?? [],
      title: data.title,
    });

    fs.writeFileSync(absPostPath, matter.stringify(content, postMeta));
  }
};

async function bootstrap() {
  moveMDToOwnDirs();
  renameMDsInOwnDir();
  normalizeMetadata();
}

bootstrap();
