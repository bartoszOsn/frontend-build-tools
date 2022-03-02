import { CSSRules, ModifierEntry } from "../../SnacksPlugin";

export function mediaQueryFactory(prefix: string, query: string): ModifierEntry {
	return {
		match: new RegExp(`(:)?${prefix}:`),
		cssModifier(currentCSS: CSSRules, data: {}): CSSRules {
			return {
				[`@media ${query}`]: currentCSS
			};
		}
	};
}

export function mediaBreakpointFactory(prefix: string, minSizeInPx: number): ModifierEntry {
	return mediaQueryFactory(prefix, `(min-width: ${minSizeInPx}px)`);
}
