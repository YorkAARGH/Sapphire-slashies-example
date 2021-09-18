import { config } from 'dotenv';
import { SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';

config({ path: './.env' });

// This is your custom store.
const { SlashCommandStore } = require('./lib/structures/SlashCommandStore.js');

class exampleBot extends SapphireClient {
	constructor() {
		super({
			intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
			partials: ['CHANNEL']
		});

		this.stores.register(new SlashCommandStore());
	}
}

const client = new exampleBot();

client.login();
