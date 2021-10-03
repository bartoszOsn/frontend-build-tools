export abstract class Loader {
	public pattern: string | RegExp
	public abstract GetBundledModule(path: string): string;
}
