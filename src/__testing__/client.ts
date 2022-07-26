import { GatewayIntentBits } from "discord.js";
import { TechClient } from "..";
import { token } from "./config.json";

const client = new TechClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.login(token);
