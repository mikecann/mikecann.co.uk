import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "public/posts");

const regex = new RegExp("(https://mikecann.co.uk)/(.*)/(.*)", "g");

async function bootstrap() {
  for (let filename of fs.readdirSync(postsDirectory)) {
    const postDir = join(postsDirectory, filename);
    const absPostPath = join(postDir, `post.md`);
    const fileContents = fs.readFileSync(absPostPath, "utf8");

    const match = regex.exec(fileContents);

    if (!match) continue;


    console.log(filename, match?.length, fileContents.length);
  }
}

bootstrap();
