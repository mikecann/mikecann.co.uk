import { Grid, Vertical } from "gls/lib";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { getStyles } from "typestyle";

//console.log([Grid, Vertical]);

export default class extends Document {
  // static async getInitialProps(ctx: any) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return {
  //     ...initialProps,
  //     styles: (
  //       <>
  //         {initialProps.styles}
  //         {}
  //       </>
  //     ),
  //   };
  // }

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
          <style
            id="styles-target"
            dangerouslySetInnerHTML={{
              __html: getStyles(),
            }}
          ></style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
