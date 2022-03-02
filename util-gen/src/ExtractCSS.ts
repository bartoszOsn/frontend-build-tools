import jss, { SheetsRegistry } from 'jss'
import preset from 'jss-preset-default'
import { CSSRules, SnacksPlugin } from "./SnacksPlugin";
import { extractPossibleClasses } from "./ExtractPossibleClasses";
import { getStyleObject } from "./GetStyleObject";
import { saveCSS } from "./SaveCSS";

jss.setup(preset())

export interface ExtractOptions {
	plugins: SnacksPlugin[];
	input: string;
	output: string;
	formatCSS?: boolean;
}

export function extractCSS(options: ExtractOptions) {
	const possibleClasses: string[] = extractPossibleClasses(options.input);
	const sheets = new SheetsRegistry()
	for (const possibleClass of possibleClasses) {
		const styleObj: CSSRules | null = getStyleObject(possibleClass, options.plugins);

		if (styleObj === null) {
			continue;
		}

		const sheet = jss.createStyleSheet({
			'@global': styleObj
		});

		sheets.add(sheet);
	}

	const cssAsString = sheets.toString({ format: options.formatCSS });
	saveCSS(cssAsString, options.output);
}
