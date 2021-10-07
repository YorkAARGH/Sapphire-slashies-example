/**
 * For Slash commands to be loaded via the Sapphire store system, they need
 * to extend the Piece, you can extend some Sapphire methods to this piece
 * but stuff like preconditions sadly require a Message context currently.
 * 
 */
const { Piece } = require("@sapphire/framework");

module.exports = class SlashCommand extends Piece {
  constructor(context, options = {}) {
    super(context, options);
    
    // This is the payload the "deployer" requires to register the commands 
    // at Discord.
    this.commandData = {
      name: this.name,
      description: options.description ?? "No description provided",
      options: options.options ?? [],
      defaultPermission: options.defaultPermission ?? true
    };

    // This line is a juicy one, and only comes into effect if you're loading
    // both global and guild commands alike, true for guild, false for global.
    this.guildOnly = options.guildOnly ?? false;
  }
};