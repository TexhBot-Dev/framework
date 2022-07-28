import {Client, Collection, Routes} from 'discord.js';
import {REST} from '@discordjs/rest';
import path from 'node:path';
import startup from '../core/startup';
import type {Command, TechOptions} from '../typings';
import {getSourceDir} from '../helpers';

export class TechClient extends Client {
  /** The bot's commands. */
  public commands: Collection<string, Command>;
  public srcDir: string;
  public commandDir: string;
  public listenerDir: string;

  public constructor(
      options: TechOptions = {
        intents: 0,
        srcDir: getSourceDir(),
      },
  ) {
    super(options);
    this.srcDir = options.srcDir ?? getSourceDir();
    this.commandDir = options.commandDir ?? path.join(this.srcDir, '.', 'commands');
    this.listenerDir = options.listenerDir ?? path.join(this.srcDir, '.', 'listeners');
    this.commands = new Collection<string, Command>();

    startup(this);
  }

  async #deploy() {
    const rest = new REST({version: '10'}).setToken(this.token!);
    const apiCommands = [];

    for (const [, command] of this.commands) {
      apiCommands.push(command.data.toJSON());
    }

    rest
        .put(Routes.applicationCommands(this.application!.id), {
          body: apiCommands,
        })
        .then(() => {
          console.log('Successfully registered application commands.');
        })
        .catch(console.error);
  }

  public override async login(token = this.token!) {
    this.token ??= token;

    await super
        .login(token)
        .then(() => console.log('Logged in.'))
        .catch(console.error);

    await this.#deploy().catch(console.error);

    return token;
  }
}
