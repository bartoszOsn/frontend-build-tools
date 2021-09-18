import * as escodegen from 'escodegen';
import {createVariableDeclaration} from "../src/ast-helpers";

describe('ast-helpers', function () {
    describe('createVariableDeclaration()', function () {
        it('should return proper ast for `const {a: a} = fn("module")` expression', function () {
            expect(escodegen.generate(createVariableDeclaration({a: 'a'}, 'fn', 'module'), { format: escodegen.FORMAT_MINIFY }))
                .toMatch('const {a:a}=fn(\'module\');');
        });
        it('should return proper ast for `const {a: a, default: module} = fn("module")` expression', function () {
            expect(escodegen.generate(createVariableDeclaration({a: 'a', default: 'module'}, 'fn', 'module'), { format: escodegen.FORMAT_MINIFY }))
                .toMatch('const {a:a,default:module}=fn(\'module\');');
        });
    });
});
