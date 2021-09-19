import * as escodegen from 'escodegen';
import {createVariableDeclaration} from "../src/ast-helpers";

describe('ast-helpers', function () {
    describe('createVariableDeclaration()', function () {
        it('should return proper ast for `const {a: a} = fn("module")` expression', function () {
            expect(escodegen.generate(createVariableDeclaration({a: 'a'}, null, 'fn', 'module'), { format: escodegen.FORMAT_MINIFY }))
                .toMatch('const {a:a}=fn(\'module\');');
        });
        it('should return proper ast for `const {a: a, default: module} = fn("module")` expression', function () {
            expect(escodegen.generate(createVariableDeclaration({a: 'a', default: 'module'}, null, 'fn', 'module'), { format: escodegen.FORMAT_MINIFY }))
                .toMatch('const {a:a,default:module}=fn(\'module\');');
        });
        it('should return proper ast for `const module = fn("module")` expression', function () {
            expect(escodegen.generate(createVariableDeclaration({}, 'module', 'fn', 'module'), { format: escodegen.FORMAT_MINIFY }))
                .toMatch('const module=fn(\'module\');');
        });
        it('should return proper ast for `const {a: a, b: c} = fn("module"), module = fn("module")` expression', function () {
            expect(escodegen.generate(createVariableDeclaration({a: 'a', b: 'c'}, 'module', 'fn', 'module'), { format: escodegen.FORMAT_MINIFY }))
                .toMatch('const {a:a,b:c}=fn(\'module\'),module=fn(\'module\')');
        });
    });
});
