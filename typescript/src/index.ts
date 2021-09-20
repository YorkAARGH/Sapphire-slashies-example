import { config } from 'dotenv';
import { SapphireClient } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';

config({ path: './.env' });

// This is your custom store.
import { SlashCommandStore } from 'lib/structures/SlashCommandStore';


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
