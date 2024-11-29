const { welcomeChannelID } = require("../src/config.json");
const { EmbedBuilder } = require("discord.js");

async function WelcomeNewMember(member, client) {
  const welcomeMessages = [
    `it’s so very lovely to have you here~!! make sure to grab your roles and check out the rules before verifying for access to the rest of the server!!`,
  ];

  try {
    const channel = await client.channels.fetch(welcomeChannelID);

    if (!channel) {
      console.error("Welcome channel not found.");
      return;
    }

    const welcomeMessage =
      welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

    const welcomeMessageEmbed = new EmbedBuilder()
      .setColor("#ffdae9")
      .setTitle(`Welcome, <@${member.user.id}>!`)
      .setDescription(welcomeMessage)
      .setImage(
        "https://media.discordapp.net/attachments/1258958655835996244/1280827504067870720/0A5754EF-EE76-4CF5-8D44-4AFB21CD379B.gif?ex=671a1891&is=6718c711&hm=e3428c7d5094a8029b233756b3193550f04ae85f089d6f97333f2475a6f3b9bd&=&width=1080&height=608"
      )
      .setFooter({ text: "Welcome to our community!" });

    console.log(`Welcoming a new member: <@${member.user.id}>`);
    await channel.send({ embeds: [welcomeMessageEmbed] });
  } catch (error) {
    console.error("Error fetching channel or sending message:", error);
  }
}

module.exports = { WelcomeNewMember };
