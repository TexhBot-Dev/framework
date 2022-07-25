import { CommandInteraction } from "discord.js";

export type Precondition = (interaction: CommandInteraction) => Promise<unknown> | unknown;