import { Message, Collection } from 'discord.js';
import { Bot } from '../client/Client';
export interface CmdOptions {
    voice: boolean;
}
export interface RunFunction {
    (client: Bot, message: Message, args: string[], parent?: Command): Promise<unknown>;
}
export interface Command {
    name: string;
    category: string;
    usage: string;
    options: CmdOptions;
    aliases?: string[];
    description?: string;
    cooldown?: number;
    subcommands?: Collection<string, Command>;
    run: RunFunction;
}
