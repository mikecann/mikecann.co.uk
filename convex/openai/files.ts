import { internalAction } from "../_generated/server";
import OpenAI from "openai";
import { ensure } from "../../essentials/misc/ensure";

export const queryFile = internalAction({
  args: {},
  handler: async ({ runQuery }) => {
    const openai = new OpenAI({
      apiKey: ensure(
        process.env.OPEN_AI_API_KEY,
        `Missing env OPEN_AI_API_KEY, have you added it to the Convex environment?`
      ),
    });

    const file = await openai.files.retrieve("file-NQ33YPlykfxMZizEp13t3U8a");

    console.log(file);
  },
});
