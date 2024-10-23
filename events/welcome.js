const { welcomeChannelID } = require("../src/config.json");
const { EmbedBuilder } = require("discord.js");

async function WelcomeNewMember(member, client) {
  const welcomeMessages = [
    `Welcome, ${member.user}!`,
    `Glad to have you here, ${member.user.tag}.`,
    `${member.user.username}, how are you?`,
    `Would you like to choose a role, ${member.user.username}?`,
  ];

  try {
    const channel = await client.channels.fetch(welcomeChannelID);

    let welcomeMessage =
      welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

    const welcomeMessageEmbed = new EmbedBuilder()
      .setColor("#ffdae9")
      .setDescription(welcomeMessage)
      .setImage(
        "https://media.discordapp.net/attachments/1258958655835996244/1280827504067870720/0A5754EF-EE76-4CF5-8D44-4AFB21CD379B.gif?ex=671a1891&is=6718c711&hm=e3428c7d5094a8029b233756b3193550f04ae85f089d6f97333f2475a6f3b9bd&=&width=1080&height=608"
      );

    setTimeout(function () {
      console.log(`Welcoming a new member.<@${member.id}>`);
      channel.send({ embeds: [welcomeMessageEmbed] });
    }, 1000);
  } catch (error) {
    console.error("Error fetching channel:", error);
  }
}

module.exports = { WelcomeNewMember };
