import type {CommandInteraction} from 'discord.js';

export type Precondition = (
  interaction: CommandInteraction
) => unknown;
