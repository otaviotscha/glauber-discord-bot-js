import { queue } from "..";
import { Message, sendMessage } from "../utils/message";

const pause = async (message: Message) => {
  if (!queue.currentDispatcher || queue.currentDispatcher.paused)
    return sendMessage(message, "Não tem nada tocando agora!");

  queue.currentDispatcher.pause();
  sendMessage(message, "Pausado!");
};

export default pause;
