//node deploy-commands/deploy-commands.js global or guild

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("../src/config.json");
const fs = require("node:fs");
const path = require("node:path");

// Get the deployment mode (either 'global' or 'guild')
const mode = process.argv[2] || "global"; // Default to global if not provided

const commands = [];
const foldersPath = path.join(__dirname, "..", "commands");
const commandFolders = fs.readdirSync(foldersPath); //Return an array containing the folders in the command directory

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    let data;
    if (mode === "guild") {
      // Deploy to a specific guild for testing
      data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        {
          body: commands,
        }
      );
    } else {
      // Deploy globally
      data = await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });
    }

    console.log(
      `Successfully reloaded ${data.length} application (/) commands in ${mode} mode.`
    );
  } catch (error) {
    console.error("Failed to deploy commands:", error);
  }
})();
