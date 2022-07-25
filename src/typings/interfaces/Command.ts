import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { Precondition } from "./Precondition";

export interface Command {
  /**
   * Preconditions to run before the command is executed. A falsy return value will prevent the command from executing.
   */
  preconditions?: Precondition[];
  /** The command data. */
  data: SlashCommandBuilder;
  /** The command's chat input handler. */
  chatInputRun: (
    interaction: CommandInteraction
  ) => Promise<unknown> | ((interaction: CommandInteraction) => unknown);
}
