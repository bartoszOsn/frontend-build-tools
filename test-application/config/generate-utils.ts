import { defaultPlugin, extractCSS } from "../../util-gen/src";
import * as Path from "path";

extractCSS({
	input: Path.resolve(__dirname, '../src/**/*'),
	output: Path.resolve(__dirname, '../dist/style.css'),
	plugins: [defaultPlugin],
	includeNormalize: true
})
