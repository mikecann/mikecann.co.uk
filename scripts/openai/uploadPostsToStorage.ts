import dotenv from "dotenv";
import OpenAI from "openai";
import matter from "gray-matter";
import { PostWithContent, getAllPosts } from "../posts";
import { createReadStream, writeFileSync } from "fs";
import fs from "fs";
import path from "path";

dotenv.config({
  path: `.env`,
});

async function bootstrap() {
  const openAIKey = process.env.OPEN_AI_API_KEY;
  if (!openAIKey)
    throw new Error(
      `Missing env OPEN_AI_API_KEY, have you defined a .env file in the root of the project?`
    );

  const vectorStoreId = process.env.OPENAI_POSTS_VECTOR_STORE_ID;
  if (!vectorStoreId)
    throw new Error(
      `Missing env OPENAI_POSTS_VECTOR_STORE_ID, have you defined a .env file in the root of the project?`
    );

  const openai = new OpenAI({
    apiKey: openAIKey,
  });

  const allPosts = getAllPosts();
  const postsToUpload = allPosts.filter((post) => !post.meta.openAIPostsVectorStoreFileId);

  console.log(`starting..`, {
    totalPosts: allPosts.length,
    postsToUpload: postsToUpload.length,
  });

  // Create temporary directory
  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  // For each post
  const handle = async (post: PostWithContent) => {
    const postDir = path.dirname(post.absPostPath);
    const tempFileName = path.join(tmpDir, path.basename(postDir) + ".md");

    // Copy post to temporary file
    fs.copyFileSync(post.absPostPath, tempFileName);

    console.log(`uploading..`, tempFileName);

    const result = await openai.beta.vectorStores.files.uploadAndPoll(
      vectorStoreId,
      createReadStream(tempFileName)
    );

    if (result.status == "completed") {
      console.log(`Upload completed, Adding id '${result.id}' back into the post`);
      fs.writeFileSync(
        post.absPostPath,
        matter.stringify(post.content, {
          ...post.meta,
          openAIPostsVectorStoreFileId: result.id,
        })
      );
    } else {
      console.log(`Error uploading post`, result);
    }

    // Delete temporary file
    fs.unlinkSync(tempFileName);
  };

  const somePosts = postsToUpload.slice(0, 3);

  //await handle(postsToUpload[0]);

  // Iterate all the posts
  try {
    for (let post of somePosts) {
      await handle(post);
    }
  } catch (e) {
    console.error(e);
  }

  // Delete temporary directory
  fs.rmdirSync(tmpDir);

  process.exit(0);
}

bootstrap();
