const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user or a server!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Info about a user")
        .addUserOption((option) =>
          option.setName("target").setDescription("The user")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Info about the server")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "user") {
      await interaction.reply(
        `This command was used by ${interaction.user.username}, who joined the server on ${interaction.member.joinedAt}.`
      );
    } else if (interaction.options.getSubcommand() === "server") {
      await interaction.reply(
        `${interaction.guild.name} has ${interaction.guild.memberCount} members.`
      );
    }
  },
};
