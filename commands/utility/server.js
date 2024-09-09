const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides info about the server"),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.guild.name} has ${interaction.guild.memberCount} members.`
    );
  },
};
