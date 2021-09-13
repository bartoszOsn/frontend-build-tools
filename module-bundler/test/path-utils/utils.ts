jest.mock('fs');
import * as fs from 'fs';

import {PathAliases} from "../../src/domain/path-aliases";
import {normalizeSeparator, resolvePath} from "../../src/path-utils";

export interface FileStructure {
    [key: string]: FileStructure | true
}

interface PathResolveTestOptions {
    newModulePath: string;
    currentModulePath: string;
    rootDirectoryPath: string;
    pathAliases: PathAliases;
    dependencyModulePaths: string[];
    expectedPath: string;
    message: string;
    fileStructure: FileStructure;
}

export function testPathResolve(config: Partial<PathResolveTestOptions>) {
    const defaults: PathResolveTestOptions = {
        newModulePath: '',
        currentModulePath: '',
        rootDirectoryPath: '',
        pathAliases: {},
        dependencyModulePaths: [],
        expectedPath: '',
        message: '',
        fileStructure: null
    }

    const usedConfig: PathResolveTestOptions = {...defaults, ...config};

    test(usedConfig.message, () => {

        // @ts-ignore
        fs.__setMockFileStructure(usedConfig.fileStructure)

        const modulePath = resolvePath(usedConfig.newModulePath, usedConfig.currentModulePath, usedConfig.rootDirectoryPath, usedConfig.pathAliases, usedConfig.dependencyModulePaths);
        expect(modulePath).toMatch(normalizeSeparator(usedConfig.expectedPath));


        jest.unmock('fs');
    });
}
