import { Loader } from "./loader";

export class JavascriptLoader extends Loader {
	public pattern = /\.jsm?/;

	GetBundledModule(path: string): string {
		return "";
	}
}
