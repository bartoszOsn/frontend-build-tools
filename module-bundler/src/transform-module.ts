import path from 'path';

import { Module } from "./domain/module";
import { hashPath, resolvePath } from "./path-utils";
import fs from "fs";
import { javascriptTransformer } from "./Javascript-transformer";
import {
	CallExpression,
	ExportAllDeclaration, ExportNamedDeclaration,
	ExpressionStatement,
	Identifier,
	ImportDeclaration,
	MemberExpression,
	VariableDeclaration
} from "estree";
import { createVariableDeclaration, createCallExpression } from "./ast-helpers";

export function transformModule(modulePath: string, rootPath: string, requireFunction: string, exportsName: string): Module {
	const hash = hashPath(modulePath);
	const importedPaths: string[] = [];
	const exportedIdentifiers: {kind: 'var' | 'let', name: string}[] = [];

	const code = fs.readFileSync(modulePath).toString();

	function transformImport(node: ImportDeclaration): VariableDeclaration | CallExpression {
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

		if(Object.keys(properties).length === 0 && !namespaceName) {
			return createCallExpression(requireFunction, hash);
		}

		return createVariableDeclaration(properties, namespaceName, requireFunction, hash);
	}

	function transformNamedExport(node: ExportNamedDeclaration): ExpressionStatement {


		return node as unknown as ExpressionStatement;
	}

	function transformIdentifier(node: Identifier): Identifier | MemberExpression {
		return node;
	}

	const newCode = javascriptTransformer(code, {
		'ImportDeclaration': transformImport,
		'ExportNamedDeclaration': transformNamedExport,
		'Identifier': transformIdentifier
	});

	return {
		content: newCode,
		moduleName: modulePath,
		hash: hash,
		exportsName: exportsName,
		requireFunction: requireFunction,
		importPaths: importedPaths
	};
}
