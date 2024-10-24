import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { writeFileSync } from "fs";

const oldPostsDir = `C:/dev/me/OLD_mikecann.blog/public`;
const postsDirectory = join(process.cwd(), "public/posts");

const iterateOldPostsDir = () => {
  const recurseUntilIndex = (dir: string): string[] => {
    let indicies: string[] = [];

    for (let filename of fs.readdirSync(dir)) {
      const filePath = dir + "/" + filename;

      const stats = fs.lstatSync(filePath);

      if (stats.isDirectory()) indicies = [...indicies, ...recurseUntilIndex(filePath)];
      else if (filename == "index.html") indicies.push(dir);
    }

    return indicies;
  };

  let postDirs: string[] = [];

  for (let filename of fs.readdirSync(oldPostsDir)) {
    const filePath = oldPostsDir + "/" + filename;
    const stats = fs.lstatSync(filePath);
    if (!stats.isDirectory()) continue;

    postDirs = [...postDirs, ...recurseUntilIndex(filePath)];
  }

  return postDirs.map((dir) => {
    const parts = dir.replace(oldPostsDir, "").split("/");
    return { name: parts[parts.length - 1], path: parts.join("/") };
  });
};

async function bootstrap() {
  const old = iterateOldPostsDir();

  for (let filename of fs.readdirSync(postsDirectory)) {
    const oldPost = old.find((o) => o.name == filename);
    if (!oldPost) continue;

    const postDir = join(postsDirectory, filename);
    const absPostPath = join(postDir, `post.md`);
    const fileContents = fs.readFileSync(absPostPath, "utf8");

    const { data, content } = matter(fileContents);

    data["oldUrl"] = oldPost.path;

    fs.writeFileSync(absPostPath, matter.stringify(content, data));
  }
}

bootstrap();
