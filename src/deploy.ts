import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { clientId, token } from "./config.json";
import { commands } from "./startup";

const rest = new REST({ version: "10" }).setToken(token);
const apiCommands = [];

for (const [, command] of commands) {
  apiCommands.push(command.data.toJSON());
}

rest
  .put(Routes.applicationCommands(clientId), { body: apiCommands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
