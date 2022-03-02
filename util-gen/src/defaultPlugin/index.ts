import { SnacksPlugin } from "../SnacksPlugin";
import { backgroundColor } from "./rules/backgroundColor";
import { textColor } from "./rules/textColor";
import { modifiers } from "./modifiers/modifiers";

export const defaultPlugin: SnacksPlugin = {
	rules: [
		backgroundColor,
		textColor
	],
	modifiers: modifiers
};
