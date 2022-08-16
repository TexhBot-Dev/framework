import type {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';
import type {Precondition} from './Precondition';

/**
 * @example ```ts
import type { Command } from "@texhbot-dev/framework";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default class PingCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Lets your know if the bot is alive");

  public chatInputRun(interaction: ChatInputCommandInteraction) {
    return interaction.reply({
      content: "Pong!",
    });
  }
}
```
 */
export interface Command {
    /**
     * Preconditions to run before the command is executed. A falsy return value will prevent the command from executing.
     */
    preconditions?: Precondition[];
    /** If command is NSFW */
    isNSFW?: boolean;
    /** The command data. */
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    /** The command's chat input handler. */
    chatInputRun: (
        interaction: ChatInputCommandInteraction
    ) => unknown;
}
