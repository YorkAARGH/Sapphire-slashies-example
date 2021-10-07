import type { SlashCommandStore } from "./lib/structures/SlashCommandStore";

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		slashCommands: SlashCommandStore
	}
}