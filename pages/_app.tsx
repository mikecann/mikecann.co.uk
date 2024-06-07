import { GLSDefaults } from "gls/lib";
import { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import { setStylesTarget } from "typestyle";
import { Analytics } from "@vercel/analytics/react";

// normalize();
// setupPage("body");

// This default export is required in a new `pages/_app.js` file.
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    setStylesTarget(document.getElementById("styles-target")!);
  }, []);

  return (
    <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <meta charSet="utf-8" />
        <title key="title">MikeCann.co.uk</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" key="icon" />
        <link rel="shortcut icon" href="/favicon.ico" key="favicon" />
        <meta name="description" content="BattleTabs" key="description" />
        <meta
          name="keywords"
          content="Mike Cann Personal Blog Developer Programmer Typescript Games Unity BattleTabs Tinkering Software England Australia Manchester Perth"
          key="keywords"
        />

        <meta property="og:title" content="MikeCann.co.uk" key="og-title" />
        <meta property="og:site_name" content="MikeCann.co.uk" key="og-site_name" />
        <meta property="og:url" content="https://mikecann.co.uk" key="og-url" />
        <meta property="og:description" content="The Blog of Mike Cann" key="og-description" />
        <meta property="og:image" content="https://mikecann.co.uk/images/me.jpg" key="og-image" />
        <meta property="og:type" content="website" key="og-type" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </GLSDefaults.Provider>
  );
};

export default MyApp;
