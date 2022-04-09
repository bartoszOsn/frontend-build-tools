import { CSSRules, RuleEntry } from "../../SnacksPlugin";

const values = [
	'block',
	'inline-block',
	'inline',
	'flex',
	'inline-flex',
	'table-caption',
	'table-cell',
	'table-column',
	'table-column-group',
	'table-footer-group',
	'table-header-group',
	'table-row',
	'flow-root',
	'grid',
	'inline-grid',
	'contents',
	'list-item',
	'none'
];

export const display: RuleEntry[] = values.map((value) => ({
	match: new RegExp(`${value}`),
	cssRuleGetter(_data): CSSRules {
		return {
			'display': value
		};
	}
}));
