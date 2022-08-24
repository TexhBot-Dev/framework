import type {CommandInteraction, Interaction} from 'discord.js';
import type {Command} from '../structures';
import type {TechClient} from '../structures/TechClient';
import loadCommands from './loadCommands';
import loadListeners from './loadListeners';

async function runPreconditions(command: Command, ctx: CommandInteraction) {
  if (command.preconditions?.length) {
    for (const precondition of command.preconditions) {
      const result = await precondition(ctx);
      if (!result) return false;
    }
  }

  return true;
}

export default async function(client: TechClient) {
  await loadCommands(client);
  await loadListeners(client);

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command === undefined) return;

    try {
      const preconditionResult = runPreconditions(command, interaction);
      if (!preconditionResult) return;

      await command.chatInputRun(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });
}
