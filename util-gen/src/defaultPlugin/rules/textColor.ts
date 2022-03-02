import { CSSRules, RuleEntry } from "../../SnacksPlugin";

const hues: {[key: string]: number}  = {
	blue: 204,
	green: 120,
	yellow: 60
};

export const textColor: RuleEntry<{ hue: string, value: string }> = {
	match: /text-(?<hue>blue|green|yellow)-(?<value>\d+)/, // TODO
	cssRuleGetter(data): CSSRules {
		const hue = hues[data.hue];
		const value = +data.value / 10;
		return {
			'color': `hsl(${hue}, 50%, ${value}%)`
		};
	}
}
