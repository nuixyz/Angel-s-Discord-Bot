const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("slap")
  .setDescription("Slap an annoying user")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("Mention the user you want to slap")
      .setRequired(true)
  );

async function execute(interaction) {
  const slapGifs = [
    "https://tenor.com/view/chainsaw-man-csm-csm-anime-chainsaw-man-anime-denji-gif-26957270",
    "https://tenor.com/view/yuuri-gif-17416729081201359957",
    "https://tenor.com/view/no-gif-17226651476707151245",
    "https://tenor.com/view/slap-gif-22830733",
    "https://tenor.com/view/slap-gif-20126989",
    "https://tenor.com/view/anime-slap-mad-gif-16057834",
    "https://tenor.com/view/slap-jjk-nicevagg-anime-gif-22368283",
  ];

  const userToSlap = interaction.options.getUser("target");

  if (!userToSlap) {
    return interaction.reply("You need to mention a user to slap!");
  }

  const randomGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

  await interaction.reply({
    content: `<@${interaction.user.id}> slaps <@${userToSlap.id}>! ${randomGif}`,
  });
}

module.exports = { data, execute };
