import { SnacksPlugin } from "../SnacksPlugin";
import { backgroundColor } from "./rules/backgroundColor";
import { textColor } from "./rules/textColor";
import { modifiers } from "./modifiers/modifiers";
import { margin, padding } from "./rules/spacing";
import { sizing } from "./rules/sizing";

export const defaultPlugin: SnacksPlugin = {
	rules: [
		backgroundColor,
		textColor,
		margin,
		padding,
		...sizing
	],
	modifiers: modifiers
};
