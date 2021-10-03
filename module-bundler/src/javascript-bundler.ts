import { Loader } from "./loader";

export class JavascriptBundler extends Loader {
	public pattern = /\.jsm?/;

	GetBundledModule(path: string): string {
		return "";
	}
}
