const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("hug")
  .setDescription("hug someone")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("Mention the user you want to hug 🫶")
      .setRequired(true)
  );

async function execute(interaction) {
  const hugGifs = [
    "https://tenor.com/view/anime-couples-couple-hug-fall-gif-26326658",
    "https://tenor.com/view/hugs-gif-25241864",
    "https://tenor.com/view/anime-hug-gif-5943150659702629865",
    "https://tenor.com/view/anime-hug-sweet-love-gif-14246498",
    "https://tenor.com/view/anya-forger-loid-forger-spy-x-family-anime-spy-x-family-anime-gif-25413881",
  ];

  const targetUser = interaction.options.getUser("target");
  const randomGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

  if (!targetUser) {
    return interaction.reply("You need to mention a user to hug!");
  } else if (interaction.user === targetUser) {
    return interaction.reply(
      `You cannot hug yourself silly. Let angel hug you instead!! <3 ${randomGif}`
    );
  }

  await interaction.reply({
    content: `<@${interaction.user.id}> hugs <@${targetUser.id}>! <3 ${randomGif}`,
  });
}

module.exports = { data, execute };
