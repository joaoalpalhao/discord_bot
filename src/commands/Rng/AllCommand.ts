import { Collection, GuildChannel, GuildMember } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import Util from '../../utils/Util';

// Get prefix
const prefix: string = process.env.DISCORD_BOT_COMMAND_PREFIX;

const setUsage = (str: string): void => {
  usage = str;
};
export const name: string = 'all';
export let usage = `[number]`;
export const category: string = 'Randomize all users in a voice channel.';
export const run: RunFunction = async (client, message, args, parent) => {
  // Set usage
  setUsage(`${prefix}${parent.name} ${name} [number]`);

  const channel: GuildChannel = message.guild.channels.cache.get(message.member.voice.channelID);
  const members: Collection<string, GuildMember> = channel.members;
  //members.delete('642928043437981726');
  const chosenMembers: Collection<string, GuildMember> = new Collection();

  if (!args[0]) {
    // Choose a random member
    const rndMemberID: string = Util.getRandomMemberKey(members);
    chosenMembers.set(rndMemberID, members.get(rndMemberID));
    members.delete(rndMemberID);
  } else if (args[0] === 'help') {
    // Shows usage for this command
    return await message.channel.send(`Type \`${usage}\``);
  } else {
    const iterator: string = args[0];
    try {
      Util.validateIterator(iterator);
    } catch (e) {
      return await message.channel.send(`${e.message} Type ${usage}`);
    }
    const amount: number = parseInt(iterator);
    if (amount > members.size) {
      return await message.channel.send(`You\'re withdrawing more members than the ones on your voice channel.`);
    }
    // Choose a certain amount of random members
    for (let i = 0; i < amount; i++) {
      const rndMemberID: string = Util.getRandomMemberKey(members);
      chosenMembers.set(rndMemberID, members.get(rndMemberID));
      members.delete(rndMemberID);
    }
  }

  // Print result
  return await message.channel.send(Util.printWithdrawalUsers(chosenMembers));
};

