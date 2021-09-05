/**
 * This command runs after the the installation has completed.
 * Make sure to have your token at hand for the deployment of
 * slash commands!
 * 
 * This will briefly log your bot in just for the purpose of 
 * registering the slash commands inside `.src/slashCommands/`
 * 
 */

const { SapphireClient, container } = require("@sapphire/framework");
const SlashCommandStore = require("../lib/stores/SlashCommandStore.js");
const client = new SapphireClient({ baseUserDirectory: null, intents: ["GUILDS", "GUILD_MESSAGES"] });
container.slashCommands = new SlashCommandStore();

// Enter your Guild's ID here if you want to deploy guildOnly commands.
const guildId = ""

(async () => {
    try {
      await client.login();
      console.log(blue("Started refreshing application (/) commands."));
      // This will split the slash commands between global and guild only.
      const [guildCmds, globalCmds] = container.slashCommands.partition(c => c.guildOnly);
      // If a guildId is provided above, this will register commands to the guild.
      if (guildId) await this.client.guilds.cache.get(guildId)?.commands.set(guildCmds.map(c => c.commandData));
      // This will register global commands.
      await client.application?.commands.set(globalCmds.map(c => c.commandData)).catch(e => console.log(e));
      
      console.log(green("Successfully reloaded application (/) commands."));
    } catch (error) {
      console.log(red(error));
    }
})