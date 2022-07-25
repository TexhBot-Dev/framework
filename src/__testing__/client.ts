import { GatewayIntentBits } from "discord.js";
import { TechClient } from "..";
// import { token } from "./config.json";

const client = new TechClient({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.login("OTc3NzgzOTAyNTA2NzM3NjY0.GzHfBO.eBWQLJw8WKFJEsjxsnc_-V1UKCnj3qWzjkDjGk").then(() => {
	console.log(client.commands);
});

