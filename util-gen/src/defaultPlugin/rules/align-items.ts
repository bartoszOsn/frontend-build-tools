import { CSSRules } from "../../SnacksPlugin";

const values = [
	{suffix: 'start', value: 'flex-start'},
	{suffix: 'end', value: 'flex-end'},
	{suffix: 'center', value: 'center'},
	{suffix: 'baseline', value: 'baseline'},
	{suffix: 'stretch', value: 'stretch'}
]

export const alignItems = values.map((value) => ({
	match: new RegExp(`items-${value.suffix}`),
	cssRuleGetter(_data: {}): CSSRules {
		return {
			'align-items': value.value
		};
	}
}))
