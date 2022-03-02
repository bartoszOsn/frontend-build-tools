import * as fs from "fs";

export function saveCSS(cssContent: string, filePath: string) {
	fs.writeFileSync(filePath, cssContent);
}
