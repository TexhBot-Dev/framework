import { Client, GatewayIntentBits } from "discord.js";
import { Bot } from "..";
import { token } from "./config.json";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const bot = new Bot(client);

bot.login(token);
