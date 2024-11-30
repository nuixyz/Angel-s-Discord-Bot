const { SlashCommandBuilder } = require("discord.js");
const { hugGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Give someone a warm hug they deserve")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Mention the user you want to hug")
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const randomGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

    const gifEmbed = new EmbedBuilder()
      .setColor("#FF69B4")
      .setDescription(`<@${interaction.user.id}> hugs <@${targetUser.id}>! <3`)
      .setImage(randomGif);

    if (!targetUser) {
      return interaction.reply("You need to mention a user to hug!");
    } else if (interaction.user.id === targetUser.id) {
      return interaction.reply({
        content:
          "You cannot hug yourself silly. Let Angel give you a hug instead!! <3",
        embeds: [gifEmbed],
      });
    }

    await interaction.reply({ embeds: [gifEmbed] });
  },
};
