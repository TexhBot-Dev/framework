import type {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import type {Precondition} from '../typings';
import type {TechClient} from './TechClient';

export abstract class Command {
  /**
   * Preconditions to run before the command is executed. A falsy return value will prevent the command from executing.
   */
  public preconditions?: Precondition[];

  /** The command data. */
  public abstract data: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
  >;

  /** The Bot Client */
  public client: TechClient;

  /** Is This an NSFW command? */
  public isNSFW: boolean = false;

  public constructor(client: TechClient) {
    this.client = client;
  }

  /** The command's chat input handler. */
  public abstract chatInputRun(
    interaction: ChatInputCommandInteraction
  ): unknown;
}
