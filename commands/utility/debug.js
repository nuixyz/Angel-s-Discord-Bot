const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("debug")
    .setDescription("A simple debug command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    console.log("Debug command executed!");
    await interaction.reply("Debug command executed!");
  },
};
