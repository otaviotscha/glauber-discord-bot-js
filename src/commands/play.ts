import ytdl from "ytdl-core";

import { queue } from "..";
import skip from "./skip";
import { Message, replyMessage, sendMessage } from "../utils/message";

const play = async (
  message: Message,
  url: string,
  next: boolean = false
): Promise<void> => {
  const voiceChannel = message.member?.voice.channel;

  if (!voiceChannel) {
    return replyMessage(message, "entre em algum canal de voz primeiro!");
  }

  if (!url || !ytdl.validateURL(url)) {
    return replyMessage(message, "o link do YouTube é inválido!");
  }

  if (queue.length() > 0 && !next) {
    queue.addItem({ url });
    return sendMessage(message, `Adicionado na fila: ${url}`);
  }

  try {
    const connection = await voiceChannel.join();
    if (!next) {
      queue.addItem({ url });
      console.log(`Adicionado na fila: ${url}`);
    }

    // O problema do resume pode ser aqui
    const dispatcher = connection.play(ytdl(url, { filter: "audioonly" }));

    dispatcher.on("finish", () => {
      skip(message);
    });
    queue.currentDispatcher = dispatcher;

    sendMessage(message, `Agora tocando: ${url}`);
  } catch (error) {
    console.error(error);
    voiceChannel.leave();
    replyMessage(message, "erro ao tentar dar play no vídeo!");
  }
};

export default play;
