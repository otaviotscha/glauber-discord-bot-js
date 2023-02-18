import { queue } from "..";
import { Message, sendMessage } from "../utils/message";

// TODO: fix
const resume = async (message: Message) => {
  if (!queue.currentDispatcher)
    return sendMessage(message, "Não tem nada pausado!");

  if (!queue.currentDispatcher.paused)
    return sendMessage(message, "Já tá tocando!");

  queue.currentDispatcher.resume();
  sendMessage(message, "Tocando!");
};

export default resume;
