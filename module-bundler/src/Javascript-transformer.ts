import * as acorn from "acorn";
import * as escodegen from 'escodegen';
import { BaseNode } from "estree";

type TransformFunc = (BaseNode) => BaseNode;
interface TransformObject {
    [NodeType: string]: TransformFunc;
}

interface NodeData {
    node: BaseNode;
    parent: any;
    parentKey: string;
}

function isNode(obj: any): boolean {
    return !!obj && typeof obj === 'object' && typeof obj.type == 'string';
}

export function javascriptTransformer(code: string, transforms: TransformObject): string {
    const ast: BaseNode = acorn.parse(code, { ecmaVersion: 2022, sourceType: "module" });

    const nodeQuery: NodeData[] = [{ node: ast, parent: null, parentKey: null}];

    while (nodeQuery.length > 0) {
        const nodeData: NodeData = nodeQuery.pop();

        if (nodeData.parent) {
            let newNode;
            const keys = Object.keys(transforms);
            for (const transformKey of keys) {
                if (transformKey === nodeData.node.type) {
                    newNode = transforms[transformKey](nodeData.node);
                    break;
                }
            }
            if (newNode) {
                nodeData.parent[nodeData.parentKey] = newNode;
                break;
            }
        }

        for (const key of Object.keys(nodeData.node)) {
            const value = nodeData.node[key];
            if (Array.isArray(value)) {
                for (const index in value) {
                    const childNode = value[index];
                    if (isNode(childNode)) {
                        nodeQuery.push({ node: childNode, parent: value, parentKey: index });
                    }
                }
            } else if (isNode(value)) {
                nodeQuery.push({ node: value, parent: nodeData.node, parentKey: key });
            }
        }
    }

    return escodegen.generate(ast);
}
