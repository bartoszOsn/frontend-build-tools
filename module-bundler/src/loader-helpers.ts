import { Loader } from "./loader";
import minimatch from 'minimatch';

export function selectLoader(path: string, loaders: Array<Loader>): Loader {
	for (const loader of loaders) {
		if (typeof loader.pattern === 'string') {
			if (minimatch.match([ path ], loader.pattern, {}).length > 0) {
				return loader;
			}
		} else if (loader.pattern instanceof RegExp) {
			if ((loader.pattern as RegExp).test(path)) {
				return loader;
			}
		}
	}
	throw new Error('No matching loaders!');
}
