const { SlashCommandBuilder } = require("discord.js");
const { slapGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap an annoying user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Mention the user you want to slap 💢")
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const randomGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

    const gifEmbed = new EmbedBuilder()
      .setColor("#FF69B4")
      .setDescription(`<@${interaction.user.id}> slaps <@${targetUser.id}>!`)
      .setImage(randomGif);

    if (!targetUser) {
      return interaction.reply("You need to mention a user to slap!");
    } else if (interaction.user.id === targetUser.id) {
      return interaction.reply("You cannot slap yourself... . . .");
    }

    await interaction.reply({ embeds: [gifEmbed] });
  },
};
