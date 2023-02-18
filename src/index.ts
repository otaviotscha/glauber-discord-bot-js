/**
 * Loads .env file
 */
import "./config";

import * as Discord from "discord.js";

import { COMMAND_PREFIX, DISCORD_BOT_TOKEN } from "./config";

import { Commands, isCommand, getFirstArg } from "./commands";
import play from "./commands/play";
import quit from "./commands/quit";
import pause from "./commands/pause";
import resume from "./commands/resume";
import skip from "./commands/skip";

import { Queue } from "./utils/queue";

import { replyMessage } from "./utils/message";

export const client = new Discord.Client();

export const queue = new Queue();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (message: Discord.Message) => {
  if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) return;

  if (isCommand(message.content, Commands.PLAY)) {
    const url = getFirstArg(message.content, Commands.PLAY);
    return play(message, url);
  }

  if (isCommand(message.content, Commands.QUIT)) return quit(message);

  if (isCommand(message.content, Commands.PAUSE)) return pause(message);

  if (isCommand(message.content, Commands.RESUME)) return resume(message);

  if (isCommand(message.content, Commands.SKIP)) return skip(message);

  replyMessage(message, "comando desconhecido!");
});

client.login(DISCORD_BOT_TOKEN);
