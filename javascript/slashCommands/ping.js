/**
 * This is the most basic slash command example I can offer you guys, it's not
 * using the builder but that can easily be changed. If you want your slash
 * commands to be guild specific, you should consult the discordjs.guide for
 * how to register them to guilds, here's a link;
 * https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands
 * 
 */
const SlashCommand = require("../lib/structures/SlashCommandPiece.js");

module.exports = class Ping extends SlashCommand {
  constructor(context) {
    super(context, {
      name: "ping",
      description: "Pongs when pinged.",
      options: [],
      guildOnly: false
    });
  }

  async run(interaction) {
    await interaction.deferReply();
    const reply = await interaction.editReply("Ping?");
    await interaction.editReply(`Pong! Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(this.container.client.ws.ping)}ms.`);
  }
};