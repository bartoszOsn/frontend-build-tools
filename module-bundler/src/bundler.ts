import { Loader } from "./loader";
import { selectLoader } from "./loader-helpers";
import { Module } from "./domain/module";
import { render } from "ejs";
import * as Path from "path";

export interface BundleOptions {
	entry: string;
	loaders: Array<Loader>;
}

export interface BundleOutputOptions extends BundleOptions {
	output: string;
}

export class Bundler {
	getOutputModuleContent(options: BundleOptions): string {
		const loader = selectLoader(options.entry, options.loaders);
		const transformedModules = this.getTransformedModule(options.entry, loader);

		const content = render(Path.resolve(__dirname, './template.ejs'), { randomHash: this.getRandomHash(), modules: transformedModules});
		return content;
	}

	bundle(options: BundleOutputOptions) {

	}

	private getTransformedModule(entryPath: string, loader: Loader): Module[] {
		const modules: Module[] = [];
		const pathQuery: string[] = [entryPath];

		while (pathQuery.length > 0) {
			const path = pathQuery.pop();
			const module = loader.GetTransformedModule(path);
			modules.push(module);
		}
		return modules;
	}

	private getRandomHash(): string {
		return (Math.random() * 100000).toString(16);
	}
}
