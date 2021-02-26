import { Collection } from 'discord.js';
import { CmdOptions, Command, RunFunction } from '../interfaces/Command';
export declare const options: CmdOptions;
export declare const name: string;
export declare const category: string;
export declare let usage: string;
export declare let subcommands: Collection<string, Command>;
export declare const run: RunFunction;
