const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { token } = require("./config.json");

client.on("ready", () => {
  console.log("The bot is now running!");
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong");
  }
});

client.login(token);
