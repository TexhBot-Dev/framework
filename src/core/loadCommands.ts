import {walk} from '../helpers';
import type {TechClient} from '../structures/TechClient';

export default async function(client: TechClient) {
  const allCommandFiles = await walk(client.srcDir + '/commands', /\.js$/);
  for (let i = allCommandFiles.length; i > 0; i--) {
    const file = allCommandFiles[i - 1];

    console.log(`Loading command ${file}...`);

    const Command = (await import(file)).default;
    client.commands.set(Command.data.name, new Command());
  }
}
