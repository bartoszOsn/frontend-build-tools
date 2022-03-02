import { CSSRules, RuleEntry } from "../../SnacksPlugin";

const numRegex = '(?<num>\\d+)';
const ratioRegex = '(?<num1>\\d+)/(?<num2>\\d+)';

function sizingRemFactory(prefix: 'w' | 'h', cssRule: 'width' | 'height'): RuleEntry<{ num: string }>[] {
	return [
		{
			match: new RegExp(`${prefix}-${numRegex}`),
			cssRuleGetter(data): CSSRules {
				const remValue = `${+data.num / 4}rem`;
				return {
					[cssRule]: remValue
				};
			}
		},
		{
			match: new RegExp(`min-${prefix}-${numRegex}`),
			cssRuleGetter(data): CSSRules {
				const remValue = `${+data.num / 4}rem`;
				return {
					[`min-${cssRule}`]: remValue
				};
			}
		},
		{
			match: new RegExp(`max-${prefix}-${numRegex}`),
			cssRuleGetter(data): CSSRules {
				const remValue = `${+data.num / 4}rem`;
				return {
					[`max-${cssRule}`]: remValue
				};
			}
		}
	]
}

function sizingPercentageFactory(prefix: 'w' | 'h', cssRule: 'width' | 'height'): RuleEntry<{ num1: string, num2: string }>[] {
	return [
		{
			match: new RegExp(`${prefix}-${ratioRegex}`),
			cssRuleGetter(data): CSSRules {
				const remValue = `${+data.num1 / +data.num2 * 100}%`;
				return {
					[cssRule]: remValue
				};
			}
		},
		{
			match: new RegExp(`min-${prefix}-${ratioRegex}`),
			cssRuleGetter(data): CSSRules {
				const remValue = `${+data.num1 / +data.num2 * 100}%`;
				return {
					[`min-${cssRule}`]: remValue
				};
			}
		},
		{
			match: new RegExp(`max-${prefix}-${ratioRegex}`),
			cssRuleGetter(data): CSSRules {
				const remValue = `${+data.num1 / +data.num2 * 100}%`;
				return {
					[`max-${cssRule}`]: remValue
				};
			}
		}
	]
}

function sizingKeywordFactory(prefix: 'w' | 'h', cssRule: 'width' | 'height', value: string, CSSValue: string): RuleEntry<{}>[] {
	return (['', 'min-', 'max-'] as const).map(mod => (
		{
			match: new RegExp(`${mod}${prefix}-${value}`),
			cssRuleGetter(data): CSSRules {
				return {
					[`${mod}${cssRule}`]: CSSValue
				}
			}
		}
	));
}

export let sizing: RuleEntry[] = [];

const props = [
	{prefix: 'w' as const, cssRule: 'width' as const},
	{prefix: 'h' as const, cssRule: 'height' as const}
]

for (const prop of props) {
	sizing = [
		...sizing,
		...sizingRemFactory(prop.prefix, prop.cssRule),
		...sizingPercentageFactory(prop.prefix, prop.cssRule),
		...sizingKeywordFactory(prop.prefix, prop.cssRule, 'full', '100%'),
		...sizingKeywordFactory(prop.prefix, prop.cssRule, 'min', 'min-content'),
		...sizingKeywordFactory(prop.prefix, prop.cssRule, 'max', 'max-content'),
		...sizingKeywordFactory(prop.prefix, prop.cssRule, 'fit', 'fit-content'),
		...sizingKeywordFactory(prop.prefix, prop.cssRule, 'none', 'none'),
	]
}
