const { Events } = require("discord.js");
const { ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    if (!client || !client.user) {
      console.error("Client or client.user is not available");
      return;
    }
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [
        { name: `with bubbles in a bath 🫧`, type: ActivityType.Playing },
      ],
      status: "online",
    });
  },
};
