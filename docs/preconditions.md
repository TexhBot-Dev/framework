# Preconditions

Preconditions are checks that can be ran before executing a command's corresponding code.

### Creating a Precondition

1. Make a directory called `preconditions`.
2. Create a file.
3. **Make a function that returns a truthy value if we should continue executing the command, return a falsy value to stop further execution:**
```ts
import { CommandInteraction } from "discord.js";
import { Command } from "pkgname";

export function guildOnly(interaction: CommandInteraction) {
  if (interaction.guild) return true;

  interaction.reply("Nope! This command can only be executed in guilds.");
  return false;
}
```

### Using a Precondition

1. Add the `preconditions` property to the command class.
2. Import the precondition functions you want to use.
3. Put the precondition functions into the `preconditions` property with an array:

```ts
import { guildOnly } from "../preconditions/guildOnly";
import { Command } from "pkgname";

export default class PingCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!");
  public preconditions = [guildOnly];

  public chatInputRun(interaction: CommandInteraction) {
    return interaction.reply({ content: "Pong!" });
  }
}
```
