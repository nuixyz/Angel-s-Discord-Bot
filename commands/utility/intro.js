const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { introduction } = require("../../src/GIFs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("intro")
    .setDescription("About the bot"),

  async execute(interaction) {
    const intro = introduction.message;

    const introEmbed = new EmbedBuilder()
      .setColor("#FF69B4")
      .setDescription(intro)
      .setImage(
        "https://media1.tenor.com/m/IlSZ5q9UyMcAAAAd/shy-blush-blush.gif"
      )
      .setFooter({ text: "*Made by @nuixyz with love.*" });
    await interaction.reply({ embeds: [introEmbed] });
  },
};
