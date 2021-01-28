const fs = require("fs");
const { join } = require("path");
const matter = require("gray-matter");

const postsDirectory = join(process.cwd(), "public/posts");

module.exports = {
  async rewrites() {
    // for (let filename of fs.readdirSync(postsDirectory)) {
    //   const postDir = join(postsDirectory, filename);
    //   const absPostPath = join(postDir, `post.md`);
    //   const fileContents = fs.readFileSync(absPostPath, "utf8");

    //   const { data, content } = matter(fileContents);

    //   if (!data.oldUrl) continue;

    //   console.log(data.oldUrl);
    // }

    return [
      {
        source: "/wp-content/:splat*",
        destination: "http://d18l99bmg6trdn.cloudfront.net/wp-content/:splat*",
      },
    ];
  },
};
