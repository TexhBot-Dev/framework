import { getSourceDir, walk } from "../helpers";
import { TechClient } from "../structures";
import { InternalListener } from "../typings";

export function loadListeners(client: TechClient) {
  walk(client.srcDir + "/listeners", async (file) => {
    if (!file.endsWith(".js") || file.startsWith("_")) return;

    console.log(`Loading listener ${file}...`);

    const listener: InternalListener = (await import(file)).default;
    const method = listener.once ? "once" : "on";

    client[method](listener.event, listener.execute);
  });
}