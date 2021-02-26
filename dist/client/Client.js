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
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("util");
const glob_1 = __importDefault(require("glob"));
const Util_1 = __importDefault(require("../utils/Util"));
const globPromise = util_1.promisify(glob_1.default);
class Bot extends discord_js_1.Client {
    constructor() {
        super();
        this.events = new discord_js_1.Collection();
    }
    async start() {
        this.login(process.env.DISCORD_BOT_CLIENT_TOKEN);
        // Get all commands
        Util_1.default.getAllCommands(`${__dirname}/../commands/*{.ts,.js}`).then(value => this.commands = value);
        // Get all events
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.map(async (value) => {
            const file = await Promise.resolve().then(() => __importStar(require(value)));
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
        });
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Client.js.map