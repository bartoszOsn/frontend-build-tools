import {extractCSS, defaultPlugin} from './src';
import * as path from "path";

extractCSS({
	input: path.resolve(__dirname, '*.html'),
	output: path.resolve(__dirname, 'style.css'),
	plugins: [defaultPlugin]
});
