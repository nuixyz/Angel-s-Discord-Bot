const { SlashCommandBuilder } = require("discord.js");
const { hugGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Give someone a warm hug they deserve 🫂")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Mention the user you want to hug 🫶")
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const randomGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

    const colors = [
      0xffffff, 0x000000, 0x0000ff, 0xff0000, 0x7a7a7a, 0x00ffff, 0xffd700,
      0x4b0082,
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const gifEmbed = new EmbedBuilder()
      .setColor(randomColor)
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
