import path from 'path';

import { Module } from "./domain/module";
import { hashPath, resolvePath } from "./path-utils";
import fs from "fs";
import { javascriptTransformer } from "./Javascript-transformer";
import { ExportAllDeclaration, ExpressionStatement, ImportDeclaration, VariableDeclaration } from "estree";
import { createVariableDeclaration } from "./ast-helpers";

export function transformModule(modulePath: string, rootPath: string, requireFunction: string, moduleName: string, exportsName: string): Module {
	const hash = hashPath(modulePath);
	const importedPaths = [];

	const code = fs.readFileSync(modulePath).toString();

	function transformImport(node: ImportDeclaration): VariableDeclaration {
		const path = node.source.value as string;
		const absPath = resolvePath(path, modulePath, rootPath, {}, [] /* TODO */);
		const hash = hashPath(absPath);
		importedPaths.push(absPath);

		const properties: { [prop: string]: string } = {};
		let namespaceName: string = null;

		for (const specifier of node.specifiers) {
			if (specifier.type === 'ImportSpecifier') {
				properties[specifier.imported.name] = specifier.local.name;
			} else if(specifier.type === 'ImportDefaultSpecifier') {
				properties['default'] = specifier.local.name;
			} else if(specifier.type === 'ImportNamespaceSpecifier') {
				namespaceName = specifier.local.name;
			}
		}

		return createVariableDeclaration(properties, namespaceName, requireFunction, hash);
	}

	function transformExport(node: ExportAllDeclaration): ExpressionStatement {

	}

	const newCode = javascriptTransformer(code, {
		'ImportDeclaration': transformImport,
		'ExportAllDeclaration': transformExport
	})

	return null;
}
