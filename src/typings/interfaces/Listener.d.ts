import type {ClientEvents} from 'discord.js';

/**
 * @example ```ts
import { Listener } from "@texhbot-dev/framework";

const ready: Listener<"ready"> = {
  event: "ready", // the event name, can be any discord.js event
  once: true, // asserting that this event will only fire once
  execute: (client) => {
    console.log(`Listeners are working for ${client.user.tag}!`);
  },
};

// <<<< make sure the default export is the listener >>>>
export default ready;
```
 */
export interface Listener<T extends keyof ClientEvents> {
    event: T;
    once?: boolean;
    execute(...args: ClientEvents[T]): unknown;
}
