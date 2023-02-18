import { Message, sendMessage } from "../utils/message";

const quit = async (message: Message) => {
  // TODO: clean queue
  const voiceChannel = message.member?.voice.channel;
  if (voiceChannel) {
    sendMessage(message, "Tchau tchau!");
    voiceChannel?.leave();
  }
};

export default quit;
