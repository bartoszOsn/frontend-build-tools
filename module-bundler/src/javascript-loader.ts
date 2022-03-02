import { Loader } from "./loader";

export class JavascriptLoader extends Loader {
	public pattern = /\.jsm?/;

	GetTransformedModule(path: string): string {
		return "";
	}
}
