import { Loader } from "./loader";
import { Module } from "./domain/module";
import { transformModule } from "./transform-module";

import * as jsx from 'jsx-transform-modern';

export class JsxLoader extends Loader {
	public pattern = /\.jsx$/;

	constructor(private readonly options: { factory: string }) {
		super();
	}

	GetTransformedModule(path: string): Module {
		return transformModule(path,
			path,
			'__bundler$require',
			'__bundler$exports',
			'__bundler$module',
			(content) => this.transform(content)
		);
	}

	private transform(content: string): string {
		const jsContent = jsx.fromString(content, {
			factory: this.options.factory
		});
		return jsContent;
	}
}
