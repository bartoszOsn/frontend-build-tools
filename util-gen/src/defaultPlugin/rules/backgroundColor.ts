import { CSSRules, RuleEntry } from "../../SnacksPlugin";

const hues: {[key: string]: number} = {
	blue: 204,
	green: 120,
	yellow: 60
};

export const backgroundColor: RuleEntry<{ hue: string, value: string }> = {
	match: /bg-(?<hue>blue|green|yellow)-(?<value>\d+)/, // TODO
	cssRuleGetter(data): CSSRules {
		const hue = hues[data.hue];
		const value = +data.value / 10;
		return {
			'background-color': `hsl(${hue}, 50%, ${100 - value}%)`
		};
	}
}
