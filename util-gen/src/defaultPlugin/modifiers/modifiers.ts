import { ModifierEntry } from "../../SnacksPlugin";
import { modifierFactory } from "./modifierFactory";
import { pseudoElementFactory } from "./pseudoElementFactory";
import { mediaBreakpointFactory, mediaQueryFactory } from "./mediaQueryFactory";

const hover: ModifierEntry = modifierFactory('hover');
const focus: ModifierEntry = modifierFactory('focus');
const focusWithin: ModifierEntry = modifierFactory('focus-within');
const focusVisible: ModifierEntry = modifierFactory('focus-visible');
const active: ModifierEntry = modifierFactory('active');
const visited: ModifierEntry = modifierFactory('visited');
const target: ModifierEntry = modifierFactory('target');
const firstChild: ModifierEntry = modifierFactory('first-child', 'first');
const lastChild: ModifierEntry = modifierFactory('last-child', 'last');
const onlyChild: ModifierEntry = modifierFactory('only-child', 'only');
const oddChild: ModifierEntry = modifierFactory('nth-child(odd)', 'odd');
const evenChild: ModifierEntry = modifierFactory('nth-child(even)', 'even');
const firstOfType: ModifierEntry = modifierFactory('first-of-type');
const lastOfType: ModifierEntry = modifierFactory('last-of-type');
const onlyOfType: ModifierEntry = modifierFactory('only-of-type');
const empty: ModifierEntry = modifierFactory('empty');
const disabled: ModifierEntry = modifierFactory('disabled');
const checked: ModifierEntry = modifierFactory('checked');
const indeterminate: ModifierEntry = modifierFactory('indeterminate');
const defaultValue: ModifierEntry = modifierFactory('default');
const required: ModifierEntry = modifierFactory('required');
const valid: ModifierEntry = modifierFactory('valid');
const invalid: ModifierEntry = modifierFactory('invalid');
const inRange: ModifierEntry = modifierFactory('in-range');
const outOfRange: ModifierEntry = modifierFactory('out-of-range');
const placeholderShown: ModifierEntry = modifierFactory('placeholder-shown');
const autofill: ModifierEntry = modifierFactory('autofill');
const readOnly: ModifierEntry = modifierFactory('read-only');

const before: ModifierEntry = pseudoElementFactory('before');
const after: ModifierEntry = pseudoElementFactory('after');

export const modifiers: ModifierEntry[] = [
	hover,
	focus,
	focusWithin,
	focusVisible,
	active,
	visited,
	target,
	firstChild,
	lastChild,
	onlyChild,
	oddChild,
	evenChild,
	firstOfType,
	lastOfType,
	onlyOfType,
	empty,
	disabled,
	checked,
	indeterminate,
	defaultValue,
	required,
	valid,
	invalid,
	inRange,
	outOfRange,
	placeholderShown,
	autofill,
	readOnly,

	before,
	after,

	mediaBreakpointFactory('sm', 640),
	mediaBreakpointFactory('md', 768),
	mediaBreakpointFactory('lg', 1024),
	mediaBreakpointFactory('xl', 1280),
	mediaBreakpointFactory('2xl', 1536),

	mediaQueryFactory('dark', '(prefers-color-scheme: dark)'),
	mediaQueryFactory('motion-reduce', '(prefers-reduced-motion)'),
	mediaQueryFactory('landscape', '(orientation: landscape)'),
	mediaQueryFactory('portrait', '(orientation: portrait)'),
]
