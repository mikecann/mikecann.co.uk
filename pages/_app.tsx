import { normalize, setupPage } from "csstips";
import { AppProps } from "next/app";
import "../styles/globals.css";

normalize();
setupPage("body");

// This default export is required in a new `pages/_app.js` file.
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
