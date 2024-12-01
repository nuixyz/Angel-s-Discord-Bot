const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
  category: "admin",
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Start a giveaway")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription(
          "How long the giveaway should last. Example: 1m, 1h, 1d"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("winners")
        .setDescription("Number of winners for the giveaway")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("prize")
        .setDescription("The prize for the giveaway")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to start the giveaway in")
        .setRequired(true)
    ),

  async execute(interaction) {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayDuration = interaction.options.getString("duration");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: ":x: The selected channel is not a text channel.",
        ephemeral: true,
      });
    }

    // Start the giveaway
    interaction.client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayWinnerCount,
      hostedBy: interaction.user,
      messages: "Giveaway started!",
    });

    interaction.reply(`Giveaway started in ${giveawayChannel}!`),
      (ephemeral = true);
  },
};
