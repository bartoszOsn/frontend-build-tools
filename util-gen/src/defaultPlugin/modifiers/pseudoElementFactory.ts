import { CSSRules, ModifierEntry } from "../../SnacksPlugin";

export function pseudoElementFactory(cssName: string, matchName: string = cssName): ModifierEntry {
	return {
		match: new RegExp(`(:)?${matchName}:`),
		cssModifier(currentCSS: CSSRules, data: {}): CSSRules {
			return {
				[`&::${cssName}`]: currentCSS
			};
		}
	};
}
