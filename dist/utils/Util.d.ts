import { Collection, GuildMember } from "discord.js";
import { Command } from "../interfaces/Command";
/**
 * Contains various general-purpose utility methods.
 */
export default class Util {
    constructor();
    static getAllCommands(path: string): Promise<Collection<string, Command>>;
    static validateIterator(iterator: any): Error;
    static printWithdrawalUsers(members: Collection<string, GuildMember>): string;
    static getRandomMemberKey(collection: Collection<string, GuildMember>): string;
    static isMention(str: string): boolean;
    static splitMentions(str: string): string[];
    static cleanMentions(mentionsArr: string[]): string[];
    static getUserIDFromMention(str: string): string;
}
