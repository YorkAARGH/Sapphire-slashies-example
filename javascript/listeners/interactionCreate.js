const { Listener } = require("@sapphire/framework");

module.exports = class CommandInteraction extends Listener {
  constructor(context) {
    super(context);
  }

  async run(interaction) {
    if (!interaction.isCommand()) return;
    
    const cmd = this.container.stores.get("slashCommands").get(interaction.commandName);
    if (!cmd) return;
    
    try {
    
      await cmd.run(interaction);
      if (process.env.DEV) this.container.logger.info(`${interaction.user.id} ran slash command ${cmd.commandData.name}`);
    
    } catch (e) {
      this.container.logger.fatal(e);

      if (interaction.replied) {
        interaction.followUp({
          content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
          ephemeral: true
        }).catch(e => this.container.logger.fatal("An error occurred following up on an error", e));

      } else 

      if (interaction.deferred) {
        interaction.editReply({
          content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
          ephemeral: true
        }).catch(e => console.error("An error occurred following up on an error", e));

      } else {
        interaction.reply({
          content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
          ephemeral: true
        }).catch(e => this.container.logger.fatal("An error occurred replying on an error", e));
      }  
    }
  }
};