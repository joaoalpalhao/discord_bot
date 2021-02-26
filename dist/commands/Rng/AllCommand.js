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
exports.name = 'all';
exports.usage = `[number]`;
exports.category = 'Randomize all users in a voice channel.';
const run = async (client, message, args, parent) => {
    // Set usage
    setUsage(`${prefix}${parent.name} ${exports.name} [number]`);
    const channel = message.guild.channels.cache.get(message.member.voice.channelID);
    const members = channel.members;
    const chosenMembers = new discord_js_1.Collection();
    if (!args[0]) {
        // Choose a random member
        const rndMemberID = Util_1.default.getRandomMemberKey(members);
        chosenMembers.set(rndMemberID, members.get(rndMemberID));
        members.delete(rndMemberID);
    }
    else if (args[0] === 'help') {
        // Shows usage for this command
        return await message.channel.send(`Type \`${exports.usage}\``);
    }
    else {
        const amount = parseInt(args[0]);
        try {
            Util_1.default.validateIterator(amount);
        }
        catch (e) {
            return await message.channel.send(e);
        }
        if (amount > members.size) {
            return await message.channel.send(`You\'re withdrawing more members than the ones on your voice channel.`);
        }
        // Choose a certain amount of random members
        for (let i = 0; i < amount; i++) {
            const rndMemberID = Util_1.default.getRandomMemberKey(members);
            chosenMembers.set(rndMemberID, members.get(rndMemberID));
            members.delete(rndMemberID);
        }
    }
    // Print result
    return await message.channel.send(Util_1.default.printWithdrawalUsers(chosenMembers));
};
exports.run = run;
//# sourceMappingURL=AllCommand.js.map