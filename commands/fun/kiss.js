const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("kiss")
  .setDescription("Kiss someone, chu! :3")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("Mention the user you want to kiss 😽")
      .setRequired(true)
  );

async function execute(interaction) {
  const kissGifs = [
    "https://tenor.com/view/horimiya-animes-anime-shoujo-shounen-romance-boy-girl-gif-17793070781933240295",
    "https://tenor.com/view/frieren-sousou-no-frieren-frieren-beyond-journeys-end-anime-kiss-anime-elf-gif-1944987768966892138",
    "https://tenor.com/view/yoshikazu-kisses-kiyone-on-her-cheeks-gif-15357393113721249473",
    "https://tenor.com/view/dabi-gif-22002611",
  ];

  const targetUser = interaction.options.getUser("target");

  if (!targetUser) {
    return interaction.reply("You need to mention a user to kiss");
  } else if (interaction.user === targetUser) {
    return interaction.reply("You cannot kiss yourself :(");
  }

  const randomGif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

  await interaction.reply({
    content: `<@${interaction.user.id}> kisses <@${targetUser.id}>! <3 ${randomGif}`,
  });
}

module.exports = { data, execute };
