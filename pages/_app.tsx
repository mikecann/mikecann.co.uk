import "../utils/hydrate";
import { GLSDefaults } from "gls/lib";
import { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/globals.css";

// normalize();
// setupPage("body");

// This default export is required in a new `pages/_app.js` file.
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
      <Component {...pageProps} />
    </GLSDefaults.Provider>
  );
};

export default MyApp;
