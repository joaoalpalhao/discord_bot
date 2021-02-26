"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const glob_1 = __importDefault(require("glob"));
const globPromise = util_1.promisify(glob_1.default);
/**
 * Contains various general-purpose utility methods.
 */
class Util {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
    static async getAllCommands(path) {
        const commands = new discord_js_1.Collection();
        const commandFiles = await globPromise(path);
        commandFiles.map(async (value) => {
            const file = await Promise.resolve().then(() => __importStar(require(value)));
            commands.set(file.name, file);
        });
        return commands;
    }
    static validateIterator(iterator) {
        if (isNaN(iterator) || iterator === "undefined")
            return new Error('You must insert a valid ***number***.');
        if (iterator <= 0)
            return new Error('You must insert a ***number*** bigger than **0**.');
        if (Number.isInteger(iterator))
            return new Error('You must insert a ***number*** with no decimal places.');
    }
    static printWithdrawalUsers(members) {
        if (members.size <= 0)
            return 'Not enough members to choose from.';
        const strOne = '**The chosen one:**';
        const strMany = '**The chosen ones:**';
        let result = (members.size <= 1 ? strOne : strMany) + '\n';
        let num = 1;
        for (const [key, value] of members.entries()) {
            result += `${num} - ${value.user}\n`;
            num++;
        }
        return result;
    }
    static getRandomMemberKey(collection) {
        if (collection.size <= 0)
            throw new Error('Empty collection.');
        const random = Math.floor(Math.random() * collection.size);
        let iterator = 0;
        for (let key of collection.keys()) {
            if (iterator++ === random)
                return key;
        }
    }
    ;
    static isMention(str) {
        return str.match(/^<(@(!|&)?|#)(\d+)>$/) ? true : false;
    }
    ;
    static splitMentions(str) {
        return str.replace('>', '>,').split(',').filter(el => el.length != 0);
    }
    ;
    static cleanMentions(mentionsArr) {
        const cleanedArr = new Array();
        mentionsArr.forEach((el) => {
            cleanedArr.push(...this.splitMentions(el));
        });
        return cleanedArr;
    }
    ;
    static getUserIDFromMention(str) {
        const matches = str.match(/^<@!?(\d+)>$/);
        if (!matches)
            throw `${str} is not a user.`;
        return matches[1];
    }
    ;
}
exports.default = Util;
//# sourceMappingURL=Util.js.map