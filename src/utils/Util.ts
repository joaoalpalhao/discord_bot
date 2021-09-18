import { Collection, GuildMember } from "discord.js";
import { promisify } from "util";
import { Command } from "../interfaces/Command";
import glob from 'glob';

const globPromise = promisify(glob);

/**
 * Contains various general-purpose utility methods.
 */
export default class Util {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  static async getAllCommands(path: string) {
    const commands: Collection<string, Command> = new Collection();
    const commandFiles: string[] = await globPromise(path);
    commandFiles.map(async (value: string) => {
      const file: Command = await import(value);
      commands.set(file.name, file)
    });
    return commands;
  }

  static validateIterator(iterator: any) {
    if (isNaN(iterator) || iterator === "undefined") throw new Error('You must insert a valid ***number***.');
    if (iterator <= 0) throw new Error('You must insert a ***number*** bigger than **0**.');
    if (iterator % 1 != 0) throw new Error('You must insert a ***number*** with no decimal places.');
  }

  static printWithdrawalUsers(members: Collection<string, GuildMember>): string {
    if (members.size <= 0) return 'Not enough members to choose from.';
    const strOne: string = '**The chosen one:**';
    const strMany: string = '**The chosen ones:**';
    let result: string = (members.size <= 1 ? strOne : strMany) + '\n';
    let num: number = 1;
    for (const [key, value] of members.entries()) {
      result += `${num} - ${value.user}\n`;
      num++;
    }
    return result;
  }

  static getRandomMemberKey(collection: Collection<string, GuildMember>): string {
    if (collection.size <= 0) throw new Error('Empty collection.');
    const random: number = Math.floor(Math.random() * collection.size);
    let iterator: number = 0;
    for (let key of collection.keys()) {
      if (iterator++ === random) return key;
    }
  };

  static isMention(str: string): boolean {
    return str.match(/^<(@(!|&)?|#)(\d+)>$/) ? true : false;
  };

  static splitMentions(str: string): string[] {
    return str.replace('>', '>,').split(',').filter(el => el.length != 0);
  };

  static cleanMentions(mentionsArr: string[]): string[] {
    const cleanedArr: string[] = new Array();
    mentionsArr.forEach((el: string) => {
      cleanedArr.push(...this.splitMentions(el));
    });
    return cleanedArr;
  };

  static getUserIDFromMention(str: string): string {
    const matches: RegExpMatchArray = str.match(/^<@!?(\d+)>$/);
    if (!matches) throw `${str} is not a user.`;
    return matches[1];
  };
}