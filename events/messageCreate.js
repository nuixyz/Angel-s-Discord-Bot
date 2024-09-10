const { prefix } = require("../src/config.json");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) {
      console.log(`ERROR! Could not find ${commandName}.`);
      return;
    }

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(error);
      await message.reply("There was an error executing that command.");
    }
  },
};
