"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.subcommands = exports.usage = exports.category = exports.name = exports.options = void 0;
const Util_1 = __importDefault(require("../utils/Util"));
// Get prefix
const prefix = process.env.DISCORD_BOT_COMMAND_PREFIX;
// Get subcommands
Util_1.default.getAllCommands(`${__dirname}/Rng/*{.ts,.js}`).then(async (value) => {
    await value;
    exports.subcommands = value;
    exports.usage = `${prefix}${exports.name} <${value.keyArray().join('|')}>`;
});
exports.options = {
    voice: true,
};
exports.name = 'rng';
exports.category = 'Randomizer';
const run = async (client, message, args) => {
    const cmd = args.shift();
    if (!cmd)
        return await message.channel.send(`To use this command type \`${exports.usage}\``);
    ;
    const subcommand = exports.subcommands.get(cmd.toLowerCase());
    if (!subcommand)
        return await message.channel.send(`That command does not exist. Type \`${exports.usage}\``);
    subcommand.run(client, message, args, this).catch((reason) => console.log(reason));
};
exports.run = run;
//# sourceMappingURL=RngCommand.js.map