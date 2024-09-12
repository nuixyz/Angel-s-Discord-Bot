const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("pat")
  .setDescription("Pat someone")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("Mention the user you want to pat :3")
      .setRequired(true)
  );

async function execute(interaction) {
  const patGifs = [
    "https://tenor.com/view/anya-forger-loid-forger-spy-x-family-anime-spy-x-family-anime-gif-25413881",
    "https://tenor.com/view/qualidea-code-head-pat-anime-anime-girl-blush-anime-gif-24627864",
    "https://tenor.com/view/anime-hug-anime-anime-girl-anime-girls-anime-girls-hugging-gif-26094816",
    "https://tenor.com/view/neet-anime-cute-kawaii-pat-gif-9332926",
    "https://tenor.com/view/kanna-kamui-pat-head-pat-gif-12018819",
  ];

  const targetUser = interaction.options.getUser("target");
  const randomGif = patGifs[Math.floor(Math.random() * patGifs.length)];

  if (!targetUser) {
    return interaction.reply("You need to mention a user to pat!");
  } else if (interaction.user === targetUser) {
    return interaction.reply("You cannot pat yourself!");
  }

  await interaction.reply({
    content: `<@${interaction.user.id}> pats <@${targetUser.id}>! <3 ${randomGif}`,
  });
}

module.exports = { data, execute };
