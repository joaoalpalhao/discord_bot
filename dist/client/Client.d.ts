import { Client, Collection } from 'discord.js';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
declare class Bot extends Client {
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    constructor();
    start(): Promise<void>;
}
export { Bot };
