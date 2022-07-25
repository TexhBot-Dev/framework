import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readdirSync } from "node:fs";
import { token } from "./config.json";
import { Command } from "./typings";

//TODO: Add custom intents and better bot initialization.
export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

export const commands = new Collection<string, Command>();

export const commandFiles = readdirSync(__dirname + "/commands").filter(
  (file: string) => file.endsWith(".js") && !file.startsWith("_")
);

for (let i = 0, l = commandFiles.length; i < l; i++) {
  const file = commandFiles[i];
  const command: Command = require(`./commands/${file}`).default;
  commands.set(command.data.name, command);
}

client.login(token).then(() => console.log("Logged in."));

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
