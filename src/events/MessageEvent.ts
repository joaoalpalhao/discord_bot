import { Message } from 'discord.js';
import { Command } from '../interfaces/Command';
import { RunFunction } from '../interfaces/Event';

export const run: RunFunction = async (client, message: Message) => {
  const prefix: string = process.env.DISCORD_BOT_COMMAND_PREFIX;
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

  const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd: string = args.shift();
  const command: Command = client.commands.get(cmd.toLowerCase());
  if (!command) return;

  // Check for voice requirement
  if (command.options.voice && !message.member.voice.channelID) {
    message.channel.send(`You must be inside a voice channel to execute this command.`);
    return;
  }

  command.run(client, message, args).catch((reason: any) => console.log(reason));
}

export const name: string = 'message';