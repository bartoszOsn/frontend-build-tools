import { transformModule } from "../../src/transform-module";
import mockFs, { restore as restoreFs } from 'mock-fs';

function testImport(oldCode: string, expectedCode: string) {

	it(`should transform ${JSON.stringify(oldCode)} into ${JSON.stringify(expectedCode)}`, function () {
		mockFs({
			'/root': {
				'index.js': oldCode
			}
		});

		const module = transformModule('/root/index.js', '', 'require', 'exports');
		expect(module.content).toMatch(expectedCode);

		restoreFs();
	});
}

export function imports() {
	testImport('import defaultExport from "module-name";', 'const {default: defaultExport} = require(\'module-name\');');
	testImport('import * as name from "module-name";', 'const name = require(\'module-name\');');
	testImport('import { export1 } from "module-name";', 'const {export1: export1} = require(\'module-name\');');
	testImport('import { export1 as alias1 } from "module-name";', 'const {export1: alias1} = require(\'module-name\');');
	testImport('import { export1 , export2 } from "module-name";', 	'const {\n' +
																						'    export1: export1,\n' +
																						'    export2: export2\n' +
																						'} = require(\'module-name\');');

	testImport('import { export1 , export2 as alias2 } from "module-name";', 'const {\n' +
																								'    export1: export1,\n' +
																								'    export2: alias2\n' +
																								'} = require(\'module-name\');');
	testImport('import defaultExport, { export1 } from "module-name";', 'const {\n' +
																							'    default: defaultExport,\n' +
																							'    export1: export1\n' +
																							'} = require(\'module-name\');');
	testImport('import defaultExport, * as name from "module-name";', 'const {default: defaultExport} = require(\'module-name\'), name = require(\'module-name\');');
	testImport('import "module-name";', 'require(\'module-name\')');
}
