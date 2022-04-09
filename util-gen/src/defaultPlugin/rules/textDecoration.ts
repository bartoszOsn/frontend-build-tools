import { CSSRules, RuleEntry } from "../../SnacksPlugin";

const values = [
	{className: 'underline', value: 'underline'},
	{className: 'overline', value: 'overline'},
	{className: 'line-through', value: 'line-through'},
	{className: 'no-underline', value: 'none'}
]

export const textDecoration: RuleEntry<{}>[] = values.map(value => ({
	match: new RegExp(value.className),
	cssRuleGetter(data): CSSRules {
		return {
			'text-decoration-line': value.value
		};
	}
}))
