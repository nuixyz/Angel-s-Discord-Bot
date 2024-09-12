const { SlashCommandBuilder } = require("discord.js");
const { kissGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("pat")
  .setDescription("Pat someone")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("Kiss someone, chu! 😽")
      .setRequired(true)
  );

async function execute(interaction) {
  const targetUser = interaction.options.getUser("target");
  const randomGif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

  // Error handling for self-pat or missing user
  if (!targetUser) {
    return interaction.reply("You need to mention a user to kiss!");
  } else if (interaction.user.id === targetUser.id) {
    return interaction.reply("You cannot pat yourself!");
  }

  // Generate a random color for the embed
  const colors = [
    0xffffff, 0x000000, 0x0000ff, 0xff0000, 0x7a7a7a, 0x00ffff, 0xffd700,
    0x4b0082,
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Create an embed for the interaction
  const gifEmbed = new EmbedBuilder()
    .setColor(randomColor)
    .setDescription(`<@${interaction.user.id}> kisses <@${targetUser.id}>! <3`)
    .setImage(randomGif);

  // Reply with the embed using interaction.reply
  await interaction.reply({ embeds: [gifEmbed] });
}

module.exports = { data, execute };
