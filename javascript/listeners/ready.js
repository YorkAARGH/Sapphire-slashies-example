/**
 * This is just a modified version of the example ready event
 * provided by the Sapphire Dev team.
 * 
 * The original code can be found here;
 * https://github.com/sapphiredev/examples/blob/main/examples/with-javascript/src/listeners/ready.js
 */
 const { Listener } = require("@sapphire/framework");
 const { version } = require("../../package.json");
 const { blue, gray, green, magenta, magentaBright, white, yellow, red } = require("colorette");
 
 const dev = process.env.DEV;
 
 module.exports = class extends Listener {
   constructor(context) {
     super(context, {
       once: true
     });
 
     this.style = dev ? yellow : blue;
   }
 
   async run() {
     await this.createSlashCommands();
 
     await this.printBanner();
     this.printStoreDebugInformation();
     this.container.client.user.setActivity(`${this.container.client.options.defaultPrefix}help | ${this.container.client.guilds.cache.size} Servers`);
   }
 
   async createSlashCommands() {
     // this function will tell the SlashCommandStore to update the global and guild commands
     const slashCommandsStore = this.container.stores.get("slashCommands");
 
     if (slashCommandsStore) {
       try {
         console.log(blue("Started refreshing application (/) commands."));
         await slashCommandsStore.registerCommands();
         console.log(green("Successfully reloaded application (/) commands."));
       } catch (err) {
         console.log(red(err));
       }
     }
   }
 
   async printBanner() {
     const success = green("+");
 
     const llc = dev ? magentaBright : white;
     const blc = dev ? magenta : blue;
 
     const line01 = llc("    _______  __ ___    __  _______  __    ______");
     const line02 = llc("   / ____/ |/ //   |  /  |/  / __ \\/ /   / ____/");
     const line03 = llc("  / __/  |   // /| | / /|_/ / /_/ / /   / __/   ");
     const line04 = llc(" / /___ /   |/ ___ |/ /  / / ____/ /___/ /___   ");
     const line05 = llc("/_____//_/|_/_/__|_/_/__/_/_/___/_____/_____/   ");
     const line06 = llc("              / __ )/ __ \\/_  __/               ");
     const line07 = llc(" ____________/ __  / / / / / /___________       ");
     const line08 = llc("/_____/_____/ /_/ / /_/ / / /_____/_____/       ");
     const line09 = llc("           /_____/\\____/ /_/                    ");
     const pad = " ".repeat(7);
 
     console.log(
       String.raw`
 ${line01}
 ${line02}${dev ? `${pad}${blc("<")}${llc("/")}${blc(">")} ${llc("DEVELOPMENT MODE")}` : ""}
 ${line03}${pad}${blc(version)}
 ${line04}${pad}[${success}] Gateway
 ${line05}
 ${line06}
 ${line07}
 ${line08}
 ${line09}
     `.trim()
     );
   }
 
   printStoreDebugInformation() {
     const { client, logger } = this.container;
     const stores = [...client.stores.values()];
     const last = stores.pop();
 
     for (const store of stores) logger.info(this.styleStore(store, false));
     logger.info(this.styleStore(last, true));
   }
 
   styleStore(store, last) {
     return gray(`${last ? "└─" : "├─"} Loaded ${this.style(store.size.toString().padEnd(3, " "))} ${store.name}.`);
   }
 };