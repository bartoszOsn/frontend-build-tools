type defaultRuleType = any;

interface PredicateData<T = defaultRuleType> {
	data: T;
}

interface Predicate<T = defaultRuleType> {
	(className: string): PredicateData<T> | false | null | undefined;
}

export type CSSRules = {}; // TODO

export interface RuleEntry<T = defaultRuleType> {
	match: RegExp | Predicate<T>;
	cssRuleGetter: (data: T) => CSSRules;
}

export interface ModifierEntry<T = defaultRuleType> {
	match: RegExp | Predicate<T>;
	cssModifier: (currentCSS: CSSRules, data: T) => CSSRules;
}

export interface SnacksPlugin {
	rules: RuleEntry[];
	modifiers: ModifierEntry[];
}
