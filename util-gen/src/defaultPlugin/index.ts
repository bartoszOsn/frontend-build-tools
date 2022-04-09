import { SnacksPlugin } from "../SnacksPlugin";
import { backgroundColor } from "./rules/backgroundColor";
import { textColor } from "./rules/textColor";
import { modifiers } from "./modifiers/modifiers";
import { margin, padding } from "./rules/spacing";
import { sizing } from "./rules/sizing";
import { display } from "./rules/display";
import { alignItems } from "./rules/align-items";
import { justifyContent } from "./rules/justifyContent";
import { textDecoration } from "./rules/textDecoration";

export const defaultPlugin: SnacksPlugin = {
	rules: [
		backgroundColor,
		textColor,
		margin,
		padding,
		...sizing,
		...display,
		...alignItems,
		...justifyContent,
		...textDecoration
	],
	modifiers: modifiers
};
