"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client) => {
    console.log(`${client.user.username} is running.`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: process.env.DISCORD_BOT_GAME,
            type: 'LISTENING',
        },
    });
};
exports.run = run;
exports.name = 'ready';
//# sourceMappingURL=ReadyEvent.js.map