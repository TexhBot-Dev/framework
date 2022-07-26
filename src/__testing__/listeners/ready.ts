import { Listener } from "../../typings";

const ready: Listener<"ready"> = {
  event: "ready",
  once: true,
  execute: (client) => {
    console.log(`Listeners work! ${client.ws.ping}`);
  },
};

export default ready;
