import type { ClientEvents } from "discord.js";

/** Listener interface without generics or inference. */
export interface InternalListener {
	event: keyof ClientEvents;
	once?: boolean;
	execute(...args: any[]): any;
}
