import { GatewayIntentBits } from "discord.js";
import { TechClient } from "..";
import { token } from "./config.json";

const client = new TechClient({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
	// for custom source dir, other than dist/src
	srcDir: __dirname,
});

client.login(token);
