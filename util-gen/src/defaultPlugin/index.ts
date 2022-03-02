import { SnacksPlugin } from "../SnacksPlugin";
import { backgroundColor } from "./rules/backgroundColor";
import { textColor } from "./rules/textColor";
import { hover } from "./modifiers/hover";

export const defaultPlugin: SnacksPlugin = {
	rules: [
		backgroundColor,
		textColor
	],
	modifiers: [
		hover
	]
};
