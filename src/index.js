const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, "..", "commands"); //constructed a path to the commands directory
const commandFolders = fs.readdirSync(foldersPath); //reads and returns an array containing all the folders in the directory
//in this case, reads commands and returns [utilities]

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder); //construct a path to foldersPath; here, to [utilities]
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js")); //filters any file that has extension .js
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

//to check bot servers
// client.on("ready", () => {
//   console.log(`Bot is in the following servers:`);
//   client.guilds.cache.forEach((guild) => {
//     console.log(guild.name);
//   });
// });

client.login(token);
