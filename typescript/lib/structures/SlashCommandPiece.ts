import { Piece, PieceContext, PieceOptions } from '@sapphire/framework';
import { ApplicationCommandOption, ApplicationCommandPermissions } from 'discord.js';

export class SlashCommand extends Piece {
	public readonly commandData;
	public readonly guildOnly;
	constructor(context: PieceContext, options: Options) {
		super(context, options);

		// This is the payload the "deployer" requires to register the commands
		// at Discord.
		this.commandData = {
			name: this.name,
			description: options.description ?? 'No description provided',
			options: options.options ?? [],
			defaultPermission: options.defaultPermission ?? true
		};

		// This line is a juicy one, and only comes into effect if you're loading
		// both global and guild commands alike, true for guild, false for global.
		this.guildOnly = options.guildOnly ?? false;
	}
}

export type Options = PieceOptions & {
	description: string;
	options?: ApplicationCommandOption[];
	defaultPermission?: ApplicationCommandPermissions;
	guildOnly?: boolean;
};
