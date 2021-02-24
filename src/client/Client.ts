import { Client, Collection } from 'discord.js';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { promisify } from 'util';
import glob from 'glob';
import Util from '../utils/Util';

const globPromise = promisify(glob);

class Bot extends Client {
  public commands: Collection<string, Command>;//new Collection();
  public events: Collection<string, Event> = new Collection();
  public constructor() {
    super();
  }

  public async start(): Promise<void> {
    this.login(process.env.DISCORD_BOT_CLIENT_TOKEN);

    // Get all commands
    Util.getAllCommands(`${__dirname}/../commands/*{.ts,.js}`).then(value => this.commands = value);

    // Get all events
    const eventFiles: string[] = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.map(async (value: string) => {
      const file: Event = await import(value);
      this.events.set(file.name, file);
      this.on(file.name, file.run.bind(null, this));
    });
  }
}

export { Bot };