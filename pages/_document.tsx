import Document, { Html, Head, Main, NextScript } from "next/document";

export default class extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for blog posts"
            href="https://mikecann.co.uk/rss.xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
