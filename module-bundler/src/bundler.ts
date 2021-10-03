import { Loader } from "./loader";
import { selectLoader } from "./loader-helpers";

export interface BundleOptions {
	entry: string;
	loaders: Array<Loader>;
}

export interface BundleOutputOptions extends BundleOptions {
	output: string;
}

export class Bundler {
	getOutputModuleContent(options: BundleOptions) {
		const loader = selectLoader(options.entry, options.loaders);
		return loader.GetBundledModule(options.entry);
	}

	bundle(options: BundleOutputOptions) {

	}
}
