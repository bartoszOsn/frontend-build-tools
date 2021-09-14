import path from "path";
import fs from 'fs';
import crypto from "crypto";
import { PathAliases } from "./domain/path-aliases";

export function isPathRelative(analyzedPath: string): boolean {
    return ['.', '..'].some(str => analyzedPath === str || analyzedPath.startsWith(str + path.sep));
}

export function normalizeSeparator(analyzedPath: string): string {
    [/\//g, /\\/g].forEach(regex => analyzedPath = analyzedPath.replace(regex, path.sep));
    return analyzedPath;
}

export function hashPath(path: string): string {
    return crypto.createHash('sha256').update(path, 'utf8').digest('hex');
}

export function doesModuleExists(modulePath: string): boolean {
    if (!fs.existsSync(modulePath)) {
        if (!fs.existsSync(modulePath + '.js')) {
            return false;
        }

        if (fs.lstatSync(modulePath + '.js').isFile()) {
            return true;
        }
    }

    if (fs.lstatSync(modulePath).isFile()) {
        return true;
    }

    return fs.existsSync(path.join(modulePath, 'index.js'));


}

// pseudocode:
// if (path is absolute) return path if file exists, else throw error
// if (path starts with "." or ".." - path is relative) return path resolved from current module if file exists, else throw error
// if (path starts from directory name) {
//      if (given file exist with aliases) return resolved to alias
//      if (file exists relative to root directory) return resolved to root directory
//      if (file exists relative to one of dependencyDirectories) return resolved to dependency directory
// }
// throw error

function resolveToExactFile(modulePath: string) {
    if (!fs.existsSync(modulePath)) {
        if (fs.lstatSync(modulePath + '.js').isFile()) {
            return modulePath + '.js';
        }
        throw new Error('No fitting file.');
    }

    if (fs.lstatSync(modulePath).isFile()) {
        return modulePath;
    }

    if (fs.existsSync(path.join(modulePath, 'index.js')) && fs.lstatSync(path.join(modulePath, 'index.js'))) {
        return path.join(modulePath, 'index.js');
    }

    throw new Error('No fitting file.');
}



function resolvePathInternal(modulePath: string, currentModulePath: string, rootPath: string, pathAliases: PathAliases, dependencyModulePaths: string[]): string {
    modulePath = normalizeSeparator(modulePath);
    currentModulePath = normalizeSeparator(currentModulePath);
    rootPath = normalizeSeparator(rootPath);


    if (path.isAbsolute(modulePath)) {
        if (!doesModuleExists(modulePath)) {
            throw new Error('Cannot resolve a path');
        }
        return modulePath;
    }

    if (isPathRelative(modulePath)) {
        const newPath = path.resolve(path.dirname(currentModulePath), modulePath);
        if (!doesModuleExists(newPath)) {
            throw new Error('Cannot resolve a path');
        }
        return newPath;
    }

    if (doesModuleExists(path.join(rootPath, modulePath))) {
        return path.join(rootPath, modulePath);
    }

    const aliases = Object.keys(pathAliases);

    for (const alias of aliases) {
        if (modulePath.startsWith(alias + path.sep)) {
            const newModulePath = path.resolve(rootPath, modulePath.replace(alias, pathAliases[alias]));
            try {
                return resolvePathInternal(newModulePath, currentModulePath, rootPath, {}, dependencyModulePaths);
            } catch {}
        }
    }

    for (const dependencyModulePath of dependencyModulePaths) {
        const newPath = dependencyModulePath + path.sep + modulePath;
        const absNewPath = path.resolve(rootPath, newPath);
        if (doesModuleExists(absNewPath)) {
            return absNewPath;
        }
    }

    throw new Error('Cannot resolve a path');
}

export function resolvePath(modulePath: string, currentModulePath: string, rootPath: string, pathAliases: PathAliases, dependencyModulePaths: string[]): string {
    return resolveToExactFile(resolvePathInternal(modulePath, currentModulePath, rootPath, pathAliases, dependencyModulePaths));
}
