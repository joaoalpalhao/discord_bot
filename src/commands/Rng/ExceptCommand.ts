import { Collection, GuildChannel, GuildMember } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import Util from '../../utils/Util';

// Get prefix
const prefix: string = process.env.DISCORD_BOT_COMMAND_PREFIX;

const setUsage = (str: string): void => {
  usage = str;
};
export const name: string = 'except';
export let usage = `<mentions> [number]`;
export const category: string = 'Randomize all users in a voice channel except the ones mentioned.';
export const run: RunFunction = async (client, message, args: any, parent) => {
  // Set usage
  setUsage(`${prefix}${parent.name} ${name} <mentions> [number]`);

  const channel: GuildChannel = message.guild.channels.cache.get(message.member.voice.channelID);
  const members: Collection<string, GuildMember> = channel.members;
  const chosenMembers: Collection<string, GuildMember> = new Collection();

  let amount: number = null;

  // Check for arguments
  if (!args[0]) {
    return await message.channel.send(`Missing arguments. Type \`${usage}\``);
  }

  // Shows usage for this command
  if (args[0] === 'help') {
    return await message.channel.send(`Type \`${usage}\``);
  }

  // Check for iterations
  if (!isNaN(args[args.length - 1])) {
    amount = parseInt(args.pop());
    try {
      Util.validateIterator(amount);
    } catch (e) {
      return await message.channel.send(`${e} Type ${usage}`);
    }
    // Check for more withdrawals then members
    if (amount > members.size) {
      return await message.channel.send(`You\'re withdrawing more members than the ones on your voice channel.`);
    }
  }

  // Check for mentions
  const mentions: string[] = args.slice(0, args.length);
  if (mentions.length <= 0) {
    return await message.channel.send(`You haven\'t mentioned any users. At least one is required to use this command. Type \`${usage}\``);
  }

  // Clean/Separate mentions
  const treatedMentions: string[] = Util.cleanMentions(mentions);

  // Try to get members from mentions
  try {
    treatedMentions.forEach(el => {
      // Check for valid mentions
      if (!Util.isMention(el)) throw 'Invalid mentions.';
      const userID: string = Util.getUserIDFromMention(el);
      if (members.has(userID)) members.delete(userID);
    });
  } catch (e) {
    return await message.channel.send(`${e} Type ${usage}`);
  }

  // Choose member(s)
  if (amount) {
    // Last check for iteration vs members left
    if (amount > members.size) {
      return await message.channel.send(`You\'re choosing more members than you have on your voice channel minus the excluded ones. Type \`${usage}\``);
    }
    for (let i = 0; i < amount; i++) {
      const rndMemberID: string = Util.getRandomMemberKey(members);
      chosenMembers.set(rndMemberID, members.get(rndMemberID));
      members.delete(rndMemberID);
    }
  } else {
    const rndMemberID: string = Util.getRandomMemberKey(members);
    chosenMembers.set(rndMemberID, members.get(rndMemberID));
    members.delete(rndMemberID);
  }

  // Print results
  return await message.channel.send(Util.printWithdrawalUsers(chosenMembers));
};