import {
    AssignmentProperty,
    CallExpression,
    Identifier, Literal,
    ObjectPattern,
    VariableDeclaration,
    VariableDeclarator
} from "estree";

function createLiteral(value: string): Literal {
    return {
        type: 'Literal',
        value: value,
        raw: JSON.stringify(value)
    };
}

function createIdentifier(name: string): Identifier {
    return {
        type: 'Identifier',
        name: name
    };
}

function createProperty(key: string, value: string): AssignmentProperty {
    return {
        type: 'Property',
        method: false,
        shorthand: false,
        computed: false,
        kind: 'init',
        key: createIdentifier(key),
        value: createIdentifier(value)
    };
}

function createObjectPattern(properties: {[key: string]: string}): ObjectPattern {
    return {
        type: 'ObjectPattern',
        properties: Object.keys(properties).map(key => createProperty(key, properties[key]))
    };
}

function createVariableDeclarator(properties: {[key: string]: string}, init: CallExpression): VariableDeclarator {
    return {
        type: 'VariableDeclarator',
        init: init,
        id: createObjectPattern(properties)
    };
}

function createCallExpression(requireFunctionName: string, requireFunctionArgument: string): CallExpression {
    return {
        type: 'CallExpression',
        optional: false,
        callee: createIdentifier(requireFunctionName),
        arguments: [createLiteral(requireFunctionArgument)]
    };
}

export function createVariableDeclaration(properties: {[key: string]: string}, requireFunctionName: string, requireFunctionArgument: string): VariableDeclaration {
    return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [createVariableDeclarator(properties, createCallExpression(requireFunctionName, requireFunctionArgument))]
    };
}
