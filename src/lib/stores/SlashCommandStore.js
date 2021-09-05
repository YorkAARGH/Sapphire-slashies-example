/**
 * This is the most basic of examples for a store, this is all you really need
 * to actively register a store with Sapphire, and anything in the supplied
 * folder will load if it extends a Sapphire piece.
 */
const SlashCommand = require("../pieces/SlashCommandPiece.js");
const { Store } = require("@sapphire/framework");

module.exports = class SlashCommandStore extends Store {
  constructor() {
    // This is the name of the directory we want to look in for our slash
    // commands.
    super(SlashCommand, { name: "slashCommands" });
    this.container.stores.register(this);
  }
};