const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with a Pong!");

async function execute(interaction) {
  const sent = await interaction.reply({
    content: "Pinging...",
    fetchReply: true,
  });
  interaction.editReply(
    `Pong! \`${sent.createdTimestamp - interaction.createdTimestamp}ms\``
  );
}

module.exports = { data, execute };
