import { Client, Collection } from "discord.js";
import { readdirSync } from "node:fs";
import { Command } from "../typings";
import path from "node:path";

export const commands = new Collection<string, Command>();

export default function (client: Client) {
  //todo: handle files better
  const commandFiles = readdirSync(process.cwd() + "/dist/commands").filter(
    (file: string) => file.endsWith(".js") && !file.startsWith("_")
  );

  for (let i = 0, l = commandFiles.length; i < l; i++) {
    const file = commandFiles[i];
    //todo: handle files better
    const command = require(process.cwd() +
      "/dist" +
      `/commands/${file}`).default;
    const commandInstance: Command = new command();
    commands.set(commandInstance.data.name, commandInstance);
  }

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
      if (command.preconditions?.length) {
        for (const precondition of command.preconditions) {
          const result = await precondition(interaction);
          if (!result) return;
        }
      }

      await command.chatInputRun(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  return commands;
}
