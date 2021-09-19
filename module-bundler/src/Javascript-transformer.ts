import * as acorn from "acorn";
import * as escodegen from 'escodegen';
import {BaseNode, BlockStatement, FunctionDeclaration} from "estree";

type TransformFunc = (node: BaseNode, block: BlockStatement, functionBody: BlockStatement) => BaseNode;
interface TransformObject {
    [NodeType: string]: TransformFunc;
}

interface NodeData {
    node: BaseNode;
    parent: any;
    parentKey: string;
    block: BlockStatement;
    functionBody: BlockStatement;
}

function isNode(obj: any): boolean {
    return !!obj && typeof obj === 'object' && typeof obj.type == 'string';
}

export function javascriptTransformer(code: string, transforms: TransformObject): string {
    const ast: BaseNode = acorn.parse(code, { ecmaVersion: 2022, sourceType: "module" });

    const nodeQuery: NodeData[] = [{ node: ast, parent: null, parentKey: null, block: null, functionBody: null}];

    while (nodeQuery.length > 0) {
        const nodeData: NodeData = nodeQuery.pop();

        if (nodeData.parent) {
            let newNode;
            const keys = Object.keys(transforms);
            for (const transformKey of keys) {
                if (transformKey === nodeData.node.type) {
                    newNode = transforms[transformKey](nodeData.node, nodeData.block, nodeData.functionBody);
                    break;
                }
            }
            if (newNode) {
                nodeData.parent[nodeData.parentKey] = newNode;
            }
        }

        for (const key of Object.keys(nodeData.node)) {
            const value = nodeData.node[key];
            if (Array.isArray(value)) {
                for (const index in value) {
                    const childNode = value[index];
                    if (isNode(childNode)) {

                        let block: BlockStatement = nodeData.block;
                        let functionBody: BlockStatement = nodeData.functionBody;

                        if (childNode.type === 'BlockStatement') {
                            block = childNode;

                            if(nodeData.node.type === 'FunctionDeclaration') {
                                functionBody = childNode;
                            }
                        }

                        nodeQuery.push({ node: childNode, parent: value, parentKey: index, block, functionBody });
                    }
                }
            } else if (isNode(value)) {

                let block: BlockStatement = nodeData.block;
                let functionBody: BlockStatement = nodeData.functionBody;

                if (value.type === 'BlockStatement') {
                    block = value;

                    if(nodeData.node.type === 'FunctionDeclaration') {
                        functionBody = value;
                    }
                }



                nodeQuery.push({ node: value, parent: nodeData.node, parentKey: key, block, functionBody });
            }
        }
    }

    return escodegen.generate(ast);
}
