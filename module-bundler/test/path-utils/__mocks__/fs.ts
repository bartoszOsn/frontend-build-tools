import * as path from "path";
import {FileStructure} from "../utils";

let __fileStructure = null;

function __setMockFileStructure(fileStructure: FileStructure) {
    __fileStructure = fileStructure
}

function existsSync(filePath) {
    const pathSegments = filePath.split(path.sep).filter(val => !!val);
    let currentLoc: FileStructure | boolean = __fileStructure;

    for (const segment of pathSegments) {
        if (typeof currentLoc !== 'object') {
            return false;
        }

        if (!(segment in currentLoc)) {
            return false;
        }

        currentLoc = currentLoc[segment];
    }

return true;
}

function lstatSync(filePath) {
    return {
        isFile() {
            const pathSegments = filePath.split(path.sep).filter(val => !!val);
            let currentLoc: FileStructure | boolean = __fileStructure;

            for (const segment of pathSegments) {
                currentLoc = currentLoc[segment];
            }

            return currentLoc === true;
        }
    }
}

module.exports = { existsSync, lstatSync, __setMockFileStructure };
