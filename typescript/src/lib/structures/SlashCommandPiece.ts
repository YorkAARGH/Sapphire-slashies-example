import { Piece, PieceContext } from '@sapphire/framework';
import type { ApplicationCommandData, ApplicationCommandOptionData, ApplicationCommandPermissions, CommandInteraction } from 'discord.js';
import type { Awaited } from '@sapphire/utilities';

export class SlashCommand extends Piece {
	public readonly commandData: Options;
	public readonly guildOnly: boolean;
	constructor(context: PieceContext, options: Options) {
		super(context, options);

		// This is the payload the "deployer" requires to register the commands
		// at Discord.
		this.commandData = {
			name: this.name,
			description: options.description ?? 'No description provided',
			options: options.options ?? [],
			defaultPermission: options.defaultPermission! ?? true
		};

		// This line is a juicy one, and only comes into effect if you're loading
		// both global and guild commands alike, true for guild, false for global.
		this.guildOnly = options.guildOnly ?? false;
	}
	// @ts-expect-error i dont know how to implement or immediately
	// follow the declaration
	public run(interaction: CommandInteraction): Awaited<unknown>;
}

export type Options = ApplicationCommandData & {
	description: string;
	options?: ApplicationCommandOptionData[];
	defaultPermission?: ApplicationCommandPermissions;
	guildOnly?: boolean;
};
