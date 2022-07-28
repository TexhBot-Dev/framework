# Creating Commands

1. If you haven't already, create a directory named `commands`.
2. Create a new JavaScript/TypeScript file for the command.
3. Create your command.

```ts
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "@texhbot-dev/framework";

export default class PingCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!");

  public chatInputRun(interaction: ChatInputCommandInteraction) {
    return interaction.reply({ content: "Pong!" });
  }
}
```

- The `data` property should be a SlashCommandBuilder.
- The `execute` method will execute when the command is run.
