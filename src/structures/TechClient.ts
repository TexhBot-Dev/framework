import { Client, ClientOptions, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import startup from "../core/startup";
import { Command } from "../typings";

export class TechClient extends Client {
  public commands: Collection<string, Command>;

  public constructor(
    options: ClientOptions = {
      intents: 0,
    }
  ) {
    super(options);
    this.commands = new Collection<string, Command>();

    startup(this);
  }

  async #deploy() {
    const rest = new REST({ version: "10" }).setToken(this.token!);
    const apiCommands = [];

    for (const [, command] of this.commands) {
      apiCommands.push(command.data.toJSON());
    }

    rest
      .put(Routes.applicationCommands(this.application!.id), {
        body: apiCommands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }

  public override async login(token = this.token!) {
    this.token ??= token;

    super
      .login(this.token)
      .then(() => console.log("Logged in."))
      .catch(console.error);

    this.once("ready", () => {
      // Ensure this.#deploy has the client's applicationId and for the rest of the lifecycle.
      this.#deploy()
        .then(() =>
          console.log(`Completed startup! Ready on client ${this.user!.tag}.`)
        )
        .catch(console.error);
    });

    return "Logged in.";
  }
}
