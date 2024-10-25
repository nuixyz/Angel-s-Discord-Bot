const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Select a member and ban them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Mention the user to ban them")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for banning.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason was provided.";

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    await interaction.reply({
      content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
      components: [row],
    });
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "confirm") {
        await interaction.guild.members.ban(target, { reason });
        await i.update({
          content: `${target.username} has been banned.`,
          components: [],
        });
      } else if (i.customId === "cancel") {
        await i.update({ content: "Ban canceled.", components: [] });
      }
      collector.stop();
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        interaction.editReply({
          content: "Ban action timed out.",
          components: [],
        });
      }
    });
  },
};
