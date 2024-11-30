const { SlashCommandBuilder } = require("discord.js");
const { kissGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  category: "fun",
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("😳 Kiss someone!!~")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Kiss someone, chu! 😽")
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const randomGif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

    const colors = [
      0xffffff, 0x000000, 0x0000ff, 0xff0000, 0x7a7a7a, 0x00ffff, 0xffd700,
      0x4b0082,
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const gifEmbed = new EmbedBuilder()
      .setColor(randomColor)
      .setDescription(
        `<@${interaction.user.id}> kisses <@${targetUser.id}>! <3`
      )
      .setImage(randomGif);

    if (!targetUser) {
      return interaction.reply("You need to mention a user to kiss!");
    } else if (interaction.user.id === targetUser.id) {
      return interaction.reply("You cannot kiss yourself :(");
    }

    await interaction.reply({ embeds: [gifEmbed] });
  },
};
