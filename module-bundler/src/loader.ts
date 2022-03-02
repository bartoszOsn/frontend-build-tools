import { Module } from "./domain/module";

export abstract class Loader {
	public pattern: string | RegExp
	public abstract GetTransformedModule(path: string): Module;
}
