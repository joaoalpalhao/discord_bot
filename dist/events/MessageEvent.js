"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client, message) => {
    const prefix = process.env.DISCORD_BOT_COMMAND_PREFIX;
    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix))
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    const command = client.commands.get(cmd.toLowerCase());
    if (!command)
        return;
    // Check for voice requirement
    if (command.options.voice && !message.member.voice.channelID) {
        message.channel.send(`You must be inside a voice channel to execute this command.`);
        return;
    }
    command.run(client, message, args).catch((reason) => console.log(reason));
};
exports.run = run;
exports.name = 'message';
//# sourceMappingURL=MessageEvent.js.map