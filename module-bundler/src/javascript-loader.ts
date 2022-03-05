import { Loader } from "./loader";
import { Module } from "./domain/module";
import { transformModule } from "./transform-module";

export class JavascriptLoader extends Loader {
	public pattern = /\.jsm?/;

	GetTransformedModule(path: string): Module {
		return transformModule(path, path, '__bundler$require', '__bundler$exports', '__bundler$module');
	}

}
