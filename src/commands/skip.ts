import { queue } from "..";
import play from "./play";
import { Message, sendMessage } from "../utils/message";

const skip = async (message: Message) => {
  if (!queue.currentDispatcher)
    return sendMessage(message, "Não tem nada tocando!");

  // TODO: refactor
  queue.removeItem();
  sendMessage(message, "Passou!");
  if (queue.length() > 0) play(message, queue.list[0].url, true);
};

export default skip;
