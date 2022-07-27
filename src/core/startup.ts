import type { Interaction } from "discord.js";
import type { TechClient } from "../structures/TechClient";
import loadCommands from "./loadCommands";
import { loadListeners } from "./loadListeners";

export default async function (client: TechClient) {
  await loadCommands(client);
  loadListeners(client);

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command === undefined) return;

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
}
