import { walk } from "../helpers";
import type { TechClient } from "../structures/TechClient";
import type { Command } from "../typings";

export default async function (client: TechClient) {
  walk(client.srcDir + "/commands", async (file) => {
    if (!file.endsWith(".js") || file.startsWith("_")) return;

    console.log(`Loading command ${file}...`);

    const command = (await import(file)).default;
    const commandInstance: Command = new command();

    client.commands.set(commandInstance.data.name, commandInstance);
  });
}
