import fs from "fs";
import { join } from "path";
const postsDirectory = join(process.cwd(), "_posts");

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

const renameMDToPostInDir = (dirPath: string) => {
  for (let filename of fs.readdirSync(dirPath)) {
    if (!filename.endsWith("md")) continue;
    fs.renameSync(join(dirPath, filename), join(dirPath, "post.md"));
  }
};

const renameMDsInOwnDir = () => {
  for (let filename of fs.readdirSync(postsDirectory)) {
    const filePath = join(postsDirectory, filename);
    const stats = fs.lstatSync(filePath);
    if (!stats.isDirectory()) continue;

    renameMDToPostInDir(filePath);
  }
};

async function bootstrap() {
  moveMDToOwnDirs();
  renameMDsInOwnDir();
}

bootstrap();
