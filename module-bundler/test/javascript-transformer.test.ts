import {javascriptTransformer} from "../src/Javascript-transformer";
import { Node } from "acorn";
import {ImportDeclaration, Identifier, VariableDeclaration, ImportSpecifier} from 'estree';

describe('javascriptTransformer()', () => {
    test('basic', () => {
        const code = 'const a = fn(2 + 2);';
        const newCode = javascriptTransformer(code, { 'Identifier': (node: Identifier) => {
            const newNode = {...node};
            newNode.name = 'b';
            return newNode;
        }});

        expect(newCode).toMatch('const a = b(2 + 2);');
    });

    test('import into function', () => {
        const code = 'import { fn } from \'@fn\';fn();';
        const newCode = javascriptTransformer(code, { 'ImportDeclaration': (node: ImportDeclaration) => {
                const result: VariableDeclaration = {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                "type": "Identifier",
                                "name": (node.specifiers[0] as ImportSpecifier).imported.name
                            },
                            "init": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "require"
                                },
                                "arguments": [
                                    {
                                        "type": "Literal",
                                        "value": "module_" + node.source.value,
                                        "raw": `'module_${ node.source.value }'`
                                    }
                                ],
                                "optional": false
                            }
                        }
                    ],
                    "kind": "const"
                }
                return result;
            }});

        expect(newCode).toMatch('const fn = require(\'module_@fn\');\nfn();');
    });
});
