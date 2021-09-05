const { Listener } = require("@sapphire/framework");

module.exports = class CommandInteraction extends Listener {
  constructor(context) {
    super(context, {});
  }

  async run(interaction) {
    if (!interaction.isCommand()) return;
    const cmd = this.container.slashCommands.get(interaction.commandName);
    if (!cmd) return;
    try {
      await cmd.run(interaction);
    } catch (e) {
      this.container.logger.fatal(e);
      if (interaction.replied) 
        interaction.followUp({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
          .catch(e => this.container.logger.fatal("An error occurred following up on an error", e));
      else 
        interaction.reply({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``, ephemeral: true })
          .catch(e => this.container.logger.fatal("An error occurred replying on an error", e));
    } 
  }
};