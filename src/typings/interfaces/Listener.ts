import type {ClientEvents} from 'discord.js';

export interface Listener<T extends keyof ClientEvents> {
    event: T;
    once?: boolean;
    execute(...args: ClientEvents[T]): unknown;
}
