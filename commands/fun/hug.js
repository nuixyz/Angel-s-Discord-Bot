const { SlashCommandBuilder } = require("discord.js");
const { hugGifs } = require("../../src/GIFs");
const { EmbedBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("pat")
  .setDescription("Pat someone")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("Mention the user you want to hug 🫶")
      .setRequired(true)
  );

async function execute(interaction) {
  const targetUser = interaction.options.getUser("target");
  const randomGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

  // Error handling for self-pat or missing user
  if (!targetUser) {
    return interaction.reply("You need to mention a user to pat!");
  } else if (interaction.user.id === targetUser.id) {
    return interaction.reply("You cannot hug yourself!");
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
    .setDescription(`<@${interaction.user.id}> hugs <@${targetUser.id}>! <3`)
    .setImage(randomGif);

  // Reply with the embed using interaction.reply
  await interaction.reply({ embeds: [gifEmbed] });
}

module.exports = { data, execute };
