require("dotenv").config({ path: "./src/.env" });
const { SapphireClient, container } = require("@sapphire/framework");
require("@sapphire/plugin-logger/register");

// This is your custom store.
const SlashCommandStore = require("./lib/structures/SlashCommandStore.js");

class exampleBot extends SapphireClient {
  constructor() {
    super({
      intents: ["GUILDS","GUILD_MESSAGES","DIRECT_MESSAGES"],
      partials: ["CHANNEL"],
    });

    this.stores.register(new SlashCommandStore());
  }
}

const client = new exampleBot();

client.login();