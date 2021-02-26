"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.category = exports.usage = exports.name = void 0;
const discord_js_1 = require("discord.js");
const Util_1 = __importDefault(require("../../utils/Util"));
// Get prefix
const prefix = process.env.DISCORD_BOT_COMMAND_PREFIX;
const setUsage = (str) => {
    exports.usage = str;
};
exports.name = 'except';
exports.usage = `<mentions> [number]`;
exports.category = 'Randomize all users in a voice channel except the ones mentioned.';
const run = async (client, message, args, parent) => {
    // Set usage
    setUsage(`${prefix}${parent.name} ${exports.name} <mentions> [number]`);
    const channel = message.guild.channels.cache.get(message.member.voice.channelID);
    const members = channel.members;
    const chosenMembers = new discord_js_1.Collection();
    let amount = null;
    // Check for arguments
    if (!args[0]) {
        return await message.channel.send(`Missing arguments. Type \`${exports.usage}\``);
    }
    // Shows usage for this command
    if (args[0] === 'help') {
        return await message.channel.send(`Type \`${exports.usage}\``);
    }
    // Check for iterations
    if (!isNaN(args[args.length - 1])) {
        amount = parseInt(args.pop());
        try {
            Util_1.default.validateIterator(amount);
        }
        catch (e) {
            return await message.channel.send(`${e} Type ${exports.usage}`);
        }
        // Check for more withdrawals then members
        if (amount > members.size) {
            return await message.channel.send(`You\'re withdrawing more members than the ones on your voice channel.`);
        }
    }
    // Check for mentions
    const mentions = args.slice(0, args.length);
    if (mentions.length <= 0) {
        return await message.channel.send(`You haven\'t mentioned any users. At least one is required to use this command. Type \`${exports.usage}\``);
    }
    // Clean/Separate mentions
    const treatedMentions = Util_1.default.cleanMentions(mentions);
    // Try to get members from mentions
    try {
        treatedMentions.forEach(el => {
            // Check for valid mentions
            if (!Util_1.default.isMention(el))
                throw 'Invalid mentions.';
            const userID = Util_1.default.getUserIDFromMention(el);
            if (members.has(userID))
                members.delete(userID);
        });
    }
    catch (e) {
        return await message.channel.send(`${e} Type ${exports.usage}`);
    }
    // Choose member(s)
    if (amount) {
        // Last check for iteration vs members left
        if (amount > members.size) {
            return await message.channel.send(`You\'re choosing more members than you have on your voice channel minus the excluded ones. Type \`${exports.usage}\``);
        }
        for (let i = 0; i < amount; i++) {
            const rndMemberID = Util_1.default.getRandomMemberKey(members);
            chosenMembers.set(rndMemberID, members.get(rndMemberID));
            members.delete(rndMemberID);
        }
    }
    else {
        const rndMemberID = Util_1.default.getRandomMemberKey(members);
        chosenMembers.set(rndMemberID, members.get(rndMemberID));
        members.delete(rndMemberID);
    }
    // Print results
    return await message.channel.send(Util_1.default.printWithdrawalUsers(chosenMembers));
};
exports.run = run;
//# sourceMappingURL=ExceptCommand.js.map