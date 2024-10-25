const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a detailed list of all the available commands"),

  async execute(interaction) {
    const foldersPath = path.join(__dirname, "..", "..", "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    const categories = {
      "🔧 Admin": [],
      "😄 Fun": [],
      "🛠️ Utility": [],
    };

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ("data" in command && "execute" in command) {
          const commandName = `\`${command.data.name}\`: ${command.data.description} \n`;

          if (folder === "admin") {
            categories["🔧 Admin"].push(commandName);
          } else if (folder === "fun") {
            categories["😄 Fun"].push(commandName);
          } else if (folder === "utility") {
            categories["🛠️ Utility"].push(commandName);
          }
        }
      }
    }

    let helpMessage = "";
    for (const [category, commands] of Object.entries(categories)) {
      helpMessage += `**${category}**\n`;
      helpMessage +=
        commands.length > 0 ? commands.join("") : "No commands available.";
      helpMessage += "\n\n";
    }

    const embed = new EmbedBuilder()
      .setTitle("Here are the available commands:")
      .setDescription(helpMessage)
      .setColor(0x00ae86);

    await interaction.reply({ embeds: [embed] });
  },
};
