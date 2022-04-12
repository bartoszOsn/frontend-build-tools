import { transformModule } from "../../src/transform-module";
import mockFs, { restore as restoreFs } from 'mock-fs';

function testExport(oldCode: string, expectedCode: string) {

	it(`should transform ${JSON.stringify(oldCode)} into ${JSON.stringify(expectedCode)}`, function () {
		mockFs({
			'/root': {
				'index.js': oldCode
			}
		});

		const module = transformModule('/root/index.js', '', 'require', 'exports', 'module');
		expect(module.content).toMatch(expectedCode);

		restoreFs();
	});
}

export function exportsSuite() {
	testExport('export let a;a = 5;', 'exports.a = void 0;\nexports.a = 5;');
	testExport('export let a, b;a = 5; b = 10;', '(exports.a = void 0, exports.b = void 0)\nexports.a = 5;\nexports.b = 10;');

	testExport('export let a = 5;', 'exports.a = 5;');
	testExport('export let a = 5, b = 10;', '(exports.a = 5, exports.b = 10)');

	testExport('export function func(){}', 'exports.func = function func() {\n}');

	testExport('export class Cls {}', 'exports.Cls = class Cls {\n}');

	testExport('let a,b;export {a , b}', 'exports.a = a, exports.b = b;');

	testExport('let a,b;export {a as aliasA, b as aliasB}', 'exports.aliasA = a, exports.aliasB = b;');

	testExport('export const { a, b: c } = o;', 'exports.a = o.a, exports.b = o.c');

	testExport('export default expression;', 'exports.default = expression;');

	testExport('export default function () {}', 'exports.default = function () {}');

	testExport('export default function a() {}', 'exports.default = function a() {}');

	testExport('export { a as default, b };', 'exports.default = a, exports.b = b;');
}
