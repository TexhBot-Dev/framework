import { Client, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import startup from "../core/startup";
import { Command } from "../typings";

export class Bot {
  public client: Client;
  public commands: Collection<string, Command>;

  constructor(client: Client) {
    this.client = client;
    this.commands = startup(client);
  }

  async #deploy() {
    const rest = new REST({ version: "10" }).setToken(this.client.token!);
    const apiCommands = [];

    for (const [, command] of this.commands) {
      apiCommands.push(command.data.toJSON());
    }

    rest
      .put(Routes.applicationCommands(this.client.application!.id), {
        body: apiCommands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }

  public async login(token = this.client.token!) {
    this.client.token ??= token;

    this.client.once("ready", (c) => {
      // Ensure this.#deploy has the client's applicationId and for the rest of the lifecycle.
      this.client = c;
      this.#deploy()
        .then(() =>
          console.log(
            `Completed startup! Ready on client ${this.client.user!.tag}.`
          )
        )
        .catch(console.error);
    });

    this.client
      .login(this.client.token)
      .then(() => console.log("Logged in."))
      .catch(console.error);
  }
}
