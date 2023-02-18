import { StreamDispatcher } from "discord.js";

export interface QueueItem {
  url: string;
}
export class Queue {
  currentDispatcher?: StreamDispatcher;
  list: QueueItem[] = [];

  length = () => this.list.length;

  addItem = (item: QueueItem) => {
    this.list = this.list.concat(item);
  };

  // TODO: change name to next
  removeItem = () => {
    // TODO: end or destroy?
    if (this.currentDispatcher) {
      this.currentDispatcher.end();
      this.currentDispatcher.destroy();
      this.currentDispatcher = undefined;
    }
    this.list.shift();
    // TODO: play next here
  };
}
