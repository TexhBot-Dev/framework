import { fdir } from "fdir";
import { TechClient } from "../structures/TechClient";
import { Command } from "../typings";

export default async function (client: TechClient) {
	const commandFiles = await new fdir()
		.withDirs()
		.withFullPaths()
		.filter((path, isDirectory) => path.endsWith(".js"))
		.filter((path, isDirectory) => !path.startsWith("_"))
		.crawl(process.cwd() + "/dist/commands")
		.withPromise();

		if (typeof commandFiles === typeof Array<string>) {
			for (let i = 0, l = (commandFiles as string[]).length; i < l; i++) {
				const file = (commandFiles as string[])[i];
				const command = await import(file);
				const commandInstance: Command = new command();

				client.commands.set(commandInstance.data.name, commandInstance);
			}
		}
};
