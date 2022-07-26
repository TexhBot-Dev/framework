# Listeners
1. Create a directory named `listeners`.
2. Create a file.
3. In the file, create a listener as such:
```ts
import { Listener } from "../../typings";

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