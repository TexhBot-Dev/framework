import { CommandInteraction } from "discord.js";

export type Precondition = (
  interaction: CommandInteraction
) => Promise<never> | never;
