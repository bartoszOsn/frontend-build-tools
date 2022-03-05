import { glob } from "glob";
import * as fs from "fs";

function getFileNames(globs: string | string[]): string[] {
	if (!Array.isArray(globs)) {
		globs = [globs];
	}

	let filenames: string[] = [];
	for(const pathGlob of globs) {
		filenames = [...filenames, ...glob.sync(pathGlob, {nodir: true})];
	}

	return filenames;
}

function getPossibleClasses(filename: string): string[] {
	console.log(filename);
	const content = fs.readFileSync(filename).toString();

	return content.split(/[\s'"]/).filter(str => str.length > 0);
}

export function extractPossibleClasses(inputGlob: string | string[]): string[] {
	const filenames = getFileNames(inputGlob);

	let possibleClasses: string[] = [];

	for (const filename of filenames) {
		const classes = getPossibleClasses(filename);
		possibleClasses = [...possibleClasses, ...classes];
	}

	return possibleClasses;

	// return ['bg-green-100', 'text-blue-400', 'modifiers:text-blue-900']; // TODO
}
