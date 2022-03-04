import fs from "fs";
import path from "path";
import { Bundler } from "../src";
import { JavascriptLoader } from "../src/javascript-loader";

const folders = fs.readdirSync(path.resolve(__dirname, './tests'));

describe('Integration tests', () => {
	const bundler = new Bundler();

	beforeEach(() => {
		// @ts-ignore
		global['expect'] = expect;
	});

	for (const folder of folders) {
		const folderPath = path.resolve(__dirname, './tests', `./${folder}`);
		test(folder, () => {
			const content = bundler.getOutputModuleContent({
				entry: path.resolve(folderPath, './index.js'),
				loaders: [
					new JavascriptLoader()
				]
			});

			try {
				eval(content);
			} catch(e) {
				console.error(`content of the file: ${content}`);
				throw e;
			}
		});
	}
});
