import { CSSRules, RuleEntry } from "../../SnacksPlugin";

const numberRegex = '(?<num>\\d*.?\\d*)';

type SpacingDirection = '' | 'x' | 'y' | 't' | 'r' | 'b' | 'l';

function spacingFactory(prefix: 'm' | 'p', cssPrefix: 'margin' | 'padding'): RuleEntry<{num: string, direction: SpacingDirection }> {
	return {
		match: new RegExp(`${prefix}(?<direction>[]?)-${numberRegex}`),
		cssRuleGetter(data): CSSRules {
			const remValue = `${+data.num / 4}rem`;
			const rules: CSSRules = {};

			if (data.direction === '' || data.direction === 'y' || data.direction === 't') {
				rules[`${cssPrefix}-top`] = remValue;
			}
			if (data.direction === '' || data.direction === 'y' || data.direction === 'b') {
				rules[`${cssPrefix}-bottom`] = remValue;
			}
			if (data.direction === '' || data.direction === 'x' || data.direction === 'l') {
				rules[`${cssPrefix}-left`] = remValue;
			}
			if (data.direction === '' || data.direction === 'x' || data.direction === 'r') {
				rules[`${cssPrefix}-right`] = remValue;
			}

			return rules;
		}
	};
}

export const margin = spacingFactory('m', 'margin');
export const padding = spacingFactory('p', 'padding');
