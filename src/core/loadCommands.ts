import {walk} from '../helpers';
import type {TechClient, Command} from '../structures';

export default async function(client: TechClient) {
  const allCommandFiles = await walk(client.commandDir, /\.js$/);
  for (let i = allCommandFiles.length; i > 0; i--) {
    const file = allCommandFiles[i - 1];

    console.log(`Loading command ${file}...`);

    const Command = (await import(file)).default;
    const commandInstance: Command = new Command(client);
    client.commands.set(commandInstance.data.name, commandInstance);
  }
}
