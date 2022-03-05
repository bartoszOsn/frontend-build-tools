import { Bundler } from "../../module-bundler";
import * as Path from "path";
import { JavascriptLoader } from "../../module-bundler/src/javascript-loader";
import * as fs from "fs";

const bundler = new Bundler();

bundler.bundle({
	entry: Path.resolve(__dirname, '../src/index.js'),
	output: Path.resolve(__dirname, '../dist/index.js'),
	loaders: [
		new JavascriptLoader()
	]
});

fs.copyFileSync(Path.resolve(__dirname, '../src/index.html'), Path.resolve(__dirname, '../dist/index.html'));
