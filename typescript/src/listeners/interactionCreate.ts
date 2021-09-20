import { Listener, PieceContext } from '@sapphire/framework';
import type { Interaction } from 'discord.js';

export class CommandInteraction extends Listener {
	constructor(context: PieceContext) {
		super(context);
	}

	async run(interaction: Interaction) {
		if (!interaction.isCommand()) return;

		// @ts-expect-error i dont know how to fix this
		const cmd = this.container.stores.get('slashCommands').get(interaction.commandName);
		if (!cmd) return;

		try {
			await cmd.run(interaction);
			if (process.env.DEV) this.container.logger.info(`${interaction.user.id} ran slash command ${cmd.commandData.name}`);
		} catch (e: any) {
			this.container.logger.fatal(e);

			if (interaction.replied) {
				interaction
					.followUp({
						content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
						ephemeral: true
					})
					.catch((e: any) => this.container.logger.fatal('An error occurred following up on an error', e));
			} else if (interaction.deferred) {
				interaction
					.editReply({
						content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``
					})
					.catch((e: any) => console.error('An error occurred following up on an error', e));
			} else {
				interaction
					.reply({
						content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
						ephemeral: true
					})
					.catch((e: any) => this.container.logger.fatal('An error occurred replying on an error', e));
			}
		}
	}
}
