import { config } from "dotenv";
import { cleanEnv, str } from "envalid";

config();

const env = cleanEnv(process.env, {
  DISCORD_BOT_TOKEN: str(),
  COMMAND_PREFIX: str({ default: "!" }),
});

export const { DISCORD_BOT_TOKEN, COMMAND_PREFIX } = env;
