import { CSSRules } from "../../SnacksPlugin";

const values = [
	{suffix: 'start', value: 'flex-start'},
	{suffix: 'end', value: 'flex-end'},
	{suffix: 'center', value: 'center'},
	{suffix: 'between', value: 'space-between'},
	{suffix: 'around', value: 'space-around'},
	{suffix: 'evenly', value: 'space-evenly'}
]

export const justifyContent = values.map((value) => ({
	match: new RegExp(`justify-${value.suffix}`),
	cssRuleGetter(_data: {}): CSSRules {
		return {
			'justify-content': value.value
		};
	}
}))
