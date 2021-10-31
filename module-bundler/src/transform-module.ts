import path from 'path';

import { Module } from "./domain/module";
import { hashPath, resolvePath } from "./path-utils";
import fs from "fs";
import { javascriptTransformer } from "./Javascript-transformer";
import {
	BlockStatement,
	CallExpression, ClassExpression,
	ExportAllDeclaration, ExportNamedDeclaration, Expression,
	ExpressionStatement, FunctionExpression,
	Identifier,
	ImportDeclaration,
	MemberExpression, SequenceExpression,
	VariableDeclaration, VariableDeclarator
} from "estree";
import {
	createVariableDeclaration,
	createCallExpression,
	createAssigmentExpression,
	createMemberExpression, createVoid0Expression, createSequenceExpression
} from "./ast-helpers";

interface VariableDeclarationData {
	kind: 'var' | 'let' | 'const';
	name: string;
	functionBody: BlockStatement;
	block: BlockStatement;
	isExported: boolean;
}

function getDeclarationData(declaredIdentifiers: VariableDeclarationData[], name, block, funcBody): VariableDeclarationData {
	return declaredIdentifiers.find(i => {
		if (i.name !== name) {
			return false;
		}
		const sameFunction = i.functionBody === funcBody;
		const sameBlock = i.block === block;
		const sameScope = (i.kind === "var") ? sameFunction : sameBlock;
		return sameScope;
	});
}

export function transformModule(modulePath: string, rootPath: string, requireFunction: string, exportsName: string): Module {
	const code = fs.readFileSync(modulePath).toString();
	const hash = hashPath(modulePath);
	const importedPaths: string[] = [];
	const declaredIdentifiers: VariableDeclarationData[] = [];

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

	function transformRequire(node: CallExpression): CallExpression {
		if (node.callee.type !== 'Identifier') {
			return node;
		}

		if (node.arguments.length === 0) {
			return node;
		}

		if (node.arguments[0].type !== 'Literal') {
			return node;
		}

		if (node.callee.name === 'require') {
			node.callee.name = requireFunction;
		}


		// TODO do funkcji to
		const absPath = resolvePath(node.arguments[0].value.toString(), modulePath, rootPath, {}, [] /* TODO */);
		importedPaths.push(absPath);
	}

	function transformNamedExport(node: ExportNamedDeclaration, block: BlockStatement, func: BlockStatement): ExpressionStatement | SequenceExpression {
		if (node.declaration?.type === 'VariableDeclaration') {
			const kind = node.declaration.kind;
			const expressionStatements: Expression[] = [];
			for (const declaration of node.declaration.declarations) {
				const name = (declaration.id as Identifier).name;
				const init = declaration.init ?? createVoid0Expression();

				const declarationData = getDeclarationData(declaredIdentifiers, name, block, func);

				if (declarationData) {
					declarationData.isExported = true;
				}

				expressionStatements.push(createAssigmentExpression(createMemberExpression(exportsName, name), init));
			}

			if (expressionStatements.length === 1) {
				return {
					type: 'ExpressionStatement',
					expression: expressionStatements[0]
				}
			} else {
				return createSequenceExpression(expressionStatements);
			}
		} else if (node.declaration?.type === 'FunctionDeclaration') {
			const name = node.declaration.id.name;
			return {
				type: 'ExpressionStatement',
				expression: createAssigmentExpression(
					createMemberExpression(exportsName, name),
					{
						...node.declaration,
						type: 'FunctionExpression'
					} as FunctionExpression
				)
			};
		} else if (node.declaration?.type === 'ClassDeclaration') {
			const name = node.declaration.id.name;
			return {
				type: 'ExpressionStatement',
				expression: createAssigmentExpression(
					createMemberExpression(exportsName, name),
					{
						...node.declaration,
						type: 'ClassExpression'
					} as ClassExpression
				)
			}
		}

		return node as unknown as ExpressionStatement;
	}

	function transformIdentifier(node: Identifier, block: BlockStatement, funcBody: BlockStatement, parent): Identifier | MemberExpression {
		if (parent.type === 'MemberExpression') {
			return node;
		}
		const identifier = getDeclarationData(declaredIdentifiers, node.name, block, funcBody);

		if (identifier && identifier.isExported) {
			return createMemberExpression(exportsName, node.name);
		}

		return node;
	}

	let newCode = javascriptTransformer(code, [
		{
			'VariableDeclaration': (node: VariableDeclaration, block, functionBody) => {
				for (const declaration of node.declarations) {
					declaredIdentifiers.push({
						kind: node.kind,
						name: (declaration.id as Identifier).name,
						block: block,
						functionBody: functionBody,
						isExported: null
					});
				}

				return node;
			}
		},
		{
			'ImportDeclaration': transformImport,
			'CallExpression': transformRequire,
			'ExportNamedDeclaration': transformNamedExport
		},
		{
			'Identifier': transformIdentifier
		}
	]);

	return {
		content: newCode,
		moduleName: modulePath,
		hash: hash,
		exportsName: exportsName,
		requireFunction: requireFunction,
		importPaths: importedPaths
	};
}
