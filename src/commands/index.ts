import { COMMAND_PREFIX } from "../config";

export enum Commands {
  PLAY = "play",
  QUIT = "quit",
  PAUSE = "pause",
  RESUME = "resume",
  SKIP = "skip",
}

export const isCommand = (toCompare: string, command: Commands): boolean =>
  toCompare.startsWith(COMMAND_PREFIX + command);

export const getFirstArg = (text: string, command: Commands): string => {
  const args = text.trim().split(Commands.PLAY);
  return args[1].replace(/ /g, "");
};
