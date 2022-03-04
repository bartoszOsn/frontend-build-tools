import {javascriptTransformer} from "../src/Javascript-transformer";
import { Node } from "acorn";
import {ImportDeclaration, Identifier, VariableDeclaration, ImportSpecifier, BlockStatement} from 'estree';

describe('javascriptTransformer()', () => {
    test('basic', () => {
        const code = 'const a = fn(2 + 2);';
        const newCode = javascriptTransformer(code, [{ 'Identifier': (node: Identifier) => {
            if (node.name !== 'fn') {
                return node;
            }
            const newNode = {...node};
            newNode.name = 'b';
            return newNode;
        }}]);

        expect(newCode).toMatch('const a = b(2 + 2);');
    });

    test('import into function', () => {
        const code = 'import { fn } from \'@fn\';fn();';
        const newCode = javascriptTransformer(code, [{ 'ImportDeclaration': (node: ImportDeclaration) => {
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
            }}]);

        expect(newCode).toMatch('const fn = require(\'module_@fn\');\nfn();');
    });

    test('should provide proper block in transform function', function () {

        const code = `
            let a = 5;
            if(a == 5) {
              let b = "example";
            }
        `;

        javascriptTransformer(code, [{
            'Identifier': (node: Identifier, block: any, functionBody: BlockStatement) => {
                if(node.name === 'b') {
                    expect(block).toBeDefined();
                    expect(block?.body?.[0]?.declarations?.[0]?.id?.name).toMatch('b');
                }

                return node;
            }
        }]);

        expect.hasAssertions();
    });

    test('should provide proper function block in transform function', function () {

        const code = `
            function fn() {
                let a = 5;
            }
        `;

        javascriptTransformer(code, [{
            'Identifier': (node: Identifier, block: any, functionBody: any) => {
                if(node.name === 'fn') {
                    expect(functionBody).toBeNull();
                }
                if(node.name === 'a') {
                    expect(functionBody).toBeDefined();
                    expect(functionBody?.body?.["0"]?.declarations?.["0"]?.id?.name).toMatch('a');
                }

                return node;
            }
        }]);

        expect.hasAssertions();
    });
});
