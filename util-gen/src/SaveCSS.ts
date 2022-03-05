import * as fs from "fs";
import * as Path from "path";

export function saveCSS(cssContent: string, filePath: string) {
	const dirName = Path.dirname(filePath);
	fs.mkdirSync(dirName, { recursive: true });
	fs.writeFileSync(filePath, cssContent);
}
