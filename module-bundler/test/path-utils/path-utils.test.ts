jest.mock('fs');

import {hashPath, normalizeSeparator, resolvePath} from "../../src/path-utils";
import {PathAliases} from "../../src/domain/path-aliases";
import {testPathResolve} from "./utils";

// test('relative path', () => {
//     const module = "C://a/b/c/d/module.js";
//     const root = "C://a/b/package.json";
//
//     expect(getRelativePath(module, root).replace(/\\/gm, '/')).toMatch('c/d/module.js')
// });

// test('relative path outside root', () => {
//     const module = "C://a/bb/c/d/module.js";
//     const root = "C://a/b/package.json";
//
//     expect(getRelativePath(module, root).replace(/\\/gm, '/')).toMatch('../bb/c/d/module.js')
// });

test('path hash function must be deterministic', () => {
    const path = '../bb/c/d/module.js';

    expect(hashPath(path)).toMatch(hashPath(path));
});

describe('resolvePath()', function () {

    testPathResolve({
        newModulePath: 'C:/root/a/newModule',
        expectedPath: 'C:/root/a/newModule.js',
        message:  'absolute path is returned as is',
        fileStructure: {
            'C:': {
                root: {
                    a: {
                        'newModule.js': true
                    }
                }
            }
        }
    });

    testPathResolve({
        message: 'relative path',
        newModulePath: './b/c/newModule',
        currentModulePath: 'C:/root/a/currentModule.js',
        expectedPath: 'C:/root/a/b/c/newModule.js',
        fileStructure: {
            'C:': {
                root: {
                    a: {
                        b: {
                            c: {
                                'newModule.js': true
                            }
                        },
                        'currentModule.js': true
                    }
                }
            }
        }
    });

    testPathResolve({
        message: 'partial path is returned relative to root directory, if file exists',
        newModulePath: 'src/app/module',
        currentModulePath: 'C:/root/index.js',
        rootDirectoryPath: 'C:/root',
        expectedPath: 'C:/root/src/app/module.js',
        fileStructure: {
            'C:': {
                root: {
                    'index.js': true,
                    src: {
                        app: {
                            'module.js': true
                        }
                    }
                }
            }
        }
    });

    testPathResolve({
        message: 'return from dependency modules only, if file exists',
        newModulePath: '@pkg',
        rootDirectoryPath: 'C:/root',
        expectedPath: 'C:/root/node_modules/@pkg/index.js',
        dependencyModulePaths: ['./node_modules'],
        fileStructure: {
            'C:': {
                root: {
                    node_modules: {
                        '@pkg': {
                            'index.js': true
                        }
                    }
                }
            }
        }
    });
});
