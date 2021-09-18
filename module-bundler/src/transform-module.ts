import path from 'path';

import { Module } from "./domain/module";
import {hashPath, resolvePath} from "./path-utils";
import fs from "fs";
import {javascriptTransformer} from "./Javascript-transformer";
import {ExportAllDeclaration, ExpressionStatement, ImportDeclaration, VariableDeclaration} from "estree";

export function transformModule(modulePath: string, rootPath: string, requireFunction: string, moduleName: string, exportsName: string): Module {
    const hash = hashPath(modulePath);
    const importedPaths = [];

    const code = fs.readFileSync(modulePath).toString();

    function transformImport(node: ImportDeclaration): VariableDeclaration {
        const path = node.source.value as string;
        const absPath = resolvePath(path, modulePath, rootPath, {}, [] /* TODO */);
        importedPaths.push(absPath);

    }

    function transformExport(node: ExportAllDeclaration): ExpressionStatement {

    }

    const newCode = javascriptTransformer(code, {
        'ImportDeclaration': transformImport,
        'ExportAllDeclaration': transformExport
    })

    return null;
}
