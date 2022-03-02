import {
    AssignmentExpression,
    AssignmentProperty,
    CallExpression, Expression, ExpressionStatement,
    Identifier, Literal, MemberExpression,
    ObjectPattern, SequenceExpression, UnaryExpression, UnaryOperator,
    VariableDeclaration,
    VariableDeclarator
} from "estree";

function createLiteral(value: string | number): Literal {
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

function createNamespaceVariableDeclarator(defaultNamespaceName: string, init: CallExpression): VariableDeclarator {
    return {
        type: 'VariableDeclarator',
        init: init,
        id: createIdentifier(defaultNamespaceName)
    };
}

export function createCallExpression(requireFunctionName: string, requireFunctionArgument: string): CallExpression {
    return {
        type: 'CallExpression',
        optional: false,
        callee: createIdentifier(requireFunctionName),
        arguments: [createLiteral(requireFunctionArgument)]
    };
}

export function createVariableDeclaration(properties: {[key: string]: string}, defaultNamespaceName: string, requireFunctionName: string, requireFunctionArgument: string): VariableDeclaration {
    const declarations: VariableDeclarator[] = [];

    if(Object.keys(properties).length > 0) {
        declarations.push(createVariableDeclarator(properties, createCallExpression(requireFunctionName, requireFunctionArgument)));
    }

    if(defaultNamespaceName) {
        declarations.push(createNamespaceVariableDeclarator(defaultNamespaceName, createCallExpression(requireFunctionName, requireFunctionArgument)));
    }

    return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: declarations
    };
}

export function createMemberExpression(objName: string, literalName: string): MemberExpression {
    return {
        type: 'MemberExpression',
        object: createIdentifier(objName),
        property: createIdentifier(literalName),
        computed: false,
        optional: false
    };
}

export function createAssigmentExpression(leftSide: MemberExpression, rightSide: Expression): AssignmentExpression {
    return {
        type: "AssignmentExpression",
        operator: '=',
        left: leftSide,
        right: rightSide
    };
}

export function createVoid0Expression(): UnaryExpression {
    return {
        type: "UnaryExpression",
        operator: "void",
        prefix: true,
        argument: createLiteral(0)
    }
}

export function createSequenceExpression(expressions: Expression[]): SequenceExpression {
    return {
        type: "SequenceExpression",
        expressions: expressions
    };
}

export function createIIFWithTemp(init: Expression, propertyMap: {[key: string]: string}, exportsName: string): ExpressionStatement {
    return {
        type: "ExpressionStatement",
        expression: {
            type: "CallExpression",
            arguments: [],
            optional: false,
            callee: {
                type: 'FunctionExpression',
                id: null,
                generator: false,
                async: false,
                params: [],
                body: {
                    type: "BlockStatement",
                    body: [
                        {
                            type: 'VariableDeclaration',
                            kind: "var",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: createIdentifier('tmp'),
                                    init: init
                                }
                            ]
                        },
                        {
                            type: "ExpressionStatement",
                            expression: createSequenceExpression(
                                Object.entries(propertyMap).map(entry => {
                                    return createAssigmentExpression(
                                        createMemberExpression(exportsName, entry[1]),
                                        createMemberExpression()
                                    )
                                })
                            )
                        }
                    ]
                }
            }
        }
    }
}
