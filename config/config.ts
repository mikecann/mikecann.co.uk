import { produceConfig } from "../utils/produceConfig";
import { tryRequire } from "../utils/tryRequire";

export const config = produceConfig({
  ALGOLIA_ADMIN_KEY: "",
  ALGOLIA_APP_ID: "",
  ...tryRequire(`${__dirname}/local.config.json`, {}),
});
