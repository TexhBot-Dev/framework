import type { Listener } from "../../typings";

const ready: Listener<"ready"> = {
	event: "ready",
	once: true,
	execute: (client) => {
		console.log(`Listeners are working for ${client.user.tag}!`);
	},
};

export default ready;
