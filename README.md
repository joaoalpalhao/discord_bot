![](logo/logo_typography.png)

## Discord bot

This is my first attempt at creating a nodejs Discord bot. Bot will be update as I explore new features within [discord.js](https://discord.js.org/#/) library.

## Install

Clone this repo to your working directory. After that just simply do a npm install:

```sh
$ npm install
or
$ yarn
```

Next, replace the **.env.example** with your **.env** file.

### .env

Use this table as a guide for the current **.env** configuration and change it as you want.

| Variable                   | Description                |
| -------------------------- | -------------------------- |
| DISCORD_BOT_CLIENT_TOKEN   | Authentication Token       |
| DISCORD_BOT_COMMAND_PREFIX | Command prefix             |
| DISCORD_BOT_GAME           | Bot status display message |

With that completed, all that's left to do is to run the start command:

```sh
$ npm start
or
$ yarn start
```
