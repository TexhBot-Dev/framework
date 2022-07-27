import { walk } from "../helpers";
import type { TechClient } from "../structures";
import type { InternalListener } from "../typings";

export async function loadListeners(client: TechClient) {
	const allListenerFiles = await walk(client.srcDir + "/listeners", /\.js$/);
	for (let i = allListenerFiles.length; i > 0; i--) {
		const file = allListenerFiles[i - 1];

		console.log(`Loading listener ${file}...`);

		const listener: InternalListener = (await import(file)).default;
		const method = listener.once ? "once" : "on";

		client[method](listener.event, listener.execute);
	}
}
