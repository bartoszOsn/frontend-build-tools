import { CSSRules, ModifierEntry } from "../../SnacksPlugin";

export const hover: ModifierEntry = {
	match: /(:)?hover:/,
	cssModifier(currentCSS: CSSRules, data: {}): CSSRules {
		return {
			'&:hover': currentCSS
		};
	}
}
