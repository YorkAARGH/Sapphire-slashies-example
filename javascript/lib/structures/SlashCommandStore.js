/**
 * This is the most basic of examples for a store, this is all you really need
 * to actively register a store with Sapphire, and anything in the supplied
 * folder will load if it extends a Sapphire piece.
 */
 const SlashCommand = require("./SlashCommandPiece.js");
 const { Store } = require("@sapphire/framework");
 
 module.exports = class SlashCommandStore extends Store {
   constructor() {
     // This is the name of the directory we want to look in for our slash
     // commands.
     super(SlashCommand, { name: "slashCommands" });
   }
 
   async registerCommands() {
     const client = this.container.client;
     if (!client) return;
 
     // This will split the slash commands between global and guild only.
     const slashCommands = this.container.stores.get("slashCommands");
     const [guildCmds, globalCmds] = slashCommands.partition(c => c.guildOnly);
     
     // iterate to all connected guilds and apply the commands.
     const guilds = await client?.guilds?.fetch(); // retrieves Snowflake & Oauth2Guilds
     for (const [id] of guilds) {
       const guild = await client?.guilds?.fetch(id); // gets the guild instances from the cache (fetched before)
       await guild?.commands.set(guildCmds.map(c => c.commandData));
     }
 
     // Global commands will update over the span of an hour and is discouraged to update on development mode.
     // https://canary.discord.com/developers/docs/interactions/slash-commands#registering-a-command
     // https://discord.com/developers/docs/interactions/application-commands#making-a-global-command
     if (process.env.NODE_ENV === "development") {
       this.container.logger.info("Skipped global commands because we're in development mode");
       return;
     }
 
     // This will register global commands.
     await client?.application?.commands.set(globalCmds.map(c => c.commandData));
   }
 };