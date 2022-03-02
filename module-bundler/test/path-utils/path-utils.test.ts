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
        newModulePath: '/root/a/newModule',
        expectedPath: '/root/a/newModule.js',
        message:  'absolute path is returned as is',
        fileStructure: {
            '/root': {
                a: {
                    'newModule.js': ''
                }
            }
        }
    });

    testPathResolve({
        message: 'relative path',
        newModulePath: './b/c/newModule',
        currentModulePath: '/root/a/currentModule.js',
        expectedPath: '/root/a/b/c/newModule.js',
        fileStructure: {
            '/root': {
                a: {
                    b: {
                        c: {
                            'newModule.js': ''
                        }
                    },
                    'currentModule.js': ''
                }
            }
        }
    });

    testPathResolve({
        message: 'partial path is returned relative to root directory, if file exists',
        newModulePath: 'src/app/module',
        currentModulePath: '/root/index.js',
        rootDirectoryPath: '/root',
        expectedPath: '/root/src/app/module.js',
        fileStructure: {
            '/root': {
                'index.js': '',
                src: {
                    app: {
                        'module.js': ''
                    }
                }
            }
        }
    });

    testPathResolve({
        message: 'return from dependency modules only, if file exists',
        newModulePath: '@pkg',
        rootDirectoryPath: '/root',
        expectedPath: '/root/node_modules/@pkg/index.js',
        dependencyModulePaths: ['./node_modules'],
        fileStructure: {
            '/root': {
                node_modules: {
                    '@pkg': {
                        'index.js': ''
                    }
                }
            }
        }
    });

    testPathResolve({
        message: 'alias',
        newModulePath: '@app/module.js',
        rootDirectoryPath: '/root',
        expectedPath: '/root/src/app/module.js',
        pathAliases: {
            '@app': './src/app'
        },
        fileStructure: {
            '/root': {
                src: {
                    app: {
                        'module.js': ''
                    }
                }
            }
        }
    });
});
