import { RunFunction } from '../interfaces/Event';

export const run: RunFunction = async (client) => {
  console.log(`${client.user.username} is running.`);
  client.user.setPresence({
    status: 'online',
    activity: {
      name: process.env.DISCORD_BOT_GAME,
      type: 'LISTENING',
    },
  });
}

export const name: string = 'ready';