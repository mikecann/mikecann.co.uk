import React, { ReactNode } from "react";
import Head from "next/head";
import { mediaStyles } from "../../utils/media";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div style={{ width: "100%" }}>
    <Head>
      <title>{title} | mikecann.co.uk</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
    </Head>
    {/* <header style={{ width: "100%" }}>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </nav>
    </header> */}
    {children}
    {/* <footer style={{ width: "100%" }}>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
  </div>
);

export default Layout;
