import Util from '../utils/Util';
import { Collection } from 'discord.js';
import { CmdOptions, Command, RunFunction } from '../interfaces/Command';

// Get prefix
const prefix: string = process.env.DISCORD_BOT_COMMAND_PREFIX;

// Get subcommands
Util.getAllCommands(`${__dirname}/Rng/*{.ts,.js}`).then(async (value) => {
  await value
  subcommands = value;
  usage = `${prefix}${name} <${value.keyArray().join('|')}>`;
});

export const options: CmdOptions = {
  voice: true,
};
export const name: string = 'rng';
export const category: string = 'Randomizer';
export let usage: string;
export let subcommands: Collection<string, Command>;
export const run: RunFunction = async (client, message, args) => {
  const cmd: string = args.shift();
  if (!cmd) return await message.channel.send(`To use this command type \`${usage}\``);;
  const subcommand: Command = subcommands.get(cmd.toLowerCase());
  if (!subcommand) return await message.channel.send(`That command does not exist. Type \`${usage}\``);
  subcommand.run(client, message, args, this).catch((reason: any) => console.log(reason));
};