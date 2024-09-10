const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
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

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return; //returns early if not a slash command
  const command = interaction.client.commands.get(interaction.commandName); //variable command to store things

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`); //command does not exists
    return;
  }

  try {
    await command.execute(interaction); //execute command
  } catch (error) {
    //error handling
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(token);
