import type {ClientOptions} from 'discord.js';

export interface TechOptions extends ClientOptions {
    srcDir?: string;
    commandDir?: string;
    listenerDir?: string;
}
