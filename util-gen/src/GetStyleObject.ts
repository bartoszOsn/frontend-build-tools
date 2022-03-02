import { CSSRules, ModifierEntry, RuleEntry, SnacksPlugin } from "./SnacksPlugin";

function flattenPlugins(plugins: SnacksPlugin[]): SnacksPlugin {
	return plugins.reduce((prev, curr) =>
		({
			rules: [...prev.rules, ...curr.rules],
			modifiers: [...prev.modifiers, ...curr.modifiers]
		}),
		{rules: [], modifiers: []});
}

function getCssFromRule(className: string, rules: RuleEntry[]): CSSRules | null {
	for (const ruleEntry of rules) {
		if (ruleEntry.match instanceof RegExp) {
			const regex: RegExp = (ruleEntry.match as RegExp);
			if (regex.test(className)) {
				return ruleEntry.cssRuleGetter(className.match(regex)?.groups ?? {});
			}
		} else {
			const result = ruleEntry.match(className);
			if (result) {
				return ruleEntry.cssRuleGetter(result.data);
			}
		}
	}
	return null;
}

function modifyCss(className: string, currentCss: CSSRules, modifiers: ModifierEntry[]): CSSRules {
	for (const modifierEntry of modifiers) {
		if (modifierEntry.match instanceof RegExp) {
			const regex: RegExp = (modifierEntry.match as RegExp);
			if (regex.test(className)) {
				currentCss = modifierEntry.cssModifier(currentCss, className.match(regex)?.groups ?? {});
			}
		} else {
			const result = modifierEntry.match(className);
			if (result) {
				currentCss = modifierEntry.cssModifier(currentCss, result.data);
			}
		}
	}

	return currentCss;
}

export function getStyleObject(possibleClass: string, plugins: SnacksPlugin[]): CSSRules | null {
	const flatPlugin: SnacksPlugin = flattenPlugins(plugins);

	const css = getCssFromRule(possibleClass, flatPlugin.rules);

	if (!css) {
		return null;
	}

	return {
		['.' + possibleClass.replace(/:/g, '\\:')]: modifyCss(possibleClass, css, flatPlugin.modifiers)
	};
}
