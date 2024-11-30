const { SlashCommandBuilder } = require("discord.js");
const { patGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("pat")
    .setDescription("Pat someone, pat pat")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Mention the user you want to pat :3")
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const randomGif = patGifs[Math.floor(Math.random() * patGifs.length)];

    const gifEmbed = new EmbedBuilder()
      .setColor("#FF69B4")
      .setDescription(`<@${interaction.user.id}> pats <@${targetUser.id}>!~ <3`)
      .setImage(randomGif);

    if (!targetUser) {
      return interaction.reply("You need to mention a user to pat!");
    } else if (interaction.user.id === targetUser.id) {
      return interaction.reply("You cannot pat yourself!");
    }

    await interaction.reply({ embeds: [gifEmbed] });
  },
};
