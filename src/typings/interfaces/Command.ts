import type {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';
import type {Precondition} from './Precondition';

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
    ) => Promise<unknown> | ((interaction: ChatInputCommandInteraction) => unknown);
}
